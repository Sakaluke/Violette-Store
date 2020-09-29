import React, { useState, useCallback, useContext } from "react"
import Checkout from "../components/Checkout"
import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../utils/cart"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { CartContext } from "../context/CartContext"
import { formatPrice } from "../utils/format"
import "../components/layout.css"

export default () => {
  const { cart, addToCart } = useContext(CartContext)
  //
  console.log("Cart.render cart ", cart)
  //
  const [showCheckout, setShowCheckout] = useState(false)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  return (
    <Layout>
      <SEO title="Cart" />
      <h2>Cart</h2>
      {cart.map(product => (
        <div>
          <Img
            fluid={product.thumbnail.childImageSharp.fluid}
            style={{ width: "200px" }}
          />
          <h3>Name: {product.name}</h3>
          <p>Price: {formatPrice(product.price_in_cent)}</p>
          <p>
            Quanity:{" "}
            <span
              className="total"
              onClick={() => {
                addToCart(product, -1)
                forceUpdate()
              }}
            >
              -
            </span>{" "}
            {product.qty}{" "}
            <span
              className="total"
              onClick={() => {
                addToCart(product, 1)
                forceUpdate()
              }}
            >
              +
            </span>{" "}
          </p>
        </div>
      ))}
      <div>
        <h3>Subtotal: {formatPrice(cartSubtotal(cart))} </h3>
        {shouldPayShipping(cart) && (
          <h3>Shipping: {formatPrice(SHIPPING_RATE)} </h3>
        )}
        {!shouldPayShipping(cart) && <h3>Free Shipping </h3>}
        <h3>Total: {formatPrice(cartTotal(cart))}</h3>
      </div>

      <div>
        {cart && cart.length > 0 && (
          <button
            onClick={() => setShowCheckout(true)}
            style={{ fontSize: "24px", padding: "12px 18px" }}
          >
            Checkout
          </button>
        )}
      </div>
      {showCheckout && <Checkout cart={cart} />}
    </Layout>
  )
}
