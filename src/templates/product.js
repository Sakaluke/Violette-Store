import React, { useState, useContext } from "react"
import Layout from "../components/layout"
import { formatPrice } from "../utils/format"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { CartContext } from "../context/CartContext"

const ProductTemplate = ({ data }) => {
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(CartContext)

  return (
    <Layout>
      <div>
        {console.log("ProductTemplate.render, data", data)}
        <Img
          fluid={data.strapiProduct.thumbnail.childImageSharp.fluid}
          style={{ width: "640px" }}
        />
        <div>
          <h1>{data.strapiProduct.name}</h1>
          <p>{data.strapiProduct.description}</p>
          <p>Price: {formatPrice(data.strapiProduct.price_in_cent)}</p>
          <input
            type="number"
            value={qty}
            onChange={event => {
              setQty(event.target.value)
            }}
          />
          <button
            onClick={() => addToCart(data.strapiProduct, qty)}
            style={{ fontSize: "20px", padding: "16px", borderRadius: "4px" }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default ProductTemplate

export const singleProductQuery = graphql`
  query ProductTemplateQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      name
      price_in_cent
      description
      thumbnail {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
