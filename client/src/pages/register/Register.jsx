import { Link } from "react-router-dom";
import {
  registerValidation,
  useSignup,
} from "../../validation/signupValidation";
import { useFormik } from "formik";

const Register = () => {
  const { loading, signupApi } = useSignup();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: registerValidation,
    onSubmit: async (values) => {
      // console.log(values);
      await signupApi(values);
      // localStorage.setItem("userData", values);
    },
  });

  return (
    <>
      <div className={`content ${loading ? "loadingBlur" : ""}`}>
        {loading ? <div>loading...</div> : ""}
        <div className="text">Register</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="UserName"
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="validationError">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="field">
            <input
              type="text"
              onBlur={formik.handleBlur}
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="validationError">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="d-flex ">
            <div className="form-check me-2   ">
              <input
                name="gender"
                className="form-check-input"
                type="radio"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value="Male"
                id="flexRadioDefault1"
                checked={formik.values.gender === "Male"}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Female"
                name="gender"
                id="flexRadioDefault2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.gender === "Female"}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Female
              </label>
            </div>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="validationError">{formik.errors.gender}</div>
          ) : null}
          <div className="forgot-pass">
            {/* <a href="#">Forgot Password?</a> */}
          </div>
          <button className="authBtn" type="submit">
            Sign in
          </button>
          <div className="sign-up">
            <div className="text-start">Already registered ?</div>
            <button className="authBtn">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
