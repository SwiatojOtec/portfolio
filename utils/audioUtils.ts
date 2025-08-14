// Utility to create switch click sound using Web Audio API
export const createSwitchClickSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Create a short click sound
    const duration = 0.1
    const sampleRate = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)
    
    // Generate click sound (short burst of noise)
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      // Sharp attack, quick decay
      const envelope = Math.exp(-t * 50)
      // Mix of frequencies to create click sound
      const noise = (Math.random() * 2 - 1) * 0.3
      const tone = Math.sin(2 * Math.PI * 800 * t) * 0.1
      data[i] = (noise + tone) * envelope
    }
    
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(audioContext.destination)
    source.start()
    
  } catch (error) {
    console.log('Audio playback not supported or failed:', error)
  }
}

// Alternative: Play a simple beep sound
export const playClickSound = () => {
  try {
    // Try to load audio file first
    const audio = new Audio('/sounds/switch-click.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Fallback to generated sound
      createSwitchClickSound()
    })
  } catch (error) {
    // Final fallback
    createSwitchClickSound()
  }
} 