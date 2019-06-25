import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./Users.css";
import * as userService from "../../services/userService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../validationSchemas";
import swal from "sweetalert";
import logger from "../../logger";
const _logger = logger.extend("Login");

const Login = props => {
  const initialValues = {
    email: "",
    password: ""
  };

  let user = {};

  const onSignInBtnClk = (values, actions) => {
    userService
      .signIn(values)
      .then(onSignInSuccess)
      .then(onGetCurrentUserSuccess)
      .then(onCheckProfileSuccess)
      .catch(onSignInError)
      .then(() => actions.setSubmitting(false));
  };

  const onSignInSuccess = response => {
    _logger("Login success: ", response);
    return userService.getCurrentUser();
  };

  const onGetCurrentUserSuccess = response => {
    _logger(response);
    user = response.item;
    swal({
      title: "Login successful",
      text: "Welcome",
      icon: "success",
      button: false,
      timer: 2500
    });
    return userService.checkProfileExist(response.item.id);
  };

  const onCheckProfileSuccess = response => {
    _logger(user);
    _logger(response);
    if (response.item) {
      props.history.push(selectedUserHome(user.roles), {
        type: "login",
        user: user
      });
    } else {
      // Other co-workers content below
      if (user.roles.includes("Organization Admin")) {
        swal({
          title: "Create Profile",
          text: "Please Create Your Organization",
          button: "Yes"
        });
        props.history.push("/admin/users/createOrganization", {
          type: "login",
          user: user
        });
      } else if (
        ["Organization Member", "Volunteer"].some(role =>
          user.roles.includes(role)
        )
      ) {
        swal({
          title: "Create Profile",
          text: "Let's create an awesome profile first!",
          button: "Yes"
        });
        props.history.push("/admin/users/createProfile", {
          type: "login",
          user: user
        });
      }
    }
  };

  const onSignInError = error => {
    _logger("Login failed:", error);
    const errMsg =
      error.response && error.response.data.errors
        ? error.response.data.errors[0]
        : "Please try again later.";
    swal({
      title: "Login failed",
      text: errMsg,
      icon: "error",
      button: false,
      timer: 2500
    });
  };

  const onRegisterBtnClk = () => {
    props.history.push("/register");
  };

  // Other co-workers content below
  const selectedUserHome = item => {
    if (
      ["Organization Admin", "Organization Member"].some(role =>
        item.includes(role)
      )
    ) {
      return "/admin/organization/";
    } else if (item.includes("Admin")) {
      return "/admin";
    } else if (item.includes("Volunteer")) {
      return "/admin/volunteer";
    }
  };

  _logger("Register.jsx rendering");
  return (
    <div className="block-center wd-xl mt-4">
      <div className="card mb-0">
        <div className="card-header bg-dark text-center">
          <img src="/img/logo.png" alt="Angle Logo" />
        </div>

        <div className="card-body">
          <p className="text-center py-2">SIGN IN TO CONTINUE.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSignInBtnClk}
            render={({ errors, touched, isSubmitting }) => (
              <Form className="mb-3" autoComplete="off">
                <div className="form-group">
                  <div className="input-group with-focus">
                    <Field
                      type="email"
                      className={
                        "form-control border-right-0" +
                        (!errors.email && touched.email ? " is-valid" : "") +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                      name="email"
                      placeholder="Enter email"
                    />

                    <div className="input-group-append">
                      <span className="input-group-text text-muted bg-transparent border-left-0">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group with-focus">
                    <Field
                      type="password"
                      className={
                        "form-control border-right-0" +
                        (!errors.password && touched.password
                          ? " is-valid"
                          : "") +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                      name="password"
                      placeholder="Password"
                    />

                    <div className="input-group-append">
                      <span className="input-group-text text-muted bg-transparent border-left-0">
                        <i className="fas fa-lock" />
                      </span>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="clearfix text-center">
                  <a className="text-muted" href="/recover">
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </Form>
            )}
          />
          <p className="text-center pt-3">Need to Signup?</p>
          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            onClick={onRegisterBtnClk}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }),
    push: PropTypes.func.isRequired
  })
};

export default React.memo(withRouter(Login));
