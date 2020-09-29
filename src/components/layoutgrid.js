import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "auto",

    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    flexGrow: 1,
  },
}))

const LayoutGrid = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const matches = useMediaQuery("(min-width:1201px)")

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        className={`${matches && classes.root}`}
        style={{ paddingTop: "20px" }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          {children}
        </Grid>
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.goosefx.com">GooseFx</a>
      </footer>
    </>
  )
}

LayoutGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutGrid
