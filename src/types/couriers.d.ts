declare global {
  interface TCourier {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    online: boolean;
  }
}

export {};
