// Core types for the new Chain Offer format

// Component state types
export type OfferState = 'Locked' | 'Unlocked' | 'Claimed';
export type HeaderState = 'active' | 'success' | 'fail';
export type ButtonState = 'default' | 'disabled' | 'hover' | 'active' | 'claimed';

// Fill and styling types
export interface Fill {
  type: 'solid' | 'gradient';
  color?: string;
  gradient?: Gradient;
}

export interface Gradient {
  type: 'linear' | 'radial' | 'angular';
  stops: GradientStop[];
  rotation?: number;
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface DropShadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface Stroke {
  width: number;
  color: string;
}

// Offer component with state-based bounds
export interface Offer {
  offerKey: string;
  stateBounds: {
    Locked: ImageBounds;
    Unlocked: ImageBounds;
    Claimed: ImageBounds;
  };
  lockedImg?: string;
  unlockedImg?: string;
  claimedImg?: string;
}

// Base interface for image-based component positioning
export interface ImageBounds {
  x: number;
  y: number;
  width?: number;
  height?: number;
  w?: number; // Alternative for width
  h?: number; // Alternative for height
  rotation?: number;
}

// Timer component
export interface TimerComponent {
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  borderRadius: number;
  backgroundFill: Fill;
  isAutolayout: boolean;
  layoutSizing?: {
    horizontal: string;
    vertical: string;
  };
  padding: {
    vertical: number;
    horizontal: number;
  };
  dropShadows: DropShadow[];
  stroke?: Stroke;
  textStyle: {
    fontSize: number;
    color: string;
    fontWeight?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
  };
}

// Header component
export interface HeaderComponent {
  stateBounds: {
    active: ImageBounds;
    success: ImageBounds;
    fail: ImageBounds;
  };
  activeImg: string;
  successImg: string;
  failImg: string;
}

// Button icon definition
export interface ButtonIcon {
  bounds: ImageBounds;
  img: string;
}

// Button component
export interface ButtonComponent {
  offerKey: string;
  position: {
    x: number;
    y: number;
  };
  stateStyles: {
    default: ButtonStateStyle;
    disabled: ButtonStateStyle;
    hover: ButtonStateStyle;
    active: ButtonStateStyle;
    claimed: ButtonStateStyle;
  };
  icons?: Partial<Record<ButtonState, ButtonIcon>>;
}

export interface ButtonStateStyle {
  frame: {
    borderRadius: number;
    backgroundFill: Fill;
    isAutolayout: boolean;
    layoutSizing?: {
      horizontal: string;
      vertical: string;
    };
    dimensions?: {
      width: number;
      height: number;
    };
    padding: {
      vertical: number;
      horizontal: number;
    };
    dropShadows: DropShadow[];
    stroke?: Stroke;
  };
  text: {
    fontSize: number;
    color: string;
  };
}

// Main Chain Offer export format
export interface ChainOfferExport {
  chainOfferId: string;
  frameSize: {
    width: number;
    height: number;
  };
  background: {
    exportUrl: string;
  };
  offers: Offer[];
  timer?: TimerComponent;
  header?: HeaderComponent;
  buttons: ButtonComponent[];
  exportedAt: string;
  metadata: {
    version: string;
    exportFormat?: string;
  };
}

// Application state management
export interface AppState {
  offerStates: Record<string, OfferState>;
  headerState: HeaderState;
  buttonStates: Record<string, ButtonState>;
  isAnimating: boolean;
}

// Extracted assets from ZIP
export interface ExtractedAssets {
  chainOfferData: ChainOfferExport;
  backgroundImage?: string;
  offerImages: {
    [offerKey: string]: {
      Locked?: string;
      Unlocked?: string;
      Claimed?: string;
    };
  };
  headerImages?: {
    active?: string;
    success?: string;
    fail?: string;
  };
  buttonIcons: {
    [offerKey: string]: Partial<Record<ButtonState, string>>;
  };
}
