import React from 'react'
import {Outlet} from 'react-router-dom';
import Appbar from './Appbar';

export default function Layout() {
  return (
    <>
        <Appbar/>
        <Outlet/>
        
    </>
  )
}
