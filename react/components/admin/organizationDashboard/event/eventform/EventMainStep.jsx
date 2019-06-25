import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { eventMainStepValidationSchema } from "../../../../../validationSchemas";

const EventMainStep = props => {
  const initialValues = {
    name: "",
    headline: "",
    summary: "",
    description: "",
    eventTypeId: "",
    dateStart: "",
    dateEnd: "",
    setupTime: ""
  };

  const onNextClk = (values, actions) => {
    if (props.isFinalSubmitReady) {
      props.goToStep(7);
    } else {
      props.updateValues({
        ...values,
        eventTypeId: parseInt(values.eventTypeId)
      });
      props.nextStep();
    }
    actions.setSubmitting(false);
  };

  let dropdownEventTypes = props.eventTypes.map(eventType => {
    return (
      <option key={eventType.id} className="text-muted" value={eventType.id}>
        {eventType.name}
      </option>
    );
  });
  dropdownEventTypes.unshift(
    <option key="" className="text-muted" value="">
      Choose...
    </option>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventMainStepValidationSchema}
      onSubmit={onNextClk}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting
      }) => (
        <div className="card border-info">
          <Form autoComplete="off">
            <div className="card-body">
              <div className="form-group row">
                <label
                  htmlFor="eventName"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Name
                </label>

                <div className="col-sm-10">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (!errors.name && touched.name ? " is-valid" : "") +
                      (errors.name && touched.name ? " is-invalid" : "")
                    }
                    name="name"
                    id="eventName"
                    placeholder="Name"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventHeadline"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Headline
                </label>

                <div className="col-sm-10">
                  <Field
                    type="text"
                    className={
                      "form-control" +
                      (!errors.headline && touched.headline
                        ? " is-valid"
                        : "") +
                      (errors.headline && touched.headline ? " is-invalid" : "")
                    }
                    name="headline"
                    id="eventHeadline"
                    placeholder="Headline (optional)"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventSummary"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Summary
                </label>

                <div className="col-sm-10">
                  <textarea
                    className={
                      "form-control no-resize" +
                      (!errors.summary && touched.summary ? " is-valid" : "") +
                      (errors.summary && touched.summary ? " is-invalid" : "")
                    }
                    name="summary"
                    id="eventSummary"
                    rows="2"
                    placeholder="Summary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <ErrorMessage
                    name="summary"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventDescription"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Description
                </label>

                <div className="col-sm-10">
                  <textarea
                    className={
                      "form-control no-resize" +
                      (!errors.description && touched.description
                        ? " is-valid"
                        : "") +
                      (errors.description && touched.description
                        ? " is-invalid"
                        : "")
                    }
                    name="description"
                    id="eventDescription"
                    rows="5"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventTypeId"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Type
                </label>

                <div className="col-sm-10">
                  <Field
                    className={
                      "custom-select formControlFontSize" +
                      (!values.eventTypeId ? " text-muted" : "") +
                      (!errors.eventTypeId && touched.eventTypeId
                        ? " is-valid"
                        : "") +
                      (errors.eventTypeId && touched.eventTypeId
                        ? " is-invalid"
                        : "")
                    }
                    component="select"
                    name="eventTypeId"
                    id="eventTypeId"
                  >
                    {dropdownEventTypes}
                  </Field>

                  <ErrorMessage
                    name="eventTypeId"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventDateStart"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Start Date
                </label>

                <div className="col-sm-10">
                  <Field
                    type="datetime-local"
                    className={
                      "form-control pr-2" +
                      (!values.dateStart ? " text-muted" : "") +
                      (!errors.dateStart && touched.dateStart
                        ? " is-valid"
                        : "") +
                      (errors.dateStart && touched.dateStart
                        ? " is-invalid"
                        : "")
                    }
                    name="dateStart"
                    id="eventDateStart"
                  />

                  <ErrorMessage
                    name="dateStart"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventDateEnd"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  End Date
                </label>

                <div className="col-sm-10">
                  <Field
                    type="datetime-local"
                    className={
                      "form-control pr-2" +
                      (!values.dateEnd ? " text-muted" : "") +
                      (!errors.dateEnd && touched.dateEnd ? " is-valid" : "") +
                      (errors.dateEnd && touched.dateEnd ? " is-invalid" : "")
                    }
                    name="dateEnd"
                    id="eventDateEnd"
                  />

                  <ErrorMessage
                    name="dateEnd"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="eventSetupTime"
                  className="col-sm-2 col-form-label pr-0 text-muted text-left"
                >
                  Setup Time
                </label>

                <div className="col-sm-10">
                  <Field
                    type="datetime-local"
                    className={
                      "form-control pr-2" +
                      (!values.setupTime ? " text-muted" : "") +
                      (!errors.setupTime && touched.setupTime
                        ? " is-valid"
                        : "") +
                      (errors.setupTime && touched.setupTime
                        ? " is-invalid"
                        : "")
                    }
                    name="setupTime"
                    id="eventSetupTime"
                  />

                  <ErrorMessage
                    name="setupTime"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
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

EventMainStep.propTypes = {
  isActive: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  firstStep: PropTypes.func.isRequired,
  lastStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,

  updateValues: PropTypes.func.isRequired,
  eventTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.IsRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  isFinalSubmitReady: PropTypes.bool.isRequired
};

export default React.memo(EventMainStep);
