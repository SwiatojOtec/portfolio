declare module 'vanta' {
  interface VantaEffect {
    destroy(): void;
  }

  interface VantaNETConfig {
    el: HTMLElement | null;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color?: number;
    spacing?: number;
    maxDistance?: number;
    points?: number;
  }

  interface Vanta {
    NET(config: VantaNETConfig): VantaEffect;
    TOPOLOGY(config: any): VantaEffect;
    FOG(config: any): VantaEffect;
    WAVES(config: any): VantaEffect;
    BIRDS(config: any): VantaEffect;
    CLOUDS(config: any): VantaEffect;
  }

  const vanta: Vanta;
  export default vanta;
} 