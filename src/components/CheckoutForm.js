import React, { useEffect, useState, useContext } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { CartContext } from "../context/CartContext"
import { formatPrice } from "../utils/format"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

import { API_URL } from "../utils/url"

const generateInput = (label, value, setOnChange) => {
  return (
    <>
      <div>
        <label htmlFor={label}>{label}</label>
      </div>

      <input
        id={label}
        value={value}
        onChange={event => setOnChange(event.target.value)}
      />
    </>
  )
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { cart, clearCart } = useContext(CartContext)

  const [shipping_name, setShipping_name] = useState("")
  const [shipping_address, setShipping_address] = useState("")
  const [shipping_country, setShipping_country] = useState("")
  const [shipping_postcode, setShipping_postcode] = useState("")

  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")

  const [success, setSuccess] = useState(null)

  const valid = () => {
    if (
      !shipping_name ||
      !shipping_address ||
      !shipping_country ||
      !shipping_postcode
    ) {
      return false
    }
    return true
  }

  const handleSubmit = async event => {
    event.preventDefault()
    console.log("handleSubmit", event)
    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    const data = {
      paymentIntent: result.paymentIntent,
      shipping_name,
      shipping_address,
      shipping_country,
      shipping_postcode,
      cart,
    }
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const order = await response.json()

    setSuccess(true)
    clearCart()
  }

  useEffect(() => {
    const loadToken = async () => {
      const response = await fetch(`${API_URL}/orders/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map(product => ({
            ...product,
            ...{ id: product.strapiId },
          })),
        }),
      })

      const data = await response.json()
      console.log("loadToken data ", data)
      setToken(data.client_secret)
      setTotal(data.amount)
    }
    loadToken()
  }, [cart])

  if (token) {
    return (
      <div>
        <h3>Total: {formatPrice(total)}</h3>
        <form
          style={{
            padding: "24px 0",
            border: "1px solid #eee",
            margin: "20px 0",
          }}
          onSubmit={handleSubmit}
        >
          {generateInput("Shipping Recipient", shipping_name, setShipping_name)}
          {generateInput(
            "Shipping Address",
            shipping_address,
            setShipping_address
          )}
          {generateInput(
            "Shipping Country",
            shipping_country,
            setShipping_country
          )}
          {generateInput(
            "Shipping Postcode",
            shipping_postcode,
            setShipping_postcode
          )}
          <CardElement hidePostalCode={true} />
          {/* <button disabled={!stripe || !valid()}>Pay</button> */}
          <Button
            disabled={!stripe || !valid()}
            // className={classes.root}

            variant="contained"
          >
            PAY
          </Button>
        </form>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default CheckoutForm
