import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Chat from "./pages/Chat";
import CompleteUserInformatio from './pages/CompleteUserInformatio';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import AuthRequiredRoute from "./routes/AuthRequiredRoute";
import NoAuthRoutes from "./routes/NoAuthRoutes";
import './app.css'
import Contacts from './pages/Contacts';
import { useUsersContext } from './contexts/UsersContext';
import UpdateUserInformation from './pages/UpdateUserInformation';



function App() {
  console.log("api key",process.env.REACT_APP_FIREBASE_API_KEY)
  const {selectedUser} = useUsersContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<AuthRequiredRoute />}>
          <Route path='' element={selectedUser?<Chat/>:<Contacts/>}/>
          <Route path='update' element={<UpdateUserInformation/>}/>

        </Route>
        <Route element={<NoAuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path='/complete' element={<CompleteUserInformatio/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
export default App;

