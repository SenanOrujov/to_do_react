import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../redux/slice/accountSlice";

const apiEndpoint = `${import.meta.env.VITE_APP_API_ENDPOINT}/Account/SignOut`;

const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.account.token);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post(apiEndpoint);
      dispatch(logOutAction());
      message.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className='w-full h-full md:p-4  flex flex-col justify-between'>
        {/* Name,email */}
        <div className='flex flex-col '>
          <h4 className='font-medium text-white text-xl md:text-2xl '>
            Senan Orucov
          </h4>
          <h6 className='font-thin text-xs md:text-base text-white truncate'>
            senan@gmail.com
          </h6>
        </div>
        <button
          disabled={loading}
          onClick={handleLogOut}
          className='w-full h-10 bg-red-700 rounded-lg flex justify-around items-center hover:bg-red-800'
        >
          <h1 className='text-white font-medium flex items-center justify-center'>
            Log Out
          </h1>
          <LogoutOutlined className='text-xl  hidden md:block' />
        </button>
      </div>
    </>
  );
};

export default SideBar;