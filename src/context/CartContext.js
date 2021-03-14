import React, { createContext, useState } from "react"
import { getCart, saveCart } from "../utils/cart"
import { Link } from "gatsby"
export const CartContext = createContext(null)

export default ({ children }) => {
  const [cart, setCart] = useState(getCart())
  const [searchTerm, setSearchTerm] = useState('')

  const updateCart = updatedCart => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  // ------------------------- ADD TO CART -------------------------
  const addToCart = (product, qty = 1) => {
    const copy = [...cart]
    //If the product is already there
    const indexOfProduct = copy.findIndex(productInCart => {
      return productInCart.strapiId === product.strapiId
    })
    if (indexOfProduct !== -1) {
      //Update quantity
      copy[indexOfProduct].qty += parseInt(qty)

      if (copy[indexOfProduct].qty === 0) {
        //Remove product from cart
        copy.splice(indexOfProduct, 1)
      }
    } else {
      //Set quantity
      product.qty = parseInt(qty)
      copy.push(product)
    }

    updateCart(copy)
  }
  //-----------------------------------------------------------------
  //--------------------------CLEAR CART-----------------------------
  const clearCart = () => {
    const updatedCart = []
    updateCart(updateCart)
  }
  //-----------------------------------------------------------------
  

 
  // ------------------------- SEARCH AND FILTER GRID-------------------------
  const SearchEnter = (ev, searchInput) => {

    if(ev.key === 'Enter'){
ev.preventDefault()
setSearchTerm(ev.target.value)

  }

    if(ev.type === 'click'){
     
      
      setSearchTerm('')
      
     }




}
  //-----------------------------------------------------------------

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, searchTerm, setSearchTerm, SearchEnter }}>
      {children}
    </CartContext.Provider>
  )
}
