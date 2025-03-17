import { Feature, FeatureCollection } from 'geojson';
import { LatLng } from 'leaflet';
import { GeoJSON as ReactGeoJSON } from 'react-leaflet';

export interface MapProps {
  center: [number, number];
  zoom: number;
}

export interface GameState {
  currentNeighborhood: string;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  gameStarted: boolean;
  isCountingDown: boolean;
  clickedPosition: LatLng | null;
  lastClickTime: number;
  feedbackMessage: string;
  revealedNeighborhoods: Set<string>;
  wrongNeighborhood: string;
  arrowPath: [LatLng, LatLng] | null;
  isMuted: boolean;
  volume: number;
  showFeedback: boolean;
  clickTime: number;
  feedbackOpacity: number;
  feedbackProgress: number;
}

export interface ScoreCalculation {
  total: number;
  distancePoints: number;
  timePoints: number;
}

export interface AudioControlsProps {
  isMuted: boolean;
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

export interface GameControlsProps {
  gameStarted: boolean;
  currentNeighborhood: string;
  timeLeft: number;
  score: number;
  onStartGame: () => void;
  getProgressBarColor: (timeLeft: number) => string;
}

export interface FeedbackPanelProps {
  showFeedback: boolean;
  clickedPosition: LatLng | null;
  arrowPath: [LatLng, LatLng] | null;
  clickTime: number;
  feedbackProgress: number;
  onNextRound: () => void;
  calculateDistance: (point1: LatLng, point2: LatLng) => number;
  calculateScore: (distance: number, timeLeft: number) => ScoreCalculation;
  getProgressBarColor: (timeLeft: number) => string;
}

export interface MapEventsProps {
  onClick: (latlng: LatLng) => void;
}

export interface GeoJSONLayerProps {
  geoJsonData: FeatureCollection;
  revealedNeighborhoods: Set<string>;
  currentNeighborhood: string;
  onMapClick: (latlng: LatLng) => void;
  geoJsonRef: React.RefObject<typeof ReactGeoJSON>;
} 