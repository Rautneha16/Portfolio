import React, { useState, useEffect } from 'react';

// PWA Registration & Install Prompt Manager
const PWARegistration = ({ onInstallPromptReady }) => {
  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration.scope);

            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New update available — notify user
                  showUpdateToast();
                }
              });
            });
          })
          .catch((err) => console.log('SW registration failed:', err));
      });
    }

    // Capture the install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (onInstallPromptReady) {
        onInstallPromptReady(e);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [onInstallPromptReady]);

  return null;
};

// Update available toast notification
function showUpdateToast() {
  const toast = document.createElement('div');
  toast.id = 'pwa-update-toast';
  toast.innerHTML = `
    <div style="
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--card-bg, #fff);
      border: 2px solid var(--border-color, #1f1b2d);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      box-shadow: 4px 4px 0px var(--shadow-color, #1f1b2d);
      z-index: 99998;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: 'Poppins', 'Inter', sans-serif;
      max-width: 360px;
      animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    ">
      <span style="font-size: 1.5rem;">✨</span>
      <div style="flex: 1;">
        <p style="font-weight: 700; color: var(--text-primary, #1f1b2d); margin: 0; font-size: 0.9rem;">Update Available</p>
        <p style="color: var(--text-secondary, #5a5568); font-size: 0.8rem; margin: 0.15rem 0 0;">A new version is ready.</p>
      </div>
      <button onclick="window.location.reload()" style="
        background: linear-gradient(135deg, #ff2a7a, #7c3bed);
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.4rem 0.9rem;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
        font-family: 'Poppins', 'Inter', sans-serif;
        white-space: nowrap;
      ">Refresh</button>
      <button onclick="this.closest('#pwa-update-toast').remove()" style="
        background: none;
        border: none;
        color: var(--text-secondary, #5a5568);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      ">×</button>
    </div>
    <style>
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
    </style>
  `;
  document.body.appendChild(toast);
  // Auto-dismiss after 10s
  setTimeout(() => toast.remove(), 10000);
}

export default PWARegistration;
