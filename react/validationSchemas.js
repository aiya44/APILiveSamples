import * as Yup from "yup";

// Other co-workers content

const eventMainStepValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .max(255)
    .required("This field is required."),
  headline: Yup.string(),
  summary: Yup.string()
    .min(2)
    .max(255)
    .required("This field is required."),
  description: Yup.string()
    .min(10)
    .max(4000)
    .required("This field is required."),
  eventTypeId: Yup.number().required("This field is required."),
  dateStart: Yup.date()
    .min(
      new Date(),
      "Please register events for a valid start date and/or time."
    )
    .required("This field is required."),

  dateEnd: Yup.date()
    .min(
      Yup.ref("dateStart"),
      "Please register events for a valid end date and/or time."
    )
    .required("This field is required."),

  setupTime: Yup.date()
    .min(new Date(), "Please reserve a valid period of time for setup")
    .max(
      Yup.ref("dateStart"),
      "Please reserve setup time before the event starts."
    )
    .required("This field is required.")
});

const eventFilesStepValidationSchema = Yup.object().shape({
  adDocs: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .max(50)
        .required("This field is required."),
      documentUrl: Yup.string()
        .url("Please enter a valid Url.")
        .required("This field is required.")
    })
  ),
  images: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string()
          .min(2)
          .max(100)
          .required("This field is required."),
        description: Yup.string()
          .min(2)
          .max(400)
          .required("This field is required."),
        url: Yup.string()
          .min(2)
          .max(250)
          .url("Please enter a valid Url.")
          .required("This field is required.")
      })
    )
    .required(
      "Please add at least one image. The first image will represent your Primary Image."
    )
});

// Other co-workers content

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This value should be a valid email.")
    .required("This value is required."),
  password: Yup.string().required("This value is required.")
});

// Other co-workers content

const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This value should be a valid email.")
    .required("This value is required."),
  password: Yup.string()
    .required("This value is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z]).{8,}$/,
      "Password must contain at least One lowercase character"
    )
    .matches(
      /^(?=.*[A-Z]).{8,}$/,
      "Password must contain at least One uppercase character"
    )
    .matches(
      /^(?=.*\d).{8,}$/,
      "Password must contain at least One number digit"
    )
    .matches(
      /^(?=.*[!@#$%^&*_-]).{8,}$/,
      "Password must contain at least One special character"
    ),
  passwordConfirm: Yup.string()
    .required("This value is required.")
    .oneOf([Yup.ref("password"), null], "This value should be the same."),
  role: Yup.string().required("This value is required."),
  terms: Yup.bool().oneOf([true], "This value is required.")
});

// Other co-workers content

export {
  // Other co-workers content
  eventMainStepValidationSchema,
  eventFilesStepValidationSchema,
  // Other co-workers content
  loginValidationSchema,
  // Other co-workers content
  registerValidationSchema
  // Other co-workers content
};
