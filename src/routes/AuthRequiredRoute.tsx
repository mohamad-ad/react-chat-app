import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import {Outlet,Navigate, useLocation} from 'react-router-dom';

export default function AuthRequiredRoute() {
    const location = useLocation();
    console.log(location)
    const {user} = useAuthContext();
    return (
      user
          ? <Outlet/>
          : <Navigate to='/register' state={{from:location}} />
    )
}
