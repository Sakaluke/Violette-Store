import React, {useContext} from "react"
import LayoutGrid from "../components/layoutgrid"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { formatPrice } from "../utils/format"
import { fromProductSlugToUrl } from "../utils/products"
import { CartContext } from "../context/CartContext"






const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "auto",
    // focusRippleColor:'#503d7f' ,
    // touchRippleColor:'#503d7f',
    '& .MuiTouchRipple-child': {
      backgroundColor: '#a195c2',
      color:'red'
  },
  '& .MuiCardActionArea-focusHighlight': {
    backgroundColor: '#503d7f',
    
}
  
  },
  media: {
    height: "auto",
  },


}));
//------------------------------------------------------------------------------------------------------------------
const IndexPage = ({ data }) => {
  const { searchTerm } = useContext(CartContext)
  const classes = useStyles()
  



 


  return (
    <LayoutGrid className={classes.root}>
      <SEO title="Violette Store" />


      {data.allStrapiProduct.nodes.filter((product) => {
        if(searchTerm == '') {
          return product
        }else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())){
          return product 
        }
      } ).map(product => (
        <Grid item xs={6} sm={4} md={3} lg={3} xl={3} >

         {/* Product Cart each mapped in Grid */}
          <Link
            style={{ textDecoration: "none", color: "#000000"}}
            to={fromProductSlugToUrl(product.slug)}
            
          >
         
            <CardActionArea className={classes.root}    >
              <Img
                className={classes.media}
                fluid={product.thumbnail.childImageSharp.fluid}
              />
              <CardContent >
                <Typography style={{textAlign:'center'}} noWrap>{product.name}</Typography>
                <Typography style={{textAlign:'center'}}  variant="h6">
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

// export const pageQuery = graphql`
//   query MyQuery {
//     allStrapiProduct {
//       nodes {
//         id
//         description
//         name
//         price_in_cent
//         created_at
//         strapiId
//         slug
//         thumbnail {
//           childImageSharp {
//             fluid {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `

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
