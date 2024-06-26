import * as yup from "yup";

// login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Please enter email").trim(),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/(?=.*[0-9])/, "Password includes characters and numbers"),
});

// register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Please enter email").trim(),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/(?=.*[0-9])/, "Password includes characters and numbers"),
  fullName: yup
    .string()
    .required("Please enter username")
    .max(20, "Username must not exceed 20 characters")
    .matches(/^[a-zA-Z ]*$/, "Username contains only characters"),
});

const ProfileValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter first name")
    .max(20, "First name must not exceed 20 characters"),
  // .matches(/^[a-zA-Z ]*$/, "First name contains only characters"),
  // lastName: yup
  //   .string()
  //   .required("Please enter last name")
  //   .max(20, "Last name must not exceed 20 characters")
  //   .matches(/^[a-zA-Z ]*$/, "Last name contains only characters"),
  // email: yup.string().email().required("Please enter email").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Please re-enter your old password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/(?=.*[0-9])/, "Password includes characters and numbers"),
  newPassword: yup
    .string()
    .required("Please enter a new password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/(?=.*[0-9])/, "Password includes characters and numbers"),
  confirmPassword: yup
    .string()
    .required("Please re-enter new password")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

// recover password validation
const RecoverPasswordValidation = yup.object().shape({
  email: yup.string().email().required("Please enter email").trim(),
});

const ResetPasswordValidation = yup.object().shape({
  newPassword: yup
    .string()
    .required("Please enter a new password")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/(?=.*[0-9])/, "Password includes characters and numbers"),
  confirmPassword: yup
    .string()
    .required("Please re-enter new password")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
  RecoverPasswordValidation,
  ResetPasswordValidation,
};
