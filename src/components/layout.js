import React from "react"
import Header from "../components/header"

import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery2 {
    site {
      siteMetadata {
        title
      }
    }
    sitePage {
      path
    }
  }
  `)





  return (
    <div className="layout">


      
      <Header siteTitle={data.site.siteMetadata.title}/>

 
      
        <main >{children}</main>
     



      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.goosefx.com">goosefx.com</a>
      </footer>



    </div>
  )
}

export default Layout
