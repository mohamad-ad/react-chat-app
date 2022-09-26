import React from 'react'
import {Outlet,Navigate, useLocation} from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function NoAuthRoutes() {
    const {user} = useAuthContext();
    const location = useLocation();
  return (
    !user
        ? <Outlet/>
        : <Navigate to={'/'}/>
  )
}
