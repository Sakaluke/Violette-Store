import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import LocalMallSharpIcon from "@material-ui/icons/LocalMallSharp"
import logo from "../images/logo.png"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import "../components/layout.css"
// import { Link } from "gatsby"



const useStyles = makeStyles((theme) => ({
  root: {
   
    margin:'0 auto !important',
    width:'100% !important',

    boxShadow: "0px 0px 1px #503d7f !important"
    },


 searchPlusCard:{
   display:'flex',
   alignItems:'center',
   
 },

  search: {
    position: 'relative !important',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    color:'rgb(80, 61, 127) !important',
    backgroundColor:'#fff',
    border:'1px solid rgb(80, 61, 127)',
    marginRight:'1rem',
    width: '100% !important',
   
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto !important',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100% !important',
    position: 'absolute !important',
    pointerEvents: 'none !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  // inputRoot: {
  //   color: 'inherit',
   
  //  position:'relative'
    
  // },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
   transition: theme.transitions.create('width'),

  
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
       
      },
    },
  },
  cancelIcon:{
    verticalAlign:'middle',
    marginRight:'0.2rem',
    '&:hover': {
      color: '#685c87',
      
    },
  }
}));





//------------------------------------------------------------------------------------------------------------------

const Header = (props) => {
  const classes = useStyles();
  const { cart, SearchEnter, searchTerm, setSearchTerm } = useContext(CartContext)
  const [searchInput, setSearchInput] = useState('')
 
  // const { onChange } = useContext(SearchContext)
 
  //
  // console.log("Header.render cart", cart)
  //
 
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
console.log('props in header is:', props)
    
  // });

  return (
    <div className={classes.root}>
  
    <AppBar style={{backgroundColor:'#fbfbfd', position:'static', height:'5.5rem'}}>
      <Toolbar style={{ width:'80%',
      height:'5.5rem',
   displat:'flex',
   justifyContent:'space-between',

   margin:'0 auto',}}>
        <div >
          <Link
            to="/"
            // style={{
            //   color: `white`,
            //   textDecoration: `none`,
            // }}
          >
            <img src={logo} alt="Logo" className="logo" 
            
            onClick={(ev) => SearchEnter(ev)}
            
            
            />
            {/* {siteTitle} */}
          </Link>
        </div>

      <div className={classes.searchPlusCard}>

        {props.value  &&  <div className={classes.search}>


          
            
          <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
               
              }}
              // inputProps={{ 'aria-label': 'search'}}
           onKeyPress={(ev) => SearchEnter(ev, searchInput)}
            onChange={(ev) => setSearchInput(ev.target.value)}
      
               value={searchInput}
            />
             {searchInput && <CancelIcon className={classes.cancelIcon}  onClick={() => setSearchInput('') } />}
      </div> }
        





        {cart && cart.length > 0 && (
          <Link to="/cart">
            <div className="cart-wrapper">
              <LocalMallSharpIcon
                style={{
                  // color: "#463b5e",
                  color: "#4a3e64",
                  fontSize: "48px",
                }}
              />
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "white",
                  border: "1px solid #503d7f",
                  borderRadius: "20px",
                  fontSize: "0.5px",
                  fontWeight: "600",
                  // verticalAlign: "middle",
                  display: "inline-block",
                  color: "#503d7f",
                  
                  position: "absolute",
                  textAlign: "center",
                  right: "0px",
                  top: "30px",
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
  
</Toolbar>
</AppBar>

</div>

     
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header





