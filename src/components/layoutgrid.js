import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Pagination from '@material-ui/lab/Pagination';
import "./layout.css"

const useStyles = makeStyles(theme => ({
  root: {
    width: "80% !important",
    margin: "auto !important",
    fontFamily: "Cormorant Garamond !important",
    display: "flex !important",
    flexDirection: "column !important",
    minHeight: "100vh !important",
    flexGrow: 1,
  
    
  },
  pagination: {
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  margin:' 2rem 0',
  
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

  // const matches = useMediaQuery("(min-width:1201px)")

  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} value={url}  />
      <div
        // className={`${matches && classes.root}`}
        className={classes.root}
     
      >
        <Grid
         style={{ paddingTop: "2rem" }}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
        >
          {children}
        </Grid>
         {/* <Pagination className={classes.pagination} count={15}  variant="outlined" shape="rounded" /> */}
      </div>
    
     
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.goosefx.com">goosefx.com</a>
      </footer>
    </>
  )
}

LayoutGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutGrid
