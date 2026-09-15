param (
    [int]$Port = 5173
)

$basePath = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Output "HTTP Server listening on $prefix"
    Write-Output "Serving files from $basePath"
} catch {
    Write-Error ("Could not start HttpListener on {0}: {1}" -f $prefix, $_)
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".webp" = "image/webp"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
    ".pdf"  = "application/pdf"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        $safePath = [System.IO.Path]::Combine($basePath, $urlPath.Replace('/', '\'))

        $response.KeepAlive = $false
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Cache-Control", "no-cache")

        if (-not [System.IO.File]::Exists($safePath)) {
            $altPath = $safePath -replace '\s+\.mp4$', '.mp4'
            if ([System.IO.File]::Exists($altPath)) {
                $safePath = $altPath
            }
        }

        if ([System.IO.File]::Exists($safePath)) {
            $extension = [System.IO.Path]::GetExtension($safePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
            $fileInfo = New-Object System.IO.FileInfo($safePath)
            $fileLength = $fileInfo.Length

            $response.ContentType = $contentType
            $response.AddHeader("Accept-Ranges", "bytes")

            $rangeHeader = $request.Headers["Range"]
            if ($null -ne $rangeHeader -and $rangeHeader -match "bytes=(\d*)-(\d*)") {
                $start = if ([string]::IsNullOrEmpty($matches[1])) { 0 } else { [int64]$matches[1] }
                $end = if ([string]::IsNullOrEmpty($matches[2])) { $fileLength - 1 } else { [int64]$matches[2] }
                if ($end -ge $fileLength) { $end = $fileLength - 1 }
                $count = $end - $start + 1

                $response.StatusCode = 206
                $response.AddHeader("Content-Range", "bytes $start-$end/$fileLength")
                $response.ContentLength64 = $count

                if ($request.HttpMethod -ne "HEAD") {
                    $fs = [System.IO.File]::OpenRead($safePath)
                    try {
                        $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                        $buffer = New-Object byte[] 65536
                        $remaining = $count
                        while ($remaining -gt 0) {
                            $toRead = [Math]::Min($buffer.Length, $remaining)
                            $bytesRead = $fs.Read($buffer, 0, $toRead)
                            if ($bytesRead -le 0) { break }
                            $response.OutputStream.Write($buffer, 0, $bytesRead)
                            $remaining -= $bytesRead
                        }
                    } finally {
                        $fs.Close()
                    }
                }
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $fileLength

                if ($request.HttpMethod -ne "HEAD") {
                    $fs = [System.IO.File]::OpenRead($safePath)
                    try {
                        $buffer = New-Object byte[] 65536
                        while (($bytesRead = $fs.Read($buffer, 0, $buffer.Length)) -gt 0) {
                            $response.OutputStream.Write($buffer, 0, $bytesRead)
                        }
                    } finally {
                        $fs.Close()
                    }
                }
            }
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $notFoundBytes.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
            }
        }

        $response.Close()
    } catch {
        Write-Warning "Request processing error: $_"
    }
}
