/**
 * Given a product slug, return the relative path to a single product
 */

export const fromProductSlugToUrl = slug => {
  return `/products/${slug}`
}
