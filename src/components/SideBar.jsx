import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../redux/slice/accountSlice";
import axiosInstance from "../utils/axiosInstance";

const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.account.token);

  const apiEndpoint = `${
    import.meta.env.VITE_APP_API_ENDPOINT
  }/Account/GetUser`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/Account/SignOut`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className='w-full h-full md:p-4 flex flex-col justify-between'>
      <div className='flex flex-col'>
        <h4 className='font-medium text-white text-xl md:text-2xl'>
          {user.name}
        </h4>
        <h6 className='font-thin text-xs md:text-base text-white truncate'>
          {user.email}
        </h6>
      </div>
      <Popconfirm
        title='Log out'
        description='Are you sure for log out?'
        onConfirm={handleLogOut}
        okText='Yes'
        cancelText='No'
      >
        <button
          disabled={loading}
          className='w-full h-10 bg-red-700 rounded-lg flex justify-around items-center hover:bg-red-800'
        >
          <h1 className='text-white font-medium flex items-center justify-center'>
            Log Out
          </h1>

          <LogoutOutlined className='text-xl hidden md:block' />
        </button>
      </Popconfirm>
    </div>
  );
};

export default SideBar;
