import * as Yup from "yup";

export const Schema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter student's name"),
  Class: Yup.string().min(2).max(15).required("Please enter student's class"),
  email: Yup.string().email().required("Please enter student's email id"),
  Phone: Yup.number().min(6, "Number must be at least 6 charaters").required("Please enter student's phone number"),
  Address: Yup.string().min(5).max(25).required("Please enter student's address"),
  
  
  
});