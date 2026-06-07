const rgba = (color: string, alpha: number): string => {
  if (color.startsWith("var(")) {
    return `color-mix(in srgb, ${color} ${alpha * 100}%, transparent)`;
  }

  const normalized =
    color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;

  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export { rgba };
