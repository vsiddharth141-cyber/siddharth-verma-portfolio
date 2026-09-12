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
