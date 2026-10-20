declare global {
  interface TCourierStats {
    distance: number;
    firstAt: number;
    lastAt: number;
    maxSpeed: number;
    points: number;
  }

  interface TCourier {
    heading: null | number;
    id: string;
    latitude: number;
    longitude: number;
    speed: null | number;
    stats?: null | TCourierStats;
    updatedAt?: number;
  }

  interface TCourierRecord extends TCourier {
    pointAt?: number;
  }

  interface TTrackPoint {
    at: number;
    latitude: number;
    longitude: number;
    speed: null | number;
  }

  interface TCourierTrack {
    date: string;
    id: string;
    points: TTrackPoint[];
    stats: null | TCourierStats;
  }
}

export {};
