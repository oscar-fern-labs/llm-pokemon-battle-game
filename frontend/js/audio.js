// 8-bit Style Audio Generator for LLM Pokemon Battle
class ChiptuneAudio {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.initialized = false;
        this.currentMusic = null;
        this.soundEffects = new Map();
        
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.3; // Master volume
            
            this.initialized = true;
            console.log('🎵 Chiptune Audio System Initialized');
        } catch (error) {
            console.warn('🔇 Audio context not available:', error);
        }
    }

    // Create a square wave oscillator (classic 8-bit sound)
    createOscillator(frequency, type = 'square') {
        if (!this.initialized) return null;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        return { oscillator, gainNode };
    }

    // Play a simple note
    playNote(frequency, duration = 0.2, volume = 0.1, type = 'square') {
        if (!this.initialized) return;
        
        const { oscillator, gainNode } = this.createOscillator(frequency, type);
        if (!oscillator) return;
        
        const currentTime = this.audioContext.currentTime;
        
        // Envelope: quick attack, quick decay
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
    }

    // Play a chord (multiple notes)
    playChord(frequencies, duration = 0.5, volume = 0.05) {
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playNote(freq, duration, volume);
            }, index * 10); // Slight delay for each note
        });
    }

    // Sound Effects
    playSelectSound() {
        // Simple ascending beep
        this.playNote(523, 0.1, 0.1); // C5
    }

    playBattleStartSound() {
        // Dramatic chord progression
        const notes = [261, 329, 392]; // C4, E4, G4
        this.playChord(notes, 0.3, 0.08);
        
        setTimeout(() => {
            const notes2 = [294, 370, 440]; // D4, F#4, A4
            this.playChord(notes2, 0.3, 0.08);
        }, 200);
    }

    playMoveSound() {
        // Quick attack sound
        this.playNote(784, 0.1, 0.15, 'sawtooth'); // G5
        setTimeout(() => {
            this.playNote(659, 0.1, 0.1, 'sawtooth'); // E5
        }, 50);
    }

    playDamageSound() {
        // Harsh damage sound
        this.playNote(147, 0.3, 0.2, 'sawtooth'); // D3
    }

    playVictorySound() {
        // Victory fanfare
        const melody = [523, 659, 784, 1047]; // C5, E5, G5, C6
        melody.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note, 0.4, 0.1);
            }, index * 150);
        });
    }

    playDefeatSound() {
        // Sad descending sound
        const melody = [392, 349, 294, 262]; // G4, F4, D4, C4
        melody.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note, 0.5, 0.08);
            }, index * 200);
        });
    }

    // Background Music Patterns
    playBattleMusic() {
        if (!this.initialized || this.currentMusic) return;
        
        console.log('🎵 Starting battle music...');
        
        const battleMelody = [
            [294, 0.3], [294, 0.3], [392, 0.3], [294, 0.3],
            [262, 0.3], [294, 0.3], [349, 0.6], [294, 0.6],
            [330, 0.3], [330, 0.3], [440, 0.3], [330, 0.3],
            [294, 0.3], [330, 0.3], [392, 0.6], [330, 0.6]
        ];
        
        let melodyIndex = 0;
        
        const playMelodyNote = () => {
            if (!this.currentMusic) return;
            
            const [frequency, duration] = battleMelody[melodyIndex];
            this.playNote(frequency, duration, 0.04, 'triangle');
            
            melodyIndex = (melodyIndex + 1) % battleMelody.length;
            
            setTimeout(playMelodyNote, duration * 600); // Slight pause between notes
        };
        
        this.currentMusic = { type: 'battle', playing: true };
        playMelodyNote();
    }

    playTitleMusic() {
        if (!this.initialized || this.currentMusic) return;
        
        console.log('🎵 Starting title music...');
        
        const titleMelody = [
            [523, 0.4], [659, 0.4], [784, 0.4], [1047, 0.8],
            [784, 0.4], [659, 0.4], [523, 0.8],
            [440, 0.4], [523, 0.4], [659, 0.4], [784, 0.8]
        ];
        
        let melodyIndex = 0;
        
        const playTitleNote = () => {
            if (!this.currentMusic) return;
            
            const [frequency, duration] = titleMelody[melodyIndex];
            this.playNote(frequency, duration, 0.03, 'sine');
            
            melodyIndex = (melodyIndex + 1) % titleMelody.length;
            
            setTimeout(playTitleNote, duration * 800);
        };
        
        this.currentMusic = { type: 'title', playing: true };
        playTitleNote();
    }

    stopMusic() {
        if (this.currentMusic) {
            console.log('🔇 Stopping music...');
            this.currentMusic = null;
        }
    }

    // Set master volume (0-1)
    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
        }
    }

    // Enable/disable audio
    setEnabled(enabled) {
        if (enabled && !this.initialized) {
            this.init();
        } else if (!enabled) {
            this.stopMusic();
        }
    }
}

// Global audio instance
window.chiptuneAudio = new ChiptuneAudio();

// Enhanced sound function for main game
function playSound(soundName) {
    if (!window.chiptuneAudio.initialized) return;
    
    switch (soundName) {
        case 'select':
            window.chiptuneAudio.playSelectSound();
            break;
        case 'battle_start':
            window.chiptuneAudio.playBattleStartSound();
            setTimeout(() => {
                window.chiptuneAudio.playBattleMusic();
            }, 1000);
            break;
        case 'move':
            window.chiptuneAudio.playMoveSound();
            break;
        case 'damage':
            window.chiptuneAudio.playDamageSound();
            break;
        case 'victory':
            window.chiptuneAudio.stopMusic();
            window.chiptuneAudio.playVictorySound();
            break;
        case 'defeat':
            window.chiptuneAudio.stopMusic();
            window.chiptuneAudio.playDefeatSound();
            break;
        case 'title':
            window.chiptuneAudio.stopMusic();
            setTimeout(() => {
                window.chiptuneAudio.playTitleMusic();
            }, 500);
            break;
    }
}

function stopSound(soundName) {
    if (soundName === 'battle' || soundName === 'music') {
        window.chiptuneAudio.stopMusic();
    }
}

// Auto-start title music when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit then start title music
    setTimeout(() => {
        playSound('title');
    }, 2000);
});

console.log('🎵 8-bit Audio System Loaded!');
