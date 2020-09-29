export const TAX_RATE = process.env.TAX_RATE || 0.2
export const FREE_SHIPPING_THRESHOLD =
  process.env.FREE_SHIPPING_THRESHOLD || 10000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 500

export const saveCart = cart => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"))
    return cart ? cart : []
  } catch (err) {
    return []
  }
}

export const cartSubtotal = cart => {
  //Sum all
  const subTotal = cart.reduce((counter, product) => {
    return counter + product.price_in_cent * product.qty
  }, 0)
  return subTotal
}

export const shouldPayShipping = cart => {
  const subTotal = cartSubtotal(cart)
  if (subTotal < FREE_SHIPPING_THRESHOLD) {
    return true
  }
}

export const cartTotal = cart => {
  if (cart.lenght === 0) {
    return 0
  }
  const subTotal = cartSubtotal(cart)
  const shipping = shouldPayShipping ? SHIPPING_RATE : 0
  const total = subTotal + subTotal * TAX_RATE + shipping

  return Math.round(total)
}
