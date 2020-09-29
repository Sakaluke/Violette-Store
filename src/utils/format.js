/**
 *Formats an integer into a price with decimals with a £ sign
 * @params {string} - priceWithDecimals - Integer representation of price
 */
export const formatPrice = priceWithDecimal => {
  if (!priceWithDecimal) {
    return 0
  }
  const realPrice = parseInt(priceWithDecimal) / 100
  return realPrice.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  })
}
