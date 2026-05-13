const bbox = (coordinates: [number, number][]): [number, number][] => {
  let minLatitude = Infinity;
  let minLongitude = Infinity;
  let maxLatitude = -Infinity;
  let maxLongitude = -Infinity;

  coordinates.forEach((coordinate: [number, number]) => {
    minLongitude = Math.min(coordinate[0], minLongitude);
    maxLongitude = Math.max(coordinate[0], maxLongitude);
    minLatitude = Math.min(coordinate[1], minLatitude);
    maxLatitude = Math.max(coordinate[1], maxLatitude);
  });

  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude],
  ];
};

export { bbox };
