import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const stripe = loadStripe(
  "pk_test_51HPIZwDhTLusS3ltivMvlMzppHZHoCXcTLraHhFkEwesMpZSL7G0au2JjIHXEtXfGCaxnOhZofZIDYMe3q1x6SWA0063cUwRq6"
)

const Checkout = () => {
  return (
    <div>
      <Elements stripe={stripe}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Checkout
