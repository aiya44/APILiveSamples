import React from "react";
import PropTypes from "prop-types";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import { eventFilesStepValidationSchema } from "../../../../../validationSchemas";

const FilesStep = props => {
  const tempId = 9999;

  const initialValues = {
    adDocs: [],
    images: []
  };

  const onNextClk = (values, actions) => {
    if (props.isFinalSubmitReady) {
      props.goToStep(7);
    } else {
      let images = [...values.images];
      if (images.length > 0) images[0].entityTypeId = 12;

      props.updateValues({ ...values, images });
      props.nextStep();
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventFilesStepValidationSchema}
      onSubmit={onNextClk}
      render={({ values, errors, touched, isSubmitting }) => (
        <div className="card border-info">
          <Form autoComplete="off">
            <div className="card-body">
              <FieldArray
                name="adDocs"
                render={arrayHelpers => (
                  <>
                    <div className="row">
                      <div className="col">
                        <hr />
                      </div>
                      <div
                        className="col-auto text-primary"
                        style={{ marginBottom: "15px" }}
                      >
                        Advertisment Documents
                      </div>
                      <div className="col">
                        <hr />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-sm-8 offset-sm-2">
                        {/* <h4 className="text-center">Advertisement Documents</h4> */}
                      </div>

                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-outline-success float-right"
                          onClick={() =>
                            arrayHelpers.push({
                              eventId: tempId,
                              name: "",
                              documentUrl: ""
                            })
                          }
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                    </div>

                    {values.adDocs &&
                      values.adDocs.length > 0 &&
                      values.adDocs.map((adDoc, index) => (
                        <div key={index}>
                          <hr />

                          <div className="form-group row">
                            <label
                              htmlFor={`adDocs.${index}.name`}
                              className="col-sm-2 col-form-label pr-0 text-muted text-left"
                            >
                              Name
                            </label>

                            <div className="col-sm-10">
                              <Field
                                type="text"
                                className={
                                  "form-control" +
                                  (((errors.adDocs &&
                                    errors.adDocs[index] &&
                                    !errors.adDocs[index].name) ||
                                    true) &&
                                  touched.adDocs &&
                                  touched.adDocs[index] &&
                                  touched.adDocs[index].name
                                    ? " is-valid"
                                    : "") +
                                  (errors.adDocs &&
                                  errors.adDocs[index] &&
                                  errors.adDocs[index].name &&
                                  touched.adDocs &&
                                  touched.adDocs[index] &&
                                  touched.adDocs[index].name
                                    ? " is-invalid"
                                    : "")
                                }
                                name={`adDocs.${index}.name`}
                                placeholder="Name"
                              />

                              <ErrorMessage
                                name={`adDocs.${index}.name`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor={`adDocs.${index}.documentUrl`}
                              className="col-sm-2 col-form-label pr-0 text-muted text-left"
                            >
                              Doc Url
                            </label>

                            <div className="col-sm-10">
                              <Field
                                type="text"
                                className={
                                  "form-control" +
                                  (((errors.adDocs &&
                                    errors.adDocs[index] &&
                                    !errors.adDocs[index].documentUrl) ||
                                    true) &&
                                  touched.adDocs &&
                                  touched.adDocs[index] &&
                                  touched.adDocs[index].documentUrl
                                    ? " is-valid"
                                    : "") +
                                  (errors.adDocs &&
                                  errors.adDocs[index] &&
                                  errors.adDocs[index].documentUrl &&
                                  touched.adDocs &&
                                  touched.adDocs[index] &&
                                  touched.adDocs[index].documentUrl
                                    ? " is-invalid"
                                    : "")
                                }
                                name={`adDocs.${index}.documentUrl`}
                                placeholder="Document Url"
                              />

                              <ErrorMessage
                                name={`adDocs.${index}.documentUrl`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-outline-warning float-right"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              />

              {/* <hr /> */}

              <FieldArray
                name="images"
                render={arrayHelpers => (
                  <>
                    <div className="row">
                      <div className="col">
                        <hr />
                      </div>
                      <div
                        className="col-auto text-primary"
                        style={{ marginBottom: "15px" }}
                      >
                        Images
                      </div>
                      <div className="col">
                        <hr />
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-sm-8 offset-sm-2">
                        {/* <h4 className="text-center">Images</h4> */}
                      </div>

                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-outline-success float-right"
                          onClick={() =>
                            arrayHelpers.push({
                              entityId: tempId,
                              entityTypeId: 7,
                              title: "",
                              description: "",
                              url: ""
                            })
                          }
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                    </div>

                    {typeof errors.images === "string" && (
                      <div className="text-center" style={{ color: "#f05050" }}>
                        {errors.images}
                      </div>
                    )}

                    {values.images &&
                      values.images.length > 0 &&
                      values.images.map((image, index) => (
                        <div key={index}>
                          <hr />

                          <div className="form-group row">
                            <label
                              htmlFor={`images.${index}.title`}
                              className="col-sm-2 col-form-label pr-0 text-muted text-left"
                            >
                              Title
                            </label>

                            <div className="col-sm-10">
                              <Field
                                type="text"
                                className={
                                  "form-control" +
                                  (((errors.images &&
                                    errors.images[index] &&
                                    !errors.images[index].title) ||
                                    true) &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].title
                                    ? " is-valid"
                                    : "") +
                                  (errors.images &&
                                  errors.images[index] &&
                                  errors.images[index].title &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].title
                                    ? " is-invalid"
                                    : "")
                                }
                                name={`images.${index}.title`}
                                placeholder="Name"
                              />

                              <ErrorMessage
                                name={`images.${index}.title`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor={`images.${index}.description`}
                              className="col-sm-2 col-form-label pr-0 text-muted text-left"
                            >
                              Description
                            </label>

                            <div className="col-sm-10">
                              <Field
                                type="text"
                                className={
                                  "form-control" +
                                  (((errors.images &&
                                    errors.images[index] &&
                                    !errors.images[index].description) ||
                                    true) &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].description
                                    ? " is-valid"
                                    : "") +
                                  (errors.images &&
                                  errors.images[index] &&
                                  errors.images[index].description &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].description
                                    ? " is-invalid"
                                    : "")
                                }
                                name={`images.${index}.description`}
                                placeholder="Name"
                              />

                              <ErrorMessage
                                name={`images.${index}.description`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor={`images.${index}.url`}
                              className="col-sm-2 col-form-label pr-0 text-muted text-left"
                            >
                              Url
                            </label>

                            <div className="col-sm-10">
                              <Field
                                type="text"
                                className={
                                  "form-control" +
                                  (((errors.images &&
                                    errors.images[index] &&
                                    !errors.images[index].url) ||
                                    true) &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].url
                                    ? " is-valid"
                                    : "") +
                                  (errors.images &&
                                  errors.images[index] &&
                                  errors.images[index].url &&
                                  touched.images &&
                                  touched.images[index] &&
                                  touched.images[index].url
                                    ? " is-invalid"
                                    : "")
                                }
                                name={`images.${index}.url`}
                                placeholder="Document Url"
                              />

                              <ErrorMessage
                                name={`images.${index}.url`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-outline-warning float-right"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              />

              <hr />

              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary float-left"
                    disabled={isSubmitting}
                    onClick={props.previousStep}
                  >
                    Prev
                  </button>

                  <button
                    type="submit"
                    className={
                      "btn float-right" +
                      (props.isFinalSubmitReady
                        ? " btn-warning"
                        : " btn-primary")
                    }
                    disabled={isSubmitting}
                  >
                    {props.isFinalSubmitReady ? "Back to Review" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    />
  );
};

FilesStep.propTypes = {
  isActive: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  firstStep: PropTypes.func.isRequired,
  lastStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,

  updateValues: PropTypes.func.isRequired,
  isFinalSubmitReady: PropTypes.bool.isRequired
};

export default React.memo(FilesStep);
