import React from "react"
import Header from "../components/header"
import "./layout.css"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <div>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>{children}</div>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.goosefx.com">GooseFx</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
