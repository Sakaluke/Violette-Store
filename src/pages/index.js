import React from "react"
import LayoutGrid from "../components/layoutgrid"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { formatPrice } from "../utils/format"
import { fromProductSlugToUrl } from "../utils/products"

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
  },
  media: {
    height: "auto",
  },
})

const IndexPage = ({ data }) => {
  const classes = useStyles()

  return (
    <LayoutGrid>
      <SEO title="Home" />

      {data.allStrapiProduct.nodes.map(product => (
        <Grid item xs={6} sm={4} md={3} lg={3} xl={3}>
          <Link
            style={{ textDecoration: "none", color: "#000000" }}
            to={fromProductSlugToUrl(product.slug)}
          >
            <CardActionArea className={classes.root}>
              <Img
                className={classes.media}
                fluid={product.thumbnail.childImageSharp.fluid}
              />
              <CardContent>
                <Typography noWrap>{product.name}</Typography>
                <Typography variant="h6">
                  {formatPrice(product.price_in_cent)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Grid>
      ))}
    </LayoutGrid>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        id
        description
        name
        price_in_cent
        created_at
        strapiId
        slug
        thumbnail {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
