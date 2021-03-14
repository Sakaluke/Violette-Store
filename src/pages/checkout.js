import React, { useContext } from "react"
import Checkout from "../components/Checkout"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartContext } from "../context/CartContext"

import "../components/layout.css"

export default () => {
  const { cart } = useContext(CartContext)
  return (
    <Layout>
      <SEO title="Home" />
      <Checkout cart={cart} />
      <p>Checkout PAGE</p>
    </Layout>
  )
}
