import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().min(2).required("Please enter email or username"),
  password: Yup.string().min(3).required("Please enter password"),
});

export const UsernameSchema = Yup.object({
  username: Yup.string().min(2).max(25).matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").required("Please enter username"),
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
  username: Yup.string().min(2).max(25).matches(/^[a-z0-9_]+$/, "Username can only contain small letters, numbers, and underscores").required("Please enter username"),
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
  name: Yup.string().min(2).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  subject: Yup.string().min(3).required("Please enter subject"),
  details: Yup.string().min(10).required("Please enter detail"),
});

export const NewBlogSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.array().min(1, 'Select at least one category').required('Category is required'),
  info:Yup.string().min(10).max(150).required('Info is required'),
  keywords: Yup.array().of(Yup.string().required('Keyword cannot be empty')).min(1, 'Add at least one keyword'),
  detail: Yup.string().required('Detail is required'),
  images: Yup.array().required('atlist one image is required').min(1, 'Select at least one image').max(7,'You can put maximum 7 images')
  .test('fileType', 'Invalid file type, only images are allowed', (value) => {
    if (!value) return true; // If no file is provided, skip the test
    return value.every((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type));
  })
  .test('fileSize', 'File size is too large, maximum 7MB allowed', (value) => {
    if (!value) return true;
    return value.every((file) => file.size <= 7 * 1024 * 1024); // 7MB
  }),
  status: Yup.string().oneOf(['draft', 'published','archived'], 'Invalid status').required('Status is required'),
});

export const EditBlogSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  category: Yup.array().min(1, 'Select at least one category').required('Category is required'),
  info:Yup.string().min(10).max(150).required('Info is required'),
  keywords: Yup.array().of(Yup.string().required('Keyword cannot be empty')).min(1, 'Add at least one keyword'),
  detail: Yup.string().required('Detail is required'),
  images: Yup.array().max(7,'You can put maximum 7 images')
  .test('fileType', 'Invalid file type, only images are allowed', (value) => {
    if (!value) return true; // If no file is provided, skip the test
    return value.every((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type));
  })
  .test('fileSize', 'File size is too large, maximum 7MB allowed', (value) => {
    if (!value) return true;
    return value.every((file) => file.size <= 7 * 1024 * 1024); // 7MB
  }),
  status: Yup.string().oneOf(['draft', 'published','archived'], 'Invalid status').required('Status is required'),
});

export const ProfileSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter Full Name"),
  username: Yup.string().min(2).max(25).matches(/^[a-z0-9_]+$/, "Username can only contain small letters, numbers, and underscores").required("Please enter username"),
  newMail: Yup.string().email().required("Please enter email"),
});

export const faQSchema = Yup.object({
  title: Yup.string().min(2).max(100).required("Please enter FaQ title"),
  info: Yup.string().min(10).required("Please enter Full Name"),
});


