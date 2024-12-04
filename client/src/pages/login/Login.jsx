// import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  loginValidation,
  useLoginData,
} from "../../validation/loginValidation";
// import { authContext } from "../../context/UserRegister";

const Login = () => {
  // const { setSaveUser } = useContext(authContext);
  const loginData = useLoginData();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      loginData(values);
    },
  });
  return (
    <>
      <div className="content">
        <div className="text">Login</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="validationError">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="validationError">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="forgot-pass">
            {/* <a href="#">Forgot Password?</a> */}
          </div>
          <button className="authBtn" type="sumbit">
            Login
          </button>
          <div className="sign-up">
            <div className="text-start">Not register ?</div>
            <Link to="/register" className="authBtn-link">
              <button className="authBtn">Register</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
