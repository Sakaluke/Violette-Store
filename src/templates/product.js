import React, { useState, useContext, useEffect } from "react"
import Layout from "../components/layout"
import { formatPrice } from "../utils/format"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { CartContext } from "../context/CartContext"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Carousel from "../components/Carousel"




const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 25px",
    backgroundColor: "#503d7f",
    // fontFamily: "Catamaran",
    color: "white",
    "&:hover": {
      backgroundColor: "#706196",
    },
  },
  // "& > *": {
  //   // margin: theme.spacing(1),
  //   // backgroundColor: "#503d7f",
  //   // color: "#fff",
  // },
}))

const ProductTemplate = ({ data }) => {
  const [qty, setQty] = useState(1)
  const { addToCart } = useContext(CartContext)
  const classes = useStyles()

  /////////////////////////////////

  useEffect(() => {
    fetch(
      `https://violette-store-backend.herokuapp.com/products/${data.strapiProduct.strapiId}`
    ).then(response =>
      response.json().then(json => console.log("jsossssoooooooon ", json))
    )
  })

  /////////////////////////////

  return (
    <Layout>
     
      <Grid container className="layout">
        <Grid item md={1} lg={1} xl={1}></Grid>
         <Grid item container xs={12} md={12} lg={10} xl={10} className="grid-wrapper-container" style={{marginTop:'4rem'}}>
          <Grid item  xs={12} md={10} lg={6} xl={6} className="grid-image-item"><Img fluid={data.strapiProduct.thumbnail.childImageSharp.fluid} /></Grid>
          <Grid item xs={12} md={10} lg={6} xl={6} className="grid-text-item"><div className="product-details-container">
          <h1 className="product-details-title">
            {data.strapiProduct.name.toUpperCase()}
          </h1>

          <p className="product-details-description">
            {data.strapiProduct.description}
          </p>

          <p className="product-details-price">
            Price: {formatPrice(data.strapiProduct.price_in_cent)}
          </p>

          <input
            style={{ width: "60px", height: "40px", marginRight: "3px" }}
            type="number"
            value={qty}
            onChange={event => {
              setQty(event.target.value)
            }}
          />


          <Button
            className={classes.root}
            onClick={() => addToCart(data.strapiProduct, qty)}
            variant="contained"
          >
            Add To Cart
          </Button>
        </div></Grid>


         </Grid>
         <Grid item md={1} lg={1} xl={1}></Grid>
      </Grid>
      
     
    </Layout>
  )
}

export default ProductTemplate

// export const singleProductQuery = graphql`
//   query ProductTemplateQuery($id: String!) {
//     strapiProduct(id: { eq: $id }) {
//       strapiId
//       name
//       price_in_cent
//       description
//       thumbnail {
//         childImageSharp {
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   }
// `

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
