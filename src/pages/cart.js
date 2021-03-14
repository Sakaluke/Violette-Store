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
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import { formatPrice } from "../utils/format"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"

import "../components/layout.css"
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from "@material-ui/core/styles"
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';


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
  // root: {
  //   padding: "10px 25px",
  //   backgroundColor: "#503d7f",

  //   color: "white",
  //   "&:hover": {
  //     backgroundColor: "#706196",
  //   },
    
  // },
  // "& > *": {
  //   // margin: theme.spacing(1),
  //   // backgroundColor: "#503d7f",
  //   // color: "#fff",
  // },
}))
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default () => {
  const { cart, addToCart } = useContext(CartContext)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const classes = useStyles()

  return (
    <div style={{textAlign:'center'}} >
      <Layout>
        <SEO title="Cart" />


<div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',  minWidth:'350px', width:'550px'}}>

        <h2 style={{margin:'2rem 0'}}>Cart</h2>
        {cart.map(product => (


          <Card style={{margin:'0.75rem 0',boxShadow: '0 0 1px #503d7f', display:'flex',  alignItems:'center', justifyContent:'center', border:'1px solid #F3F0FB' , backgroundColor:'#fbfbfd'}}>
          
          <CardActionArea disableRipple >
             <Img
              fluid={product.thumbnail.childImageSharp.fluid}
          
            />
            </CardActionArea>
              <CardContent className="card-content"> 

            <h3>{product.name}</h3>
            <h3>Price: {formatPrice(product.price_in_cent)}</h3>
            <div style={{ display:'flex', justifyContent:'center'}}>
             <h4>Quanity:</h4> 
              <IndeterminateCheckBoxIcon
              style={{cursor:'pointer', color:'rgb(74, 62, 100)', marginRight:'0.1rem'}}
                className="total"
                onClick={() => {
                  addToCart(product, -1)
                  forceUpdate()
                }}
              >
                
              </IndeterminateCheckBoxIcon >
           {product.qty}
           
           
              <AddBoxIcon
              style={{cursor:'pointer', color:'rgb(74, 62, 100)', marginLeft:'0.1rem'}}
                className="total"
                onClick={() => {
                  addToCart(product, 1)
                  forceUpdate()
                }}
              ></AddBoxIcon>{" "}
            </div>

         </CardContent>
        
    

        





          </Card>
        ))}
        <div>
          <h3>Subtotal: {formatPrice(cartSubtotal(cart))} </h3>
          {shouldPayShipping(cart) && (
            <h3>Shipping: {formatPrice(SHIPPING_RATE)} </h3>
          )}
          {!shouldPayShipping(cart) && <h3>Free Shipping </h3>}
          <h3>Total: {formatPrice(cartTotal(cart))}</h3>
        </div>

        <div style={{ marginBottom: "80px" }}>
          {cart && cart.length > 0 && (
            <Link style={{ textDecoration: "none" }} to="/checkout">
              {/* <button className="button-primary">Checkout</button> */}
              <Button className={classes.root}> Checkout </Button>
            </Link>
          )}
        </div>
        </div>
      </Layout>
    
    </div>
  )
}
