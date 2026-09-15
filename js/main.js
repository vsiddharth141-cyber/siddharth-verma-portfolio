/**
 * Main Application Orchestrator for Siddharth Verma's Portfolio
 */

import { PORTFOLIO_DATA } from './data.js';
import { initVoiceGreeting } from './speech.js';
import { initTheme } from './theme.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize sub-systems
  initTheme();
  initVoiceGreeting();
  initNavigation();
  initAnimations();
  initProjectModal();
  initCertificateLightbox();
  initVideoShowcase();
  initContactForm();
  initCopyLinks();
});

/**
 * Project Details Modal Interaction
 */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const openBtn = document.getElementById('open-project-modal-btn');
  const closeBtn = document.getElementById('close-project-modal-btn');

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * Interactive Certificate Lightbox Modal
 */
function initCertificateLightbox() {
  const modal = document.getElementById('certificate-lightbox-modal');
  const closeBtn = document.getElementById('close-cert-modal-btn');
  const closeBottomBtn = document.getElementById('cert-lightbox-close-bottom');
  const imgEl = document.getElementById('cert-lightbox-img');
  const titleEl = document.getElementById('cert-lightbox-title');
  const issuerEl = document.getElementById('cert-lightbox-issuer');
  const tagEl = document.getElementById('cert-lightbox-tag');
  const verifyWrap = document.getElementById('cert-lightbox-verify-wrap');
  const verifyBtn = document.getElementById('cert-lightbox-verify-btn');

  if (!modal) return;

  function openCertificate(certId) {
    const cert = PORTFOLIO_DATA.certificates.find(c => c.id === certId);
    if (!cert) return;

    if (imgEl) {
      imgEl.src = cert.image;
      imgEl.alt = `${cert.title} Certificate Preview`;
    }
    if (titleEl) titleEl.textContent = cert.title;
    if (issuerEl) issuerEl.textContent = cert.issuer;
    if (tagEl) tagEl.textContent = cert.category || 'Certificate';

    if (verifyWrap && verifyBtn) {
      if (cert.verifyUrl) {
        verifyWrap.style.display = 'block';
        verifyBtn.href = cert.verifyUrl;
      } else {
        verifyWrap.style.display = 'none';
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertificate() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click & keyboard triggers on preview triggers
  document.querySelectorAll('[data-preview-cert]').forEach(trigger => {
    const certId = trigger.getAttribute('data-preview-cert');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openCertificate(certId);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertificate(certId);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCertificate);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeCertificate);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCertificate();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeCertificate();
    }
  });
}

/**
 * Cinematic Video Player Modal & Editing Showcase
 */
function initVideoShowcase() {
  const modal = document.getElementById('video-player-modal');
  const closeBtn = document.getElementById('close-video-modal-btn');
  const videoEl = document.getElementById('main-html5-video');
  const videoSource = document.getElementById('video-source-mp4');
  const titleEl = document.getElementById('video-modal-title');
  const categoryEl = document.getElementById('video-modal-category');
  const badgeEl = document.getElementById('video-modal-badge');
  const durationBadge = document.getElementById('video-modal-duration');
  const captionEl = document.getElementById('video-modal-caption');
  const tagsContainer = document.getElementById('video-modal-tags');
  const fallbackNotice = document.getElementById('video-fallback-notice');
  const fallbackFilename = document.getElementById('fallback-filename');
  const spinner = document.getElementById('video-loading-spinner');
  const prevBtn = document.getElementById('prev-video-btn');
  const nextBtn = document.getElementById('next-video-btn');
  const pillsContainer = document.getElementById('video-playlist-pills');
  const pipBtn = document.getElementById('video-tool-pip');
  const fullscreenBtn = document.getElementById('video-tool-fullscreen');
  const particleCanvas = document.getElementById('cinematic-particle-canvas');

  // Dynamically ensure all 4 cards are displayed
  ['beat-effects', 'animated-storytelling', 'creative-edit', 'motion-graphics', 'edit-1', 'edit-2', 'edit-3', 'edit-4'].forEach(id => {
    const card = document.getElementById(`video-card-${id}`);
    if (card) {
      card.style.display = card.classList.contains('featured-video-card') ? 'block' : 'flex';
    }
  });

  if (!modal || !videoEl) return;

  const availableEdits = PORTFOLIO_DATA.videoEdits.filter(v => v.enabled);
  let currentEditIndex = 0;
  let particleAnimId = null;

  // Build playlist pills
  function renderPlaylistPills() {
    if (!pillsContainer) return;
    pillsContainer.innerHTML = availableEdits.map((item, idx) => {
      return `<button type="button" class="video-playlist-pill ${idx === currentEditIndex ? 'is-active' : ''}" data-video-index="${idx}">${item.title}</button>`;
    }).join('');

    pillsContainer.querySelectorAll('.video-playlist-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const idx = parseInt(pill.getAttribute('data-video-index'), 10);
        if (!isNaN(idx) && availableEdits[idx]) {
          openVideo(availableEdits[idx].id);
        }
      });
    });
  }

  // Cinematic Stardust Particles Canvas
  function initParticleCanvas() {
    if (!particleCanvas) return;
    const ctx = particleCanvas.getContext('2d');
    if (!ctx) return;

    let width = particleCanvas.width = modal.clientWidth || window.innerWidth;
    let height = particleCanvas.height = modal.clientHeight || window.innerHeight;

    const handleResize = () => {
      if (modal.classList.contains('is-open')) {
        width = particleCanvas.width = modal.clientWidth || window.innerWidth;
        height = particleCanvas.height = modal.clientHeight || window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(168, 85, 247,'
      });
    }

    function renderParticles() {
      if (!modal.classList.contains('is-open')) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color === 'rgba(0, 242, 254,' ? '#00f2fe' : '#a855f7';
        ctx.fill();
      });

      particleAnimId = requestAnimationFrame(renderParticles);
    }

    return {
      start: () => {
        cancelAnimationFrame(particleAnimId);
        renderParticles();
      },
      stop: () => {
        cancelAnimationFrame(particleAnimId);
        if (ctx) ctx.clearRect(0, 0, width, height);
      }
    };
  }

  const particleSystem = initParticleCanvas();

  function openVideo(videoId) {
    const videoData = PORTFOLIO_DATA.videoEdits.find(v => 
      v.id === videoId || 
      v.aliasId === videoId || 
      v.title.toLowerCase() === (videoId || '').toLowerCase()
    );
    if (!videoData) return;

    const idx = availableEdits.findIndex(v => v.id === videoData.id);
    if (idx !== -1) {
      currentEditIndex = idx;
    }

    if (titleEl) titleEl.textContent = videoData.title;
    if (categoryEl) categoryEl.textContent = videoData.category;
    if (badgeEl) badgeEl.textContent = videoData.badge || 'Video Edit';
    if (durationBadge) durationBadge.textContent = videoData.duration || 'HD Video';
    if (captionEl) captionEl.textContent = videoData.description;

    if (tagsContainer && videoData.tags) {
      tagsContainer.innerHTML = videoData.tags
        .map(t => `<span class="video-pill-tag">${t}</span>`)
        .join('');
    }

    renderPlaylistPills();

    // Configure video source
    if (videoEl && videoSource) {
      if (spinner) spinner.style.display = 'flex';
      videoEl.poster = videoData.poster;
      videoSource.src = encodeURI(videoData.videoSrc);
      videoEl.load();

      if (fallbackNotice) fallbackNotice.style.display = 'none';

      // Gracefully handle playback attempt
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or user interaction needed
        });
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (particleSystem) particleSystem.start();
  }

  function closeVideo() {
    if (videoEl) {
      videoEl.pause();
      try {
        videoEl.currentTime = 0;
      } catch (e) {
        // ignore if not ready
      }
    }
    if (spinner) spinner.style.display = 'none';
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (particleSystem) particleSystem.stop();
  }

  // Video event handlers for spinner and error notices
  if (videoEl) {
    videoEl.addEventListener('waiting', () => {
      if (spinner) spinner.style.display = 'flex';
    });
    videoEl.addEventListener('canplay', () => {
      if (spinner) spinner.style.display = 'none';
    });
    videoEl.addEventListener('playing', () => {
      if (spinner) spinner.style.display = 'none';
    });
    videoEl.addEventListener('error', () => {
      if (spinner) spinner.style.display = 'none';
      if (fallbackNotice) {
        fallbackNotice.style.display = 'flex';
        const currentSrc = videoSource ? videoSource.getAttribute('src') : 'assets/videos/...';
        if (fallbackFilename) fallbackFilename.textContent = decodeURI(currentSrc);
      }
    }, true);
  }

  // Next / Previous navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentEditIndex = (currentEditIndex - 1 + availableEdits.length) % availableEdits.length;
      openVideo(availableEdits[currentEditIndex].id);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentEditIndex = (currentEditIndex + 1) % availableEdits.length;
      openVideo(availableEdits[currentEditIndex].id);
    });
  }

  // Fullscreen and PiP tool buttons
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (videoEl.requestFullscreen) {
          videoEl.requestFullscreen().catch(() => {});
        } else if (videoEl.webkitRequestFullscreen) {
          videoEl.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    });
  }

  if (pipBtn) {
    if (document.pictureInPictureEnabled) {
      pipBtn.addEventListener('click', () => {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture().catch(() => {});
        } else if (videoEl) {
          videoEl.requestPictureInPicture().catch(() => {});
        }
      });
    } else {
      pipBtn.style.display = 'none';
    }
  }

  // Bind click & keyboard triggers on all play triggers
  document.querySelectorAll('[data-play-video]').forEach(trigger => {
    const videoId = trigger.getAttribute('data-play-video');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(videoId);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideo(videoId);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeVideo();
    } else if (e.key === ' ' && document.activeElement !== closeBtn && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault();
      if (videoEl.paused) videoEl.play(); else videoEl.pause();
    } else if (e.key === 'f' || e.key === 'F') {
      if (fullscreenBtn) fullscreenBtn.click();
    } else if (e.key === 'ArrowRight') {
      videoEl.currentTime = Math.min(videoEl.duration || 9999, videoEl.currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      videoEl.currentTime = Math.max(0, videoEl.currentTime - 5);
    }
  });
}

/**
 * Contact Form Client Validation & Mailto Fallback
 */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim() || `Portfolio Inquiry from ${name}`;
    const message = messageInput.value.trim();

    // Basic Validation
    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    // Since no live backend email server credentials are provided in prompt:
    // Inform user and launch mailto draft cleanly as documented in requirements!
    if (feedback) {
      feedback.className = 'form-feedback info';
      feedback.innerHTML = `
        <strong>Draft Prepared!</strong> Launching your default email client to send this message to Siddharth (${PORTFOLIO_DATA.social.email}).
        <br><small>Note: Configure an email backend API service (e.g., EmailJS / Formspree) to send silently from browser.</small>
      `;
    }

    showToast('Opening email client with your message...', 'info');

    // Mailto fallback link
    const mailtoLink = `mailto:${PORTFOLIO_DATA.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 900);
  });
}

/**
 * Toast Notification Helper
 */
export function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  if (type === 'success') {
    iconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/**
 * Copy Phone or Email on Click with feedback
 */
function initCopyLinks() {
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.getAttribute('data-copy-text');
      if (text && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`, 'success');
        }).catch(() => {
          // fallback
        });
      }
    });
  });
}
