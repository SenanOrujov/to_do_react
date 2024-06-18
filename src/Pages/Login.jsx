import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import register from "../assets/register.jpg";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Alert, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { logInAction } from "../redux/slice/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const apiEndpoint = `${import.meta.env.VITE_APP_API_ENDPOINT}/Account/Login`;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },
    validationSchema: Yup.object().shape({
      Username: Yup.string().required("Username is required"),
      Password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("Username", values.Username);
        formData.append("Password", values.Password);
        const response = await axios.post(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch(
          logInAction({
            token: response.data,
          })
        );

        message.success("Login successful!");
        navigate("/");
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          message.error("Failed to login");
        } else {
          setErrorMessage("An error occurred. Please try again.");
          message.error("An error occurred. Please try again.");
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
          <h1 className='text-3xl font-bold text-[#171923]'>Log in</h1>
          <div className='flex mt-8'>
            <h6 className='text-[#718096]'>New to here?</h6>
            <h6
              onClick={() => {
                navigate("/register");
              }}
              className='underline text-[#3182CE] cursor-pointer ml-1 font-medium'
            >
              Sign up
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
                name='Username'
                onChange={formik.handleChange}
                value={formik.values.Username}
                type='text'
                placeholder='ABCDG'
                className='bg-[#F7FAFC] p-2 w-full max-w-sm border border-[#CBD5E0] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent transition duration-500'
              />
              {formik.errors.Username && formik.touched.Username && (
                <Alert
                  className='max-w-sm mt-1'
                  message={formik.errors.Username}
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
            <button
              disabled={loading}
              type='submit'
              className='bg-[#3182CE] w-full rounded-2xl p-2 max-w-sm mt-8 text-[#F7FAFC] font-medium'
            >
              {loading ? <Spin /> : "Log in"}
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

export default Login;
