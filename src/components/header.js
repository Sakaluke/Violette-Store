import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { CartContext } from "../context/CartContext"
import LocalMallIcon from "@material-ui/icons/LocalMall"

const Header = ({ siteTitle }) => {
  const { cart } = useContext(CartContext)
  //
  console.log("Header.render cart", cart)
  //

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
        width: "100%",
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "80%",
          padding: `1.45rem 1.0875rem`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {cart && cart.length > 0 && (
          <Link to="/cart">
            <div>
              <LocalMallIcon color="secondary" fontSize="large" />
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  display: "inline-block",
                }}
              >
                {cart.reduce((counter, product) => {
                  return counter + product.qty
                }, 0)}
              </span>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
