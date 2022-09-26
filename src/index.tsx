import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContextProvider } from "./contexts/UsersContext";
import { ChatsContextProvider } from "./contexts/ChatsContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UsersContextProvider>
          <ChatsContextProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
            </ChatsContextProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
