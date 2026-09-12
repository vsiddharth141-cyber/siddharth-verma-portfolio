/**
 * Voice Greeting Module — Web SpeechSynthesis API
 * Interactive studio microphone voice playback and synchronized waveform visualizer
 */

import { PORTFOLIO_DATA } from './data.js';

export function initVoiceGreeting() {
  const micBtn = document.getElementById('studio-mic-btn');
  const waveform = document.getElementById('audio-waveform');
  const speechBubble = document.getElementById('speech-bubble');
  const speechBubbleText = document.getElementById('speech-bubble-text');

  if (!micBtn) return;

  const greetingSentence = PORTFOLIO_DATA.personal.voiceGreetingText || "Hello, my name is Siddharth. I am a B.Tech CSE student.";
  let isSpeaking = false;
  let synth = window.speechSynthesis || null;

  // Set accessible attributes
  micBtn.setAttribute('aria-label', "Play Siddharth's introduction");
  micBtn.setAttribute('title', "Click to hear Siddharth's voice greeting");

  function startWaveform() {
    isSpeaking = true;
    micBtn.classList.add('is-playing');
    micBtn.setAttribute('aria-label', "Playing Siddharth's introduction");
    if (waveform) waveform.classList.add('is-active');
    if (speechBubble) {
      speechBubble.style.borderColor = 'var(--cyan)';
      speechBubble.style.boxShadow = '0 0 25px rgba(0, 242, 254, 0.4)';
    }
  }

  function stopWaveform() {
    isSpeaking = false;
    micBtn.classList.remove('is-playing');
    micBtn.setAttribute('aria-label', "Play Siddharth's introduction (Click to replay)");
    if (waveform) waveform.classList.remove('is-active');
    if (speechBubble) {
      speechBubble.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      speechBubble.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 242, 254, 0.15)';
    }
  }

  function playSpeechGreeting() {
    if (!synth) {
      // Fallback for browsers without SpeechSynthesis
      startWaveform();
      setTimeout(stopWaveform, 3500);
      return;
    }

    // If already speaking, cancel it
    if (synth.speaking) {
      synth.cancel();
      stopWaveform();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(greetingSentence);
    utterance.rate = 0.95; // Natural pleasant speaking cadence
    utterance.pitch = 1.0;

    // Pick best available English voice
    const voices = synth.getVoices();
    if (voices.length > 0) {
      const selectedVoice = voices.find(v => v.lang.startsWith('en-IN')) ||
                            voices.find(v => v.lang.startsWith('en-US')) ||
                            voices.find(v => v.lang.startsWith('en-GB')) ||
                            voices[0];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      startWaveform();
    };

    utterance.onend = () => {
      stopWaveform();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error or interruption:', e);
      stopWaveform();
    };

    try {
      synth.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis could not speak:', err);
      stopWaveform();
    }
  }

  micBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSpeechGreeting();
  });

  // Pre-load voices if asynchronous
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => {
      synth.getVoices();
    };
  }
}
