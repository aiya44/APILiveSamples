import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./Users.css";
import * as userService from "../../services/userService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../validationSchemas";
import swal from "sweetalert";

import logger from "../../logger";
const _logger = logger.extend("Register");

const Register = props => {
  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
    terms: false
  };

  const onCreateBtnClk = (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      isConfirmed: 0,
      status: 1,
      role: values.role
    };

    userService
      .add(userData)
      .then(onAddUserSuccess)
      .catch(onAddUserError)
      .then(() => actions.setSubmitting(false));
  };

  const onAddUserSuccess = response => {
    _logger("Adding user success: ", response);
    swal({
      title: "Register successful",
      text: "Please confirm your account",
      icon: "success",
      button: false,
      timer: 2500
    }).then(() => props.history.push("/login"));
  };

  const onAddUserError = error => {
    _logger("Adding user failed:", error);
    swal({
      title: "Register failed",
      text: `${error.response.data.errors[0]}`,
      icon: "error",
      button: false,
      timer: 2500
    });
  };

  const onLoginBtnClk = () => {
    props.history.push("/login");
  };

  _logger("Register.jsx rendering");
  return (
    <div className="block-center wd-xl mt-4">
      <div className="card mb-0">
        <div className="card-header bg-dark text-center">
          <img src="/img/logo.png" alt="Angle Logo" />
        </div>

        <div className="card-body">
          <p className="text-center py-2">SIGNUP TO GET INSTANT ACCESS.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={onCreateBtnClk}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting
            }) => (
              <Form className="mb-3" autoComplete="off">
                <div className="form-group">
                  <label htmlFor="signUpEmail" className="text-muted">
                    Email address
                  </label>
                  <div className="input-group with-focus">
                    <Field
                      type="email"
                      className={
                        "form-control border-right-0" +
                        (!errors.email && touched.email ? " is-valid" : "") +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                      id="signUpEmail"
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
                  <label htmlFor="signUpPassword" className="text-muted">
                    Password
                  </label>
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
                      id="signUpPassword"
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

                <div className="form-group">
                  <label htmlFor="signUpPasswordConfirm" className="text-muted">
                    Retype Password
                  </label>
                  <div className="input-group with-focus">
                    <Field
                      type="password"
                      className={
                        "form-control border-right-0" +
                        (!errors.passwordConfirm && touched.passwordConfirm
                          ? " is-valid"
                          : "") +
                        (errors.passwordConfirm && touched.passwordConfirm
                          ? " is-invalid"
                          : "")
                      }
                      id="signUpPasswordConfirm"
                      name="passwordConfirm"
                      placeholder="Retype Password"
                    />

                    <div className="input-group-append">
                      <span className="input-group-text text-muted bg-transparent border-left-0">
                        <i className="fas fa-lock" />
                      </span>
                    </div>

                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="form-group ml-0">
                  <div className="custom-control custom-radio pr-0">
                    <input
                      type="radio"
                      name="role"
                      id="organizationAdmin"
                      value="Organization Admin"
                      className={
                        "custom-control-input" +
                        (!errors.role &&
                        touched.role &&
                        values.role === "Organization Admin"
                          ? " is-valid"
                          : "") +
                        (errors.role && touched.role ? " is-invalid" : "")
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <label
                      className="custom-control-label"
                      htmlFor="organizationAdmin"
                    >
                      Organization
                    </label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="role"
                      id="volunteer"
                      value="Volunteer"
                      className={
                        "custom-control-input" +
                        (!errors.role &&
                        touched.role &&
                        values.role === "Volunteer"
                          ? " is-valid"
                          : "") +
                        (errors.role && touched.role ? " is-invalid" : "")
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <label className="custom-control-label" htmlFor="volunteer">
                      Volunteer
                    </label>

                    <ErrorMessage
                      name="role"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  {values.role !== "" && (
                    <div className="text-muted">
                      {values.role === "Organization Admin" ? (
                        <>
                          <p className="ml-4 mb-0">
                            What can you do as an <strong>Organization</strong>?
                          </p>

                          <ul>
                            <em>
                              <li>Ability to create and collaborate events</li>
                              <li>Manage organization members</li>
                            </em>
                          </ul>
                        </>
                      ) : (
                        <>
                          <p className="ml-4 mb-0">
                            What can you do as a <strong>Volunteer</strong>?
                          </p>

                          <ul>
                            <em>
                              <li>Participate in events</li>
                              <li>Collaborate with the community</li>
                              <li>Provide resources</li>
                            </em>
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="custom-control custom-checkbox">
                  <Field
                    type="checkbox"
                    className={
                      "custom-control-input" +
                      (!errors.terms && touched.terms ? " is-valid" : "") +
                      (errors.terms && touched.terms ? " is-invalid" : "")
                    }
                    value=""
                    id="signUpTerms"
                    name="terms"
                  />

                  <label className="custom-control-label" htmlFor="signUpTerms">
                    I agree with the <a href="/register">terms</a>
                  </label>

                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  disabled={isSubmitting}
                >
                  Create account
                </button>
              </Form>
            )}
          />

          <p className="text-center pt-3">Have an account?</p>

          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            onClick={onLoginBtnClk}
          >
            Login
          </button>
        </div>
      </div>

      <div className="text-center p-3">
        <span className="mr-2">©</span>
        <span>2019</span>
        <span className="mx-2">-</span>
        <span>Angle</span>
        <br />
        <span>Bootstrap Admin Template</span>
      </div>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }),
    push: PropTypes.func.isRequired
  })
};

export default React.memo(withRouter(Register));
