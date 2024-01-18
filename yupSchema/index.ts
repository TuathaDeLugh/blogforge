import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().min(2).max(25).required("Please enter email"),
  password: Yup.string().min(3).required("Please enter password"),
});

export const UsernameSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please enter username"),
  pass: Yup.string()
    .required("Please enter a password")
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmpassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref('pass')], 'Confirm Password does not match with password'),
});

export const SignupSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter Full Name"),
  username: Yup.string().min(2).max(25).required("Please enter username"),
  email: Yup.string().email().required("Please enter email"),
  pass: Yup.string()
    .required("Please enter a password")
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmpassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref('pass')], 'Confirm Password does not match with password'),
});

export const emailSchema = Yup.object({
  fullname: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  subject: Yup.string().min(3).required("Please enter subject"),
  details: Yup.string().min(10).required("Please enter detail"),
});

export const AddReviewSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.array().required('Category is required').min(1, 'Select at least one category'),
  image: Yup.string().required('Image is required'),
  rating: Yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(10, 'Rating must be at most 10'),
  trailer: Yup.string().required("Trailer link is required").matches(/^(\/|(https?|ftp):\/\/[^\s/$.?#].[^\s]*)$/, 'Please enter a valid URL. You can put / if Trailer not available'),
  episodes: Yup.string().required('Episodes are required').min(1, 'Episodes must be at least 1').max(255, 'Episodes must be at most 255'),
  detail: Yup.string().required('Details are required'),
});

export const EditReviewSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.array().required('Category is required').min(1, 'Select at least one category'),
  rating: Yup.number().required('Rating is required').min(0, 'Rating must be at least 0').max(10, 'Rating must be at most 10'),
  trailer: Yup.string().required("Trailer link is required").matches(/^(\/|(https?|ftp):\/\/[^\s/$.?#].[^\s]*)$/, 'Please enter a valid URL. You can put / if Trailer not available'),
  episodes: Yup.string().required('Episodes are required').min(1, 'Episodes must be at least 1').max(255, 'Episodes must be at most 255'),
  detail: Yup.string().required('Details are required'),
});

export const ProfileSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter Full Name"),
  username: Yup.string().min(2).max(25).required("Please enter username"),
  email: Yup.string().email().required("Please enter email"),
});

export const PassSchema = Yup.object({
  oldpassword: Yup.string().required('Old Password is required'),
  newpassword: Yup.string().required("Please enter new password").min(8, 'Password must be 8 characters long').matches(/[0-9]/, 'Password requires a number').matches(/[a-z]/, 'Password requires a lowercase letter').matches(/[A-Z]/, 'Password requires an uppercase letter').matches(/[^\w]/, 'Password requires a symbol'),
  confirmpassword: Yup.string().required("Please confirm password").oneOf([Yup.ref('newpassword')], 'Confirm Password does not match with password'),
});
