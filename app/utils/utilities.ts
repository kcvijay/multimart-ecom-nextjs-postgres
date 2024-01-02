export function findOriginalPrice(
  discountedPrice: number,
  discountPercentage: number
) {
  return Math.round(discountedPrice / (1 - discountPercentage / 100));
}
