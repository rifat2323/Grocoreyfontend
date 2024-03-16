import React,{useContext,useEffect,useRef} from 'react'
import styled from 'styled-components'
import { FlexChildrenComponent } from '../slice-component/component'
import '../styles/navbar.css'
import {NavLink} from 'react-router-dom'
import Icon from '@mdi/react';
import { mdiTextSearchVariant } from '@mdi/js';
import { mdiCartMinus } from '@mdi/js';
import { mdiAccountCircleOutline } from '@mdi/js';
import { DataProvider } from '../context/Context'
const Navbar = () => {
  const {alreadyCartError} = useContext(DataProvider)

   
  return (
    <div className="wrapperNavDiv">
    <FlexChildrenComponent className={"Navbar"} justifyContent={"space-around"} width={"100%"} height={"auto"} flexDirection={"row"}
    boxShadow={"0px -14px 50px -9px rgba(0,0,0,0.1)"} hoverBoxShadow={"0px -14px 50px -9px rgba(0,0,0,0.18)"} Bgcolor={""}
    
    
    >
      <NavLink 
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "navItems" : isActive ? "activeNav" : "navItem"
  }
>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
       /*  style={{ fill: 'rgba(0, 0, 0, 1)', transform: '', msFilter: '' }} */
      >
        <path d="M22 5c0-1.654-1.346-3-3-3H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.424c.618-.735 1-1.692 1-2.746V5zm-2 0v2.831c0 1.14-.849 2.112-1.891 2.167L18 10c-1.103 0-2-.897-2-2V4h3c.552 0 1 .449 1 1zM10 4h4v4c0 1.103-.897 2-2 2s-2-.897-2-2V4zM4 5c0-.551.448-1 1-1h3v4c0 1.103-.897 2-2 2l-.109-.003C4.849 9.943 4 8.971 4 7.831V5zm6 14v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.131c.254.067.517.111.787.125A3.988 3.988 0 0 0 9 10.643c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357a3.988 3.988 0 0 0 3.213 1.351c.271-.014.533-.058.787-.125V19h-3z" />
      </svg>
      <p>Shop</p>
      </NavLink>
      <NavLink   to="/explore"  className={({ isActive, isPending }) =>
    isPending ? "navItems" : isActive ? "activeNav" : "navItem"
  }>
      <Icon path={mdiTextSearchVariant} size={1} />
      <p>Explore</p>
      </NavLink>
      <NavLink  to="/cart" className={({ isActive, isPending }) =>
    isPending ? "navItems" : isActive ? "activeNav" : "cartIcons"
  } >
      <Icon path={mdiCartMinus} size={1} />
      <p>Cart</p>
      </NavLink>
      
      <NavLink  to="/account" className={({ isActive, isPending }) =>
    isPending ? "navItems" : isActive ? "activeNav" : "navItem"
  }>
      <Icon path={mdiAccountCircleOutline} size={1} />
      <p>Account</p>
      </NavLink>
      </FlexChildrenComponent>
      </div>
  )
}

export default Navbar