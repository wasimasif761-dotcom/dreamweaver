/**
 * Relax & Focus - Pure Noise (Ambient Sound Mixer)
 * Production-Ready Web Audio Engine & Ambient Mixer
 * Author: Waseem Asif
 */

(function () {
  'use strict';

  // --- SVG Icons matching A Soft Murmur exact screenshots ---
  const SOUND_CONFIGS = [
    {
      id: 'rain',
      name: 'Rain',
      // Cloud with 3 water droplets falling underneath
      icon: `<svg viewBox="0 0 100 80" class="sound-svg" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M25 52 C 16 52 10 44 12 36 C 14 28 22 24 28 26 C 32 14 46 8 58 13 C 68 17 72 26 71 34 C 79 34 86 40 85 48 C 84 56 76 58 70 58 Z" fill="rgba(255, 255, 255, 0.45)" stroke="#ffffff"/>
        <!-- 3 falling water droplets -->
        <path d="M35 62 L32 72" stroke="#ffffff" stroke-width="3.5"/>
        <path d="M50 64 L47 76" stroke="#ffffff" stroke-width="3.5"/>
        <path d="M65 62 L62 72" stroke="#ffffff" stroke-width="3.5"/>
      </svg>`
    },
    {
      id: 'thunder',
      name: 'Thunder',
      // Cloud with zigzag lightning bolt
      icon: `<svg viewBox="0 0 100 85" class="sound-svg" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 48 C 14 48 8 41 10 33 C 12 25 20 22 26 24 C 30 12 44 6 56 11 C 66 15 70 24 69 32 C 77 32 84 38 83 46 C 82 52 75 54 68 54 L22 54 Z" stroke="#ffffff"/>
        <!-- Jagged lightning bolt -->
        <polyline points="50 50 42 62 54 62 40 82" stroke="#ffffff" stroke-width="3.5" fill="none"/>
      </svg>`
    },
    {
      id: 'waves',
      name: 'Waves',
      // 3 Stylized oceanic cresting waves
      icon: `<svg viewBox="0 0 100 70" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 48 C 15 32 25 24 35 34 C 37 36 40 37 42 35 C 45 22 56 16 66 26 C 68 28 71 29 73 27 C 76 16 86 12 94 20 C 96 23 96 32 92 40 C 86 52 70 52 64 50 C 52 46 44 54 36 54 C 24 54 16 52 12 48 Z"/>
        <path d="M34 35 C 32 42 26 46 18 46" stroke="#ffffff" stroke-width="2.5"/>
        <path d="M65 27 C 62 36 54 42 45 42" stroke="#ffffff" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: 'wind',
      name: 'Wind',
      // Asian-style ornamental wind / cloud swirl
      icon: `<svg viewBox="0 0 100 65" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M88 42 C 88 42 78 48 68 46 C 58 44 54 36 50 36 C 46 36 42 42 34 42 C 24 42 20 34 22 28 C 24 22 30 20 34 24 C 38 28 34 36 28 36 C 24 36 22 34 22 32"/>
        <path d="M50 36 C 54 32 60 28 66 32 C 70 36 66 44 60 42 C 56 40 56 36 58 34"/>
      </svg>`
    },
    {
      id: 'fire',
      name: 'Fire',
      // Campfire flame with inner tongue
      icon: `<svg viewBox="0 0 80 90" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M40 10 C 44 26 56 32 60 46 C 64 60 56 74 42 78 C 24 82 12 68 18 48 C 22 38 32 30 34 20 C 34 20 30 28 24 34"/>
        <path d="M40 40 C 44 48 50 54 48 64 C 46 70 40 72 36 70 C 30 68 28 60 32 52 C 34 46 38 42 40 40 Z" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: 'birds',
      name: 'Birds',
      // Stylized songbird outline
      icon: `<svg viewBox="0 0 90 80" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M46 22 C 40 22 32 26 32 34 C 32 40 36 44 38 46 C 30 46 20 54 22 66 C 24 76 38 78 50 72 C 64 64 74 48 72 34 C 70 24 58 22 46 22 Z"/>
        <!-- Beak & eye -->
        <circle cx="44" cy="30" r="2" fill="#ffffff"/>
        <path d="M34 28 L24 29 L32 34" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Wing shape -->
        <path d="M42 50 C 42 50 54 48 58 56 C 60 62 52 66 44 64 C 40 62 38 56 42 50 Z" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: 'crickets',
      name: 'Crickets',
      // Clump of upright meadow grass blades
      icon: `<svg viewBox="0 0 80 90" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 80 C 14 56 22 36 34 16 C 32 40 28 64 24 80"/>
        <path d="M40 80 C 38 46 42 26 44 8 C 48 30 46 56 44 80"/>
        <path d="M64 80 C 66 56 58 36 46 16 C 48 40 52 64 56 80"/>
        <path d="M22 80 C 10 66 12 50 8 40 C 14 54 18 68 22 80"/>
        <path d="M58 80 C 70 66 68 50 72 40 C 66 54 62 68 58 80"/>
      </svg>`
    },
    {
      id: 'coffee',
      name: 'Coffee shop',
      // Classic coffee / tea cup on saucer
      icon: `<svg viewBox="0 0 90 70" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cup -->
        <path d="M24 24 L28 48 C 29 54 36 58 45 58 C 54 58 61 54 62 48 L66 24 Z"/>
        <!-- Handle -->
        <path d="M65 28 C 74 28 78 34 76 42 C 74 48 68 50 63 48"/>
        <!-- Saucer -->
        <path d="M16 58 C 28 66 62 66 74 58 L16 58 Z"/>
        <!-- Steam curl -->
        <path d="M38 16 C 40 12 38 8 40 4" stroke-width="2"/>
        <path d="M50 16 C 52 12 50 8 52 4" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'bowl',
      name: 'Singing Bowl',
      // Meditation Tibetan bowl with striker mallet
      icon: `<svg viewBox="0 0 85 85" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="42" cy="42" r="38" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1.5" fill="rgba(255, 255, 255, 0.04)"/>
        <!-- Bowl -->
        <path d="M20 38 C 20 56 30 64 42 64 C 54 64 64 56 64 38 Z" stroke="#ffffff" stroke-width="3"/>
        <line x1="18" y1="38" x2="66" y2="38" stroke="#ffffff" stroke-width="3.5"/>
        <!-- Wooden pestle mallet diagonal -->
        <line x1="32" y1="52" x2="68" y2="20" stroke="#ffffff" stroke-width="4.5"/>
        <!-- Sound particles -->
        <circle cx="36" cy="46" r="1.5" fill="#ffffff"/>
        <circle cx="48" cy="48" r="1.5" fill="#ffffff"/>
        <circle cx="42" cy="52" r="1.5" fill="#ffffff"/>
      </svg>`
    },
    {
      id: 'whitenoise',
      name: 'White noise',
      // Vintage retro TV set with antennas and knobs
      icon: `<svg viewBox="0 0 90 80" class="sound-svg" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Antennas -->
        <line x1="45" y1="24" x2="26" y2="8" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="45" y1="24" x2="64" y2="8" stroke="#ffffff" stroke-width="2.5"/>
        <!-- TV Cabinet -->
        <rect x="14" y="24" width="62" height="46" rx="8" stroke="#ffffff"/>
        <!-- Screen -->
        <rect x="20" y="30" width="38" height="34" rx="4" stroke="#ffffff" stroke-width="2"/>
        <!-- Knobs -->
        <circle cx="67" cy="37" r="3.5" fill="#ffffff"/>
        <circle cx="67" cy="52" r="3.5" fill="#ffffff"/>
        <!-- Small feet -->
        <line x1="24" y1="70" x2="20" y2="76" stroke-width="3"/>
        <line x1="66" y1="70" x2="70" y2="76" stroke-width="3"/>
      </svg>`
    }
  ];

  // Presets
  const DEFAULT_PRESETS = [
    {
      id: 'preset-sleep',
      name: 'Deep Sleep',
      volumes: { rain: 45, waves: 55, whitenoise: 25, wind: 15 }
    },
    {
      id: 'preset-cafe',
      name: 'Cozy Rainy Cafe',
      volumes: { rain: 65, coffee: 50, fire: 30 }
    },
    {
      id: 'preset-thunder',
      name: 'Thunder Meditation',
      volumes: { thunder: 70, rain: 75, wind: 40, bowl: 35 }
    },
    {
      id: 'preset-forest',
      name: 'Peaceful Forest',
      volumes: { birds: 60, wind: 30, crickets: 25, waves: 20 }
    },
    {
      id: 'preset-zen',
      name: 'Zen Tibetan Sanctuary',
      volumes: { bowl: 75, birds: 35, wind: 20, rain: 25 }
    }
  ];

  // App State
  const state = {
    isPlaying: false,
    isMuted: false,
    isMeandering: false,
    masterVolume: 80,
    volumes: {},
    previousVolumes: {},
    meanderOffsets: {},
    customMixes: [],
    timerDuration: 0,
    timerRemaining: 0,
    timerInterval: null,
    meanderInterval: null,
    audioInitialized: false
  };

  // Init volumes
  SOUND_CONFIGS.forEach(s => {
    state.volumes[s.id] = 0;
    state.previousVolumes[s.id] = 50;
    state.meanderOffsets[s.id] = 0;
  });

  // Web Audio Context
  let audioCtx = null;
  let masterGain = null;
  const soundNodes = {};

  function initAudio() {
    if (state.audioInitialized && audioCtx) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API not supported.');
      return;
    }

    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(state.isMuted ? 0 : state.masterVolume / 100, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Setup synthesizers for all 10 sounds
    SOUND_CONFIGS.forEach(cfg => {
      soundNodes[cfg.id] = createSoundGenerator(cfg.id, audioCtx, masterGain);
    });

    state.audioInitialized = true;
  }

  function ensureAudioContext() {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Helper: Noise Buffers
  function createNoiseBuffer(ctx, type = 'pink', duration = 3) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.8;
      }
    }
    return buffer;
  }

  // Synthesizers
  function createSoundGenerator(id, ctx, dest) {
    const channelGain = ctx.createGain();
    channelGain.gain.setValueAtTime(0, ctx.currentTime);
    channelGain.connect(dest);

    let intervals = [];
    let activeNodes = [];

    switch (id) {
      // 1. Rain
      case 'rain': {
        const buffer = createNoiseBuffer(ctx, 'pink', 4);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 400;

        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1100;
        bp.Q.value = 0.7;

        source.connect(hp);
        hp.connect(bp);
        bp.connect(channelGain);
        source.start(0);
        activeNodes.push(source);

        const dropletInterval = setInterval(() => {
          if (!state.isPlaying || state.volumes.rain <= 0) return;
          const osc = ctx.createOscillator();
          const dropGain = ctx.createGain();
          const freq = 1800 + Math.random() * 2500;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.04);

          const dropVol = (state.volumes.rain / 100) * (0.02 + Math.random() * 0.04);
          dropGain.gain.setValueAtTime(dropVol, ctx.currentTime);
          dropGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

          osc.connect(dropGain);
          dropGain.connect(channelGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }, 55);
        intervals.push(dropletInterval);
        break;
      }

      // 2. Thunder: Realistic lightning crack + immediate trigger + fast rolling thunderclaps
      case 'thunder': {
        const brownBuffer = createNoiseBuffer(ctx, 'brown', 6);
        const whiteBuffer = createNoiseBuffer(ctx, 'white', 2);

        // Continuous stormy atmospheric sub-rumble layer
        const ambientStormSource = ctx.createBufferSource();
        ambientStormSource.buffer = brownBuffer;
        ambientStormSource.loop = true;

        const ambientFilter = ctx.createBiquadFilter();
        ambientFilter.type = 'bandpass';
        ambientFilter.frequency.value = 240;
        ambientFilter.Q.value = 1.4;

        const ambientGain = ctx.createGain();
        ambientGain.gain.value = 0.35;

        ambientStormSource.connect(ambientFilter);
        ambientFilter.connect(ambientGain);
        ambientGain.connect(channelGain);
        ambientStormSource.start(0);
        activeNodes.push(ambientStormSource);

        // Function to produce a realistic dramatic lightning strike + rolling thunderclap
        const playThunderStrike = (isImmediate = false) => {
          if (!state.isPlaying || state.volumes.thunder <= 0) return;
          const now = ctx.currentTime;
          const volFactor = (state.volumes.thunder / 100) * 1.5;

          // 1. Sharp electric lightning snap/whip (crack in the clouds)
          const crackSource = ctx.createBufferSource();
          crackSource.buffer = whiteBuffer;

          const crackFilter = ctx.createBiquadFilter();
          crackFilter.type = 'bandpass';
          crackFilter.frequency.value = 1600;
          crackFilter.Q.value = 2.0;

          const crackGain = ctx.createGain();
          crackGain.gain.setValueAtTime(0.001, now);
          crackGain.gain.linearRampToValueAtTime(0.6 * volFactor, now + 0.008);
          crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

          crackSource.connect(crackFilter);
          crackFilter.connect(crackGain);
          crackGain.connect(channelGain);

          crackSource.start(now);
          crackSource.stop(now + 0.12);

          // 2. Main punchy thunder boom (audible punch on mobile speakers)
          const boomSource = ctx.createBufferSource();
          boomSource.buffer = brownBuffer;

          const boomFilter = ctx.createBiquadFilter();
          boomFilter.type = 'lowpass';
          boomFilter.frequency.setValueAtTime(450, now);
          boomFilter.frequency.exponentialRampToValueAtTime(140, now + 1.2);
          boomFilter.Q.value = 2.8;

          const boomGain = ctx.createGain();
          boomGain.gain.setValueAtTime(0.001, now);
          boomGain.gain.linearRampToValueAtTime(1.1 * volFactor, now + 0.04);
          boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

          boomSource.connect(boomFilter);
          boomFilter.connect(boomGain);
          boomGain.connect(channelGain);

          boomSource.start(now);
          boomSource.stop(now + 3.0);

          // 3. Rolling thunder echo 1 (reverberation through sky)
          setTimeout(() => {
            if (!state.isPlaying || state.volumes.thunder <= 0 || !audioCtx) return;
            const t1 = audioCtx.currentTime;
            const echo1Source = audioCtx.createBufferSource();
            echo1Source.buffer = brownBuffer;

            const echo1Filter = audioCtx.createBiquadFilter();
            echo1Filter.type = 'bandpass';
            echo1Filter.frequency.setValueAtTime(260, t1);
            echo1Filter.frequency.linearRampToValueAtTime(120, t1 + 1.6);
            echo1Filter.Q.value = 2.2;

            const echo1Gain = audioCtx.createGain();
            echo1Gain.gain.setValueAtTime(0.001, t1);
            echo1Gain.gain.linearRampToValueAtTime(0.75 * volFactor, t1 + 0.05);
            echo1Gain.gain.exponentialRampToValueAtTime(0.001, t1 + 2.4);

            echo1Source.connect(echo1Filter);
            echo1Filter.connect(echo1Gain);
            echo1Gain.connect(channelGain);

            echo1Source.start(t1);
            echo1Source.stop(t1 + 2.5);
          }, 240);

          // 4. Rolling thunder echo 2 (distant trailing rumble)
          setTimeout(() => {
            if (!state.isPlaying || state.volumes.thunder <= 0 || !audioCtx) return;
            const t2 = audioCtx.currentTime;
            const echo2Source = audioCtx.createBufferSource();
            echo2Source.buffer = brownBuffer;

            const echo2Filter = audioCtx.createBiquadFilter();
            echo2Filter.type = 'lowpass';
            echo2Filter.frequency.setValueAtTime(220, t2);
            echo2Filter.frequency.exponentialRampToValueAtTime(80, t2 + 2.0);
            echo2Filter.Q.value = 1.8;

            const echo2Gain = audioCtx.createGain();
            echo2Gain.gain.setValueAtTime(0.001, t2);
            echo2Gain.gain.linearRampToValueAtTime(0.55 * volFactor, t2 + 0.08);
            echo2Gain.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.6);

            echo2Source.connect(echo2Filter);
            echo2Filter.connect(echo2Gain);
            echo2Gain.connect(channelGain);

            echo2Source.start(t2);
            echo2Source.stop(t2 + 2.8);
          }, 650);
        };

        // Fast & frequent cadence: strike every 2.8 to 4.2 seconds!
        let lastStrike = 0;
        const thunderInterval = setInterval(() => {
          if (!state.isPlaying || state.volumes.thunder <= 0) return;
          const nowMs = Date.now();
          if (nowMs - lastStrike > 2600) {
            lastStrike = nowMs;
            playThunderStrike(false);
          }
        }, 1200);
        intervals.push(thunderInterval);

        return {
          channelGain,
          triggerImmediate() {
            playThunderStrike(true);
          },
          setVolume(val, smooth = true) {
            if (!audioCtx) return;
            const effectiveVal = Math.max(0, Math.min(100, val + (state.isMeandering ? state.meanderOffsets[id] || 0 : 0)));
            const targetVol = state.isPlaying ? (effectiveVal / 100) : 0;
            const now = audioCtx.currentTime;
            if (smooth) {
              channelGain.gain.cancelScheduledValues(now);
              channelGain.gain.setTargetAtTime(targetVol, now, 0.05);
            } else {
              channelGain.gain.setValueAtTime(targetVol, now);
            }
          }
        };
      }

      // 3. Waves
      case 'waves': {
        const surfBuffer = createNoiseBuffer(ctx, 'brown', 6);
        const source = ctx.createBufferSource();
        source.buffer = surfBuffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 350;
        filter.Q.value = 1.0;

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.09;

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 240;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const waveGain = ctx.createGain();
        const lfoAmp = ctx.createOscillator();
        lfoAmp.type = 'sine';
        lfoAmp.frequency.value = 0.09;
        const lfoAmpGain = ctx.createGain();
        lfoAmpGain.gain.value = 0.35;
        waveGain.gain.value = 0.55;
        lfoAmp.connect(lfoAmpGain);
        lfoAmpGain.connect(waveGain.gain);

        source.connect(filter);
        filter.connect(waveGain);
        waveGain.connect(channelGain);

        source.start(0);
        lfo.start(0);
        lfoAmp.start(0);
        activeNodes.push(source, lfo, lfoAmp);
        break;
      }

      // 4. Wind
      case 'wind': {
        const noiseBuffer = createNoiseBuffer(ctx, 'pink', 4);
        const source = ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 450;
        filter.Q.value = 3.2;

        const lfo1 = ctx.createOscillator();
        lfo1.type = 'sine';
        lfo1.frequency.value = 0.07;
        const lfo1Gain = ctx.createGain();
        lfo1Gain.gain.value = 220;
        lfo1.connect(lfo1Gain);
        lfo1Gain.connect(filter.frequency);

        const lfo2 = ctx.createOscillator();
        lfo2.type = 'sine';
        lfo2.frequency.value = 0.17;
        const lfo2Gain = ctx.createGain();
        lfo2Gain.gain.value = 140;
        lfo2.connect(lfo2Gain);
        lfo2Gain.connect(filter.frequency);

        source.connect(filter);
        filter.connect(channelGain);

        source.start(0);
        lfo1.start(0);
        lfo2.start(0);
        activeNodes.push(source, lfo1, lfo2);
        break;
      }

      // 5. Fire
      case 'fire': {
        const brownBuffer = createNoiseBuffer(ctx, 'brown', 3);
        const rumbleSource = ctx.createBufferSource();
        rumbleSource.buffer = brownBuffer;
        rumbleSource.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 200;

        rumbleSource.connect(lowpass);
        lowpass.connect(channelGain);
        rumbleSource.start(0);
        activeNodes.push(rumbleSource);

        const crackleInterval = setInterval(() => {
          if (!state.isPlaying || state.volumes.fire <= 0) return;
          if (Math.random() > 0.45) {
            const osc = ctx.createOscillator();
            const popGain = ctx.createGain();
            const freq = 600 + Math.random() * 2200;
            osc.type = Math.random() > 0.5 ? 'triangle' : 'sawtooth';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.03);

            const crackleVol = (state.volumes.fire / 100) * (0.05 + Math.random() * 0.15);
            popGain.gain.setValueAtTime(crackleVol, ctx.currentTime);
            popGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

            osc.connect(popGain);
            popGain.connect(channelGain);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
          }
        }, 90);
        intervals.push(crackleInterval);
        break;
      }

      // 6. Birds
      case 'birds': {
        const chirpPattern = () => {
          if (!state.isPlaying || state.volumes.birds <= 0) return;

          const numChirps = 2 + Math.floor(Math.random() * 4);
          let startTime = ctx.currentTime;

          for (let i = 0; i < numChirps; i++) {
            const osc = ctx.createOscillator();
            const chirpGain = ctx.createGain();
            const baseFreq = 2200 + Math.random() * 1200;
            const targetFreq = baseFreq + (Math.random() > 0.5 ? 800 : -500);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(baseFreq, startTime);
            osc.frequency.exponentialRampToValueAtTime(targetFreq, startTime + 0.08);

            const birdVol = (state.volumes.birds / 100) * 0.18;
            chirpGain.gain.setValueAtTime(0.001, startTime);
            chirpGain.gain.linearRampToValueAtTime(birdVol, startTime + 0.02);
            chirpGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.09);

            osc.connect(chirpGain);
            chirpGain.connect(channelGain);

            osc.start(startTime);
            osc.stop(startTime + 0.1);
            startTime += 0.12 + Math.random() * 0.08;
          }
        };

        const birdInterval = setInterval(() => {
          if (Math.random() > 0.35) {
            chirpPattern();
          }
        }, 3200);
        intervals.push(birdInterval);
        break;
      }

      // 7. Crickets
      case 'crickets': {
        const carrier = ctx.createOscillator();
        carrier.type = 'sine';
        carrier.frequency.value = 4600;

        const cricketPulsing = ctx.createGain();
        cricketPulsing.gain.value = 0;

        carrier.connect(cricketPulsing);
        cricketPulsing.connect(channelGain);
        carrier.start(0);
        activeNodes.push(carrier);

        let inBurst = false;
        const cricketInterval = setInterval(() => {
          if (!state.isPlaying || state.volumes.crickets <= 0) {
            cricketPulsing.gain.setValueAtTime(0, ctx.currentTime);
            return;
          }
          inBurst = !inBurst;
          if (inBurst) {
            const vol = (state.volumes.crickets / 100) * 0.12;
            cricketPulsing.gain.setValueAtTime(vol, ctx.currentTime);
          } else {
            cricketPulsing.gain.setValueAtTime(0, ctx.currentTime);
          }
        }, 900);
        intervals.push(cricketInterval);
        break;
      }

      // 8. Coffee shop
      case 'coffee': {
        const pinkBuffer = createNoiseBuffer(ctx, 'pink', 4);
        const chatterSource = ctx.createBufferSource();
        chatterSource.buffer = pinkBuffer;
        chatterSource.loop = true;

        const bp1 = ctx.createBiquadFilter();
        bp1.type = 'bandpass';
        bp1.frequency.value = 500;
        bp1.Q.value = 2.0;

        const bp2 = ctx.createBiquadFilter();
        bp2.type = 'bandpass';
        bp2.frequency.value = 1600;
        bp2.Q.value = 2.5;

        chatterSource.connect(bp1);
        chatterSource.connect(bp2);
        bp1.connect(channelGain);
        bp2.connect(channelGain);

        chatterSource.start(0);
        activeNodes.push(chatterSource);

        const clinkInterval = setInterval(() => {
          if (!state.isPlaying || state.volumes.coffee <= 0) return;
          if (Math.random() > 0.4) {
            const clinkOsc = ctx.createOscillator();
            const clinkGain = ctx.createGain();
            const clinkFreq = 2600 + Math.random() * 800;

            clinkOsc.type = 'sine';
            clinkOsc.frequency.setValueAtTime(clinkFreq, ctx.currentTime);

            const vol = (state.volumes.coffee / 100) * 0.05;
            clinkGain.gain.setValueAtTime(vol, ctx.currentTime);
            clinkGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

            clinkOsc.connect(clinkGain);
            clinkGain.connect(channelGain);

            clinkOsc.start();
            clinkOsc.stop(ctx.currentTime + 0.3);
          }
        }, 4000);
        intervals.push(clinkInterval);
        break;
      }

      // 9. Singing Bowl
      case 'bowl': {
        const strikeBowl = () => {
          if (!state.isPlaying || state.volumes.bowl <= 0) return;
          const partials = [
            { freq: 216, gain: 0.28, decay: 9.0 },
            { freq: 588, gain: 0.18, decay: 7.5 },
            { freq: 1166, gain: 0.10, decay: 5.0 },
            { freq: 1780, gain: 0.05, decay: 3.5 }
          ];

          partials.forEach(p => {
            const osc = ctx.createOscillator();
            const partGain = ctx.createGain();
            const now = ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(p.freq, now);

            const vibrato = ctx.createOscillator();
            vibrato.frequency.value = 0.2 + Math.random() * 0.1;
            const vibratoGain = ctx.createGain();
            vibratoGain.gain.value = 1.5;
            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(now);
            vibrato.stop(now + p.decay);

            const peakVol = (state.volumes.bowl / 100) * p.gain;
            partGain.gain.setValueAtTime(0.001, now);
            partGain.gain.linearRampToValueAtTime(peakVol, now + 0.06);
            partGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

            osc.connect(partGain);
            partGain.connect(channelGain);

            osc.start(now);
            osc.stop(now + p.decay + 0.1);
          });
        };

        const bowlInterval = setInterval(() => {
          strikeBowl();
        }, 8000);
        intervals.push(bowlInterval);
        break;
      }

      // 10. White noise
      case 'whitenoise': {
        const whiteBuffer = createNoiseBuffer(ctx, 'white', 3);
        const source = ctx.createBufferSource();
        source.buffer = whiteBuffer;
        source.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 7500;

        source.connect(lowpass);
        lowpass.connect(channelGain);
        source.start(0);
        activeNodes.push(source);
        break;
      }
    }

    return {
      channelGain,
      setVolume(val, smooth = true) {
        if (!audioCtx) return;
        const effectiveVal = Math.max(0, Math.min(100, val + (state.isMeandering ? state.meanderOffsets[id] || 0 : 0)));
        const targetVol = state.isPlaying ? (effectiveVal / 100) : 0;
        const now = audioCtx.currentTime;
        if (smooth) {
          channelGain.gain.cancelScheduledValues(now);
          channelGain.gain.setTargetAtTime(targetVol, now, 0.05);
        } else {
          channelGain.gain.setValueAtTime(targetVol, now);
        }
      }
    };
  }

  function updateAllVolumes(smooth = true) {
    if (!state.audioInitialized) return;
    SOUND_CONFIGS.forEach(cfg => {
      const vol = state.volumes[cfg.id] || 0;
      if (soundNodes[cfg.id]) {
        soundNodes[cfg.id].setVolume(vol, smooth);
      }
    });
  }

  // --- Meander Feature (A Soft Murmur's wave button) ---
  function toggleMeander() {
    state.isMeandering = !state.isMeandering;
    const meanderBtn = document.getElementById('btn-meander');

    if (state.isMeandering) {
      if (meanderBtn) meanderBtn.classList.add('active-feature');
      showToast('Meander active: sounds will gently wander in volume');
      
      state.meanderInterval = setInterval(() => {
        if (!state.isPlaying || !state.isMeandering) return;
        SOUND_CONFIGS.forEach(cfg => {
          if (state.volumes[cfg.id] > 0) {
            // Random gentle drift between -8 and +8%
            state.meanderOffsets[cfg.id] = (Math.random() * 16) - 8;
            if (soundNodes[cfg.id]) {
              soundNodes[cfg.id].setVolume(state.volumes[cfg.id], true);
            }
          }
        });
      }, 4000);
    } else {
      if (meanderBtn) meanderBtn.classList.remove('active-feature');
      if (state.meanderInterval) {
        clearInterval(state.meanderInterval);
        state.meanderInterval = null;
      }
      SOUND_CONFIGS.forEach(cfg => {
        state.meanderOffsets[cfg.id] = 0;
      });
      updateAllVolumes(true);
      showToast('Meander disabled');
    }
  }

  // --- Master Controls ---
  function setMasterMute(muted) {
    state.isMuted = muted;
    if (audioCtx && masterGain) {
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(muted ? 0 : state.masterVolume / 100, now, 0.05);
    }
    updateMuteUI();
  }

  function togglePlayPause() {
    ensureAudioContext();
    state.isPlaying = !state.isPlaying;

    if (state.isPlaying) {
      const totalVol = Object.values(state.volumes).reduce((a, b) => a + b, 0);
      if (totalVol === 0) {
        setSoundVolume('rain', 50);
      }
    }

    updateAllVolumes(true);
    updatePlayPauseUI();
  }

  function resetAll() {
    ensureAudioContext();
    SOUND_CONFIGS.forEach(cfg => {
      state.volumes[cfg.id] = 0;
      const slider = document.getElementById(`slider-${cfg.id}`);
      const item = document.getElementById(`sound-item-${cfg.id}`);
      if (slider) {
        slider.value = 0;
        updateSliderProgress(slider);
      }
      if (item) item.classList.remove('active');
    });

    state.isPlaying = false;
    updateAllVolumes(true);
    updatePlayPauseUI();
    stopTimer();
    showToast('All sounds reset');
  }

  function setSoundVolume(soundId, value) {
    ensureAudioContext();
    const num = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
    state.volumes[soundId] = num;
    if (num > 0) {
      state.previousVolumes[soundId] = num;
    }

    if (num > 0 && !state.isPlaying) {
      state.isPlaying = true;
      updatePlayPauseUI();
    }

    const slider = document.getElementById(`slider-${soundId}`);
    const item = document.getElementById(`sound-item-${soundId}`);

    if (slider) {
      slider.value = num;
      updateSliderProgress(slider);
    }
    if (item) {
      if (num > 0 && state.isPlaying) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }

    if (soundNodes[soundId]) {
      soundNodes[soundId].setVolume(num, true);
      // Immediately trigger thunderclap on adjustment so user hears it instantly
      if (soundId === 'thunder' && num > 0 && typeof soundNodes.thunder.triggerImmediate === 'function') {
        soundNodes.thunder.triggerImmediate();
      }
    }

    updateUrlHashWithState();
  }

  function toggleSoundMute(soundId) {
    const current = state.volumes[soundId] || 0;
    if (current > 0) {
      state.previousVolumes[soundId] = current;
      setSoundVolume(soundId, 0);
    } else {
      const prev = state.previousVolumes[soundId] || 50;
      setSoundVolume(soundId, prev);
    }
  }

  // --- Sleep Timer ---
  function startTimer(minutes) {
    ensureAudioContext();
    stopTimer();

    state.timerDuration = minutes * 60;
    state.timerRemaining = state.timerDuration;
    updateTimerDisplay();

    const banner = document.getElementById('timer-banner');
    if (banner) banner.classList.remove('hidden');

    state.timerInterval = setInterval(() => {
      state.timerRemaining--;

      // Smooth fade out in the last 45s
      if (state.timerRemaining <= 45 && state.timerRemaining > 0 && audioCtx && masterGain) {
        const factor = Math.max(0.01, state.timerRemaining / 45);
        masterGain.gain.setValueAtTime((state.masterVolume / 100) * factor, audioCtx.currentTime);
      }

      if (state.timerRemaining <= 0) {
        stopTimer();
        state.isPlaying = false;
        updateAllVolumes(false);
        updatePlayPauseUI();
        if (masterGain && audioCtx) {
          masterGain.gain.setValueAtTime(state.masterVolume / 100, audioCtx.currentTime);
        }
        showToast('Timer ended - soundscape paused');
      } else {
        updateTimerDisplay();
      }
    }, 1000);

    showToast(`Timer set for ${minutes} min`);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    state.timerRemaining = 0;
    state.timerDuration = 0;
    const banner = document.getElementById('timer-banner');
    if (banner) banner.classList.add('hidden');
    if (masterGain && audioCtx && !state.isMuted) {
      masterGain.gain.setValueAtTime(state.masterVolume / 100, audioCtx.currentTime);
    }
  }

  function updateTimerDisplay() {
    const timeDisplay = document.getElementById('timer-time-remaining');
    const timerProgress = document.getElementById('timer-bar-fill');
    if (!timeDisplay) return;

    const mins = Math.floor(state.timerRemaining / 60);
    const secs = state.timerRemaining % 60;
    timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (timerProgress && state.timerDuration > 0) {
      const pct = ((state.timerDuration - state.timerRemaining) / state.timerDuration) * 100;
      timerProgress.style.width = `${pct}%`;
    }
  }

  // --- Saved Mixes ---
  function loadSavedMixes() {
    try {
      const stored = localStorage.getItem('relax_focus_mixes') || localStorage.getItem('dreamweaver_mixes');
      if (stored) {
        state.customMixes = JSON.parse(stored);
      }
    } catch (e) {}
    renderMixesList();
  }

  function saveCurrentMix(name) {
    if (!name || !name.trim()) return;
    const trimmed = name.trim();
    const mixData = {
      id: 'custom-' + Date.now(),
      name: trimmed,
      volumes: { ...state.volumes },
      createdAt: new Date().toLocaleDateString()
    };

    state.customMixes.unshift(mixData);
    try {
      localStorage.setItem('relax_focus_mixes', JSON.stringify(state.customMixes));
    } catch (e) {}

    renderMixesList();
    showToast(`Saved mix "${trimmed}"`);
  }

  function deleteCustomMix(mixId) {
    state.customMixes = state.customMixes.filter(m => m.id !== mixId);
    try {
      localStorage.setItem('relax_focus_mixes', JSON.stringify(state.customMixes));
    } catch (e) {}
    renderMixesList();
    showToast('Mix deleted');
  }

  function applyPreset(preset) {
    ensureAudioContext();
    SOUND_CONFIGS.forEach(cfg => {
      const targetVol = (preset.volumes && preset.volumes[cfg.id]) ? preset.volumes[cfg.id] : 0;
      setSoundVolume(cfg.id, targetVol);
    });

    state.isPlaying = true;
    updateAllVolumes(true);
    updatePlayPauseUI();
    showToast(`Loaded "${preset.name}"`);
  }

  // --- URL Sharing ---
  function updateUrlHashWithState() {
    const activePairs = [];
    SOUND_CONFIGS.forEach(cfg => {
      const v = state.volumes[cfg.id];
      if (v > 0) {
        activePairs.push(`${cfg.id}:${v}`);
      }
    });

    if (activePairs.length > 0) {
      window.history.replaceState(null, '', `#mix=${activePairs.join(',')}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  function parseUrlHashMix() {
    const hash = window.location.hash;
    if (!hash || !hash.includes('mix=')) return;
    const mixStr = hash.replace(/^#.*mix=/, '');
    const pairs = mixStr.split(',');
    let loadedAny = false;

    pairs.forEach(p => {
      const [id, valStr] = p.split(':');
      if (id && valStr && SOUND_CONFIGS.some(c => c.id === id)) {
        const val = parseInt(valStr, 10);
        if (!isNaN(val)) {
          state.volumes[id] = val;
          loadedAny = true;
        }
      }
    });

    if (loadedAny) {
      SOUND_CONFIGS.forEach(cfg => {
        const slider = document.getElementById(`slider-${cfg.id}`);
        const item = document.getElementById(`sound-item-${cfg.id}`);
        const vol = state.volumes[cfg.id] || 0;
        if (slider) {
          slider.value = vol;
          updateSliderProgress(slider);
        }
        if (item && vol > 0) item.classList.add('active');
      });
      showToast('Shared soundscape loaded!');
    }
  }

  function shareCurrentSoundscape() {
    updateUrlHashWithState();
    const shareUrl = window.location.href;
    const title = 'Relax & Focus | Pure Noise';
    const text = 'Listen to my ambient focus soundscape on Relax & Focus (Pure Noise):';

    if (navigator.share) {
      navigator.share({
        title,
        text,
        url: shareUrl
      }).catch(() => {
        copyToClipboard(shareUrl);
      });
    } else {
      copyToClipboard(shareUrl);
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('Link copied to clipboard!');
  }

  // --- UI Slider Progress Styling ---
  function updateSliderProgress(slider) {
    const val = slider.value;
    const min = slider.min || 0;
    const max = slider.max || 100;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--slider-fill', `${pct}%`);
  }

  function updatePlayPauseUI() {
    const playTriangle = document.getElementById('icon-play-triangle');
    const pauseBars = document.getElementById('icon-pause-bars');

    if (state.isPlaying) {
      if (playTriangle) playTriangle.classList.add('hidden');
      if (pauseBars) pauseBars.classList.remove('hidden');
    } else {
      if (playTriangle) playTriangle.classList.remove('hidden');
      if (pauseBars) pauseBars.classList.add('hidden');
    }

    SOUND_CONFIGS.forEach(cfg => {
      const item = document.getElementById(`sound-item-${cfg.id}`);
      if (item) {
        if (state.isPlaying && state.volumes[cfg.id] > 0) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
    });
  }

  function updateMuteUI() {
    const muteBtn = document.getElementById('btn-mute');
    if (!muteBtn) return;
    if (state.isMuted) {
      muteBtn.classList.add('is-muted');
      muteBtn.textContent = 'UNMUTE';
    } else {
      muteBtn.classList.remove('is-muted');
      muteBtn.textContent = 'MUTE';
    }
  }

  // Render centered sound elements matching screenshots
  function renderSoundList() {
    const container = document.getElementById('sounds-scroll-list');
    if (!container) return;

    container.innerHTML = SOUND_CONFIGS.map(sound => {
      const currentVol = state.volumes[sound.id] || 0;
      return `
        <div id="sound-item-${sound.id}" class="sound-centered-item ${currentVol > 0 && state.isPlaying ? 'active' : ''}">
          <button type="button" class="sound-icon-trigger" data-sound-id="${sound.id}" title="Toggle ${sound.name}">
            <div class="sound-svg-wrap">
              ${sound.icon}
            </div>
          </button>
          
          <div class="sound-name-label">${sound.name}</div>
          
          <div class="slider-centered-container">
            <input
              type="range"
              id="slider-${sound.id}"
              class="murmur-slider"
              min="0"
              max="100"
              value="${currentVol}"
              data-sound-id="${sound.id}"
              aria-label="${sound.name} volume"
            />
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners
    SOUND_CONFIGS.forEach(sound => {
      const slider = document.getElementById(`slider-${sound.id}`);
      if (slider) {
        updateSliderProgress(slider);
        slider.addEventListener('input', (e) => {
          setSoundVolume(sound.id, e.target.value);
        });
      }

      const iconBtn = document.querySelector(`[data-sound-id="${sound.id}"]`);
      if (iconBtn) {
        iconBtn.addEventListener('click', () => {
          toggleSoundMute(sound.id);
        });
      }
    });
  }

  function renderMixesList() {
    const presetPills = document.getElementById('preset-pills-list');
    const customList = document.getElementById('custom-mixes-scroll');

    if (presetPills) {
      presetPills.innerHTML = DEFAULT_PRESETS.map(p => `
        <button type="button" class="preset-pill-btn" data-preset-id="${p.id}">
          <span>${p.name}</span>
        </button>
      `).join('');

      presetPills.querySelectorAll('.preset-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pId = btn.getAttribute('data-preset-id');
          const found = DEFAULT_PRESETS.find(p => p.id === pId);
          if (found) {
            applyPreset(found);
            const modal = document.getElementById('mixes-modal');
            if (modal) modal.classList.add('hidden');
          }
        });
      });
    }

    if (customList) {
      if (state.customMixes.length === 0) {
        customList.innerHTML = `<div class="empty-mixes-text">No custom mixes saved yet. Set sound volumes and save your mix above!</div>`;
      } else {
        customList.innerHTML = state.customMixes.map(m => `
          <div class="saved-mix-row">
            <button type="button" class="load-custom-mix-btn" data-mix-id="${m.id}">
              <span class="mix-name-text">${m.name}</span>
              <span class="mix-date-text">${m.createdAt || 'Saved'}</span>
            </button>
            <button type="button" class="delete-custom-mix-btn" data-delete-id="${m.id}" title="Delete">
              &times;
            </button>
          </div>
        `).join('');

        customList.querySelectorAll('.load-custom-mix-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const mId = btn.getAttribute('data-mix-id');
            const found = state.customMixes.find(m => m.id === mId);
            if (found) {
              applyPreset(found);
              const modal = document.getElementById('mixes-modal');
              if (modal) modal.classList.add('hidden');
            }
          });
        });

        customList.querySelectorAll('.delete-custom-mix-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dId = btn.getAttribute('data-delete-id');
            deleteCustomMix(dId);
          });
        });
      }
    }
  }

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Setup PWA & Service Worker ---
  let deferredInstallPrompt = null;

  function setupPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('SW registered:', reg.scope);
        }).catch(err => console.warn('SW err:', err));
      });
    }

    const installTriggerBtns = document.querySelectorAll('.pwa-install-trigger');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator.standalone === true);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
    });

    installTriggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          deferredInstallPrompt.userChoice.then(() => {
            deferredInstallPrompt = null;
          });
        } else {
          showToast('Tap browser menu (⋮) -> "Add to Home screen" or "Install App"');
        }
      });
    });
  }

  // --- Modals Setup ---
  function setupModals() {
    // Timers Modal
    const timersBtn = document.getElementById('btn-action-timers');
    const timersModal = document.getElementById('timers-modal');
    const closeTimers = document.getElementById('btn-close-timers');

    if (timersBtn && timersModal) {
      timersBtn.addEventListener('click', () => timersModal.classList.remove('hidden'));
    }
    if (closeTimers && timersModal) {
      closeTimers.addEventListener('click', () => timersModal.classList.add('hidden'));
    }

    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mins = parseInt(btn.getAttribute('data-mins'), 10);
        if (mins) {
          startTimer(mins);
          if (timersModal) timersModal.classList.add('hidden');
        }
      });
    });

    const customTimerForm = document.getElementById('custom-timer-form');
    if (customTimerForm) {
      customTimerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('custom-mins-input');
        const mins = parseInt(input.value, 10);
        if (mins && mins > 0) {
          startTimer(mins);
          input.value = '';
          if (timersModal) timersModal.classList.add('hidden');
        }
      });
    }

    const cancelTimerBtn = document.getElementById('btn-cancel-timer-banner');
    if (cancelTimerBtn) {
      cancelTimerBtn.addEventListener('click', () => {
        stopTimer();
        showToast('Timer cancelled');
      });
    }

    // Mixes Modal
    const mixesBtn = document.getElementById('btn-action-mixes');
    const mixesModal = document.getElementById('mixes-modal');
    const closeMixes = document.getElementById('btn-close-mixes');

    if (mixesBtn && mixesModal) {
      mixesBtn.addEventListener('click', () => mixesModal.classList.remove('hidden'));
    }
    if (closeMixes && mixesModal) {
      closeMixes.addEventListener('click', () => mixesModal.classList.add('hidden'));
    }

    const saveMixForm = document.getElementById('save-mix-form');
    if (saveMixForm) {
      saveMixForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('input-mix-name');
        if (input && input.value.trim()) {
          saveCurrentMix(input.value.trim());
          input.value = '';
        }
      });
    }

    // Share Button
    const shareBtn = document.getElementById('btn-action-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCurrentSoundscape);
    }

    // More Sounds Button
    const moreSoundsBtn = document.getElementById('btn-more-sounds');
    const moreSoundsModal = document.getElementById('more-sounds-modal');
    const closeMore = document.getElementById('btn-close-more');
    if (moreSoundsBtn && moreSoundsModal) {
      moreSoundsBtn.addEventListener('click', () => moreSoundsModal.classList.remove('hidden'));
    }
    if (closeMore && moreSoundsModal) {
      closeMore.addEventListener('click', () => moreSoundsModal.classList.add('hidden'));
    }

    // Main Control Handlers
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) muteBtn.addEventListener('click', () => setMasterMute(!state.isMuted));

    const centerPlayBtn = document.getElementById('btn-center-play');
    if (centerPlayBtn) centerPlayBtn.addEventListener('click', togglePlayPause);

    const resetTrashBtn = document.getElementById('btn-reset-trash');
    if (resetTrashBtn) resetTrashBtn.addEventListener('click', resetAll);

    const meanderBtn = document.getElementById('btn-meander');
    if (meanderBtn) meanderBtn.addEventListener('click', toggleMeander);
  }

  // --- Document Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    renderSoundList();
    loadSavedMixes();
    setupModals();
    setupPWA();
    parseUrlHashMix();

    document.addEventListener('click', () => {
      if (!state.audioInitialized) {
        initAudio();
      }
    }, { once: true });
  });

  window.RelaxAndFocus = {
    state,
    setSoundVolume,
    togglePlayPause,
    resetAll,
    toggleMeander,
    startTimer,
    stopTimer
  };
  window.AdobeDreamweaver = window.RelaxAndFocus;
})();
