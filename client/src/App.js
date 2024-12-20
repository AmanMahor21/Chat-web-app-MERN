import "./App.css";
// import "/"
import { useContext, useEffect, useState } from "react";
import Login from "./pages/login/Login";
// import 'sweetalert2/src/sweetalert2.scss';
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/register/Register";
// import { toast } from "react-toastify";

import { authContext } from "./context/UserRegister";
import useStore from "../src/store/store";
import Skeleton from "./components/loader/Skeleton";
import Spinner from "./components/loader/Spinner";

function App() {
  const { saveUser, setSaveUser } = useContext(authContext);
  const { allUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  // const allUser = useStore((state) => state  .allUser);
  console.log(allUser);
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("userData"));
    if (loginUser) setSaveUser(loginUser);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [setSaveUser]);
  const isUserEmpty = !allUser || allUser.length === 0;

  return (
    <div className="appWrapper relative">
      {/* Show spinner if users are loading or not found */}
      {/* {isUserEmpty && <Spinner />} */}
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
