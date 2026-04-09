/**
 * A promocode is effectively active when:
 * - isActive is true
 * - activatedAt is null (no schedule) OR activatedAt is in the past
 */
const isPromocodeActive = (promocode: TPromoCode): boolean => {
  if (!promocode.isActive) return false;
  if (!promocode.activatedAt) return true;

  return new Date() >= new Date(promocode.activatedAt);
};

export { isPromocodeActive };
