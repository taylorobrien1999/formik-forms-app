import * as Yup from "yup";

const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Full name is required"),
  employeeId: Yup.string()
    .matches(/^[A-Za-z0-9]{4,10}$/, "ID must be 4-10 alphanumeric characters")
    .required("Employee ID is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required"),
  department: Yup.string()
    .min(2, "Department must be at least 2 characters")
    .max(30, "Department must be less than 30 characters")
    .required("Department is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .min(30000, "Salary must be at least $30,000")
    .max(500000, "Salary seems too high")
    .required("Salary is required"),
});
