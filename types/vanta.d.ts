declare module 'vanta' {
  interface VantaEffect {
    destroy(): void;
  }

  interface VantaTOPOLOGYConfig {
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
  }

  interface Vanta {
    TOPOLOGY(config: VantaTOPOLOGYConfig): VantaEffect;
    FOG(config: any): VantaEffect;
    NET(config: any): VantaEffect;
    WAVES(config: any): VantaEffect;
    BIRDS(config: any): VantaEffect;
    CLOUDS(config: any): VantaEffect;
  }

  const vanta: Vanta;
  export default vanta;
} 