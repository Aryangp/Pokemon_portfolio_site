// Retro 8-bit Web Audio API Chiptune Synthesizer
// Zero external assets required, instantaneous, reliable, and authentic Game Boy frequencies.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('trainer_dev_muted');
      if (savedMute !== null) {
        this.muted = savedMute === 'true';
      }
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('trainer_dev_muted', String(this.muted));
    }
    if (!this.muted) {
      this.playSelect();
    }
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
    if (typeof window !== 'undefined') {
      localStorage.setItem('trainer_dev_muted', String(this.muted));
    }
  }

  // Retro A-Button Select Blip
  public playSelect(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Retro Pokéball Hover Tick
  public playHover(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(1320, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Pokéball Wobble Mechanical Click
  public playWobble(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Pokéball Open / Release Chime (Ascending 4-tone Arpeggio)
  public playOpen(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const noteDuration = 0.06;
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * noteDuration);

      gain.gain.setValueAtTime(0.1, now + idx * noteDuration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * noteDuration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * noteDuration);
      osc.stop(now + (idx + 1) * noteDuration);
    });
  }

  // Pokéball Caught / Gotcha chime
  public playGotcha(): void {
    this.playOpen();
  }

  // Dialogue Typewriter Text Blip
  public playDialogue(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const now = ctx.currentTime;

    // Subtle random frequency variation like classic Pokémon text bleeps
    const freqs = [620, 660, 700, 740];
    const chosen = freqs[Math.floor(Math.random() * freqs.length)];

    osc.frequency.setValueAtTime(chosen, now);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  }

  // Bill's PC Boot Sound
  public playPcBoot(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.08, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + (idx + 1) * 0.09);
    });
  }

  // Fanfare / CV Download Jingle
  public playFanfare(): void {
    if (this.muted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const sequence = [
      { f: 587.33, d: 0.1 }, // D5
      { f: 587.33, d: 0.1 }, // D5
      { f: 587.33, d: 0.1 }, // D5
      { f: 783.99, d: 0.35 }, // G5 (Hold)
    ];

    let current = ctx.currentTime;
    sequence.forEach(({ f, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(f, current);

      gain.gain.setValueAtTime(0.12, current);
      gain.gain.exponentialRampToValueAtTime(0.001, current + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(current);
      osc.stop(current + d);

      current += d * 0.9;
    });
  }
}

export const sound = new SoundEngine();
