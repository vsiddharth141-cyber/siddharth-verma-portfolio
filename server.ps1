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

        if ([System.IO.File]::Exists($safePath)) {
            $extension = [System.IO.Path]::GetExtension($safePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($safePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
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
