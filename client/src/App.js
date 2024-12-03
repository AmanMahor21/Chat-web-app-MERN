import "./App.css";
// import "/"
import { useContext, useEffect } from "react";
import Login from "./pages/login/Login";
// import 'sweetalert2/src/sweetalert2.scss';
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/register/Register";
// import { toast } from "react-toastify";

import { authContext } from "./context/UserRegister";

function App() {
  const { saveUser, setSaveUser } = useContext(authContext);
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("userData"));
    if (loginUser) setSaveUser(loginUser);
  }, [setSaveUser]);


  return (
    <div className="appWrapper">
      <Routes>
        <Route
          path="/"
          element={saveUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={saveUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={saveUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
