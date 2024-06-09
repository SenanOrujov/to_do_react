import { Checkbox, Modal, message } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";

const editToDo = `${import.meta.env.VITE_APP_API_ENDPOINT}/ToDo/update`;
const deleteToDo = `${import.meta.env.VITE_APP_API_ENDPOINT}/ToDo/delete`;

const ToDoItem = ({ task, index, onToggle, fetchData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = useSelector((state) => state.account.token);

  const [editedTask, setEditedTask] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditTask = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedTask);
      await axios.put(`${editToDo}/${task.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${deleteToDo}/${task.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.info("Delete successful!");
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Delete unsuccessful!");
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className='w-full h-[5rem] mb-2 flex flex-col'>
      <div className='bg-zinc-700 mx-10 p-3 rounded-lg flex items-center'>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(index)}
          className='mr-4'
        />
        <div
          className={`text-white cursor-pointer w-full truncate `}
          onClick={showModal}
        >
          <h1 className={`${task.completed ? "line-through" : ""}`}>
            {task.name}
          </h1>
          <p className='text-sm text-gray-400'>
            {dayjs(task.date).format("MMMM D, h:mm A")}
          </p>
        </div>
      </div>

      <Modal
        title='Task Details'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <button
            key='remove'
            onClick={handleDelete}
            className='bg-red-500 text-white px-4 py-2 rounded-lg m-1'
          >
            Remove
          </button>,
          <button
            key='edit'
            onClick={handleEditTask}
            className='bg-yellow-500 text-white px-4 py-2 rounded-lg'
          >
            Edit
          </button>,
        ]}
      >
        <textarea
          type='text'
          defaultValue={task.name}
          onChange={(e) => setEditedTask(e.target.value)}
          className='text-lg focus:outline-none p-3 w-full '
        />
        <p className='text-sm text-gray-600 mt-4'>
          {dayjs(task.date).format("MMMM D, YYYY h:mm A")}
        </p>
      </Modal>
    </div>
  );
};

export default ToDoItem;
