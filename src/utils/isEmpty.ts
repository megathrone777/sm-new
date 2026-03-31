const isEmpty = (value: unknown | unknown[]): boolean => {
  if (Array.isArray(value)) {
    return value.every((item) => item == null);
  }

  return value == null;
};

export { isEmpty };
