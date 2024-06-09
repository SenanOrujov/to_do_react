import { useState } from "react";
import logo from "../assets/Logo.png";
import register from "../assets/register.jpg";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Alert, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const apiEndpoint = `${import.meta.env.VITE_APP_API_ENDPOINT}/Account/Register`;

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Username is required"),
      Email: Yup.string().email("Invalid email").required("Email is required"),
      Password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(
          /[A-Z]/,
          "Passwords must have at least one uppercase ('A'-'Z')"
        ),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          apiEndpoint,
          {
            Name: values.Name,
            Email: values.Email,
            Password: values.Password,
            ConfirmPassword: values.ConfirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        message.loading({ content: "Registration successful!", duration: 3 });
        navigate("/login");
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          message.error("Error:", error.response.data);
        } else {
          setErrorMessage("An error occurred. Please try again.");
          message.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='w-full h-screen flex bg-[#F7FAFC]'>
      {/* Left Side */}
      <div className='w-full max-w-[750px]  flex flex-col'>
        <div className='pb-0 p-8 flex items-center'>
          <img src={logo} alt='logo' className='w-[30px] h-[28px] mr-3' />
          <h1 className='text-2xl font-bold text-[#3182CE]'>To Do</h1>
        </div>
        <div className='max-w-[520px] p-8'>
          <h1 className='text-3xl font-bold text-[#171923]'>Sign in</h1>
          <div className='flex mt-8'>
            <h6 className='text-[#718096]'>Already have an account?</h6>
            <h6
              onClick={() => {
                navigate("/login");
              }}
              className='underline text-[#3182CE] cursor-pointer ml-1 font-medium'
            >
              Login here!
            </h6>
          </div>
          {/* Inputs */}
          <form
            onSubmit={formik.handleSubmit}
            className='flex w-full pt-12 flex-col'
          >
            <div className='w-full'>
              <h5 className='text-[#718096] mb-[3px]'>Username</h5>
              <input
                name='Name'
                onChange={formik.handleChange}
                value={formik.values.Name}
                type='text'
                placeholder='ABCDG'
                className='bg-[#F7FAFC] p-2 w-full max-w-sm border border-[#CBD5E0] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent transition duration-500'
              />
              {formik.errors.Name && formik.touched.Name && (
                <Alert
                  className='max-w-sm mt-1'
                  message={formik.errors.Name}
                  type='error'
                  showIcon
                />
              )}
            </div>
            <div className='w-full mt-6'>
              <h5 className='text-[#718096] mb-[3px]'>E-mail</h5>
              <input
                name='Email'
                onChange={formik.handleChange}
                value={formik.values.Email}
                type='text'
                placeholder='example@gmail.com'
                className='bg-[#F7FAFC] p-2 w-full max-w-sm border border-[#CBD5E0] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent'
              />
              {formik.errors.Email && formik.touched.Email && (
                <Alert
                  className='max-w-sm mt-1'
                  message={formik.errors.Email}
                  type='error'
                  showIcon
                />
              )}
            </div>
            <div className='w-full mt-6'>
              <h5 className='text-[#718096] mb-[3px]'>Password</h5>
              <input
                name='Password'
                onChange={formik.handleChange}
                value={formik.values.Password}
                type='password'
                placeholder='!@#$'
                className='bg-[#F7FAFC] p-2 w-full max-w-sm border border-[#CBD5E0] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent transition duration-500'
              />
              {formik.errors.Password && formik.touched.Password && (
                <Alert
                  className='max-w-sm mt-1'
                  message={formik.errors.Password}
                  type='error'
                  showIcon
                />
              )}
            </div>
            <div className='w-full mt-6'>
              <h5 className='text-[#718096] mb-[3px]'>Confirm Password</h5>
              <input
                name='ConfirmPassword'
                onChange={formik.handleChange}
                value={formik.values.ConfirmPassword}
                type='password'
                placeholder='!@#$'
                className={`bg-[#F7FAFC] p-2 w-full max-w-sm border border-[#CBD5E0] rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  formik.values.Password === formik.values.ConfirmPassword
                    ? "focus:ring-[#3182CE]"
                    : "focus:ring-red-500"
                } focus:border-transparent transition duration-500`}
              />
              {formik.errors.ConfirmPassword &&
                formik.touched.ConfirmPassword && (
                  <Alert
                    className='max-w-sm mt-1'
                    message={formik.errors.ConfirmPassword}
                    type='error'
                    showIcon
                  />
                )}
            </div>
            <button
              disabled={loading}
              type='submit'
              className='bg-[#3182CE] w-full rounded-2xl p-2 max-w-sm mt-8 text-[#F7FAFC] font-medium'
            >
              {loading ? <Spin /> : "Sign in"}
            </button>
            {errorMessage && (
              <div className='mt-4 text-red-500'>{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
      {/* Right Side */}
      <div className='w-full pl-0 p-5 hidden md:block'>
        <img
          src={register}
          alt='Register'
          className='w-full h-full  object-fill rounded-3xl'
        />
      </div>
    </div>
  );
};

export default Register;
