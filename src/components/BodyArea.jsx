import React, { useEffect, useState } from "react";
import body_area from "../assets/body_area.jpg";
import ToDoItem from "./ToDoItem";
import axios from "axios";
import { useSelector } from "react-redux";

const getAllToDo = `${import.meta.env.VITE_APP_API_ENDPOINT}/ToDo`;
const createToDo = `${import.meta.env.VITE_APP_API_ENDPOINT}/ToDo/create`;
const updateToDo = `${import.meta.env.VITE_APP_API_ENDPOINT}/ToDo/update`;

const BodyArea = () => {
  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const [placeholder, setPlaceholder] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");

  const handleFocus = () => {
    setPlaceholder("Try typing 'Pay utilities note by Friday 6pm'");
  };

  const handleBlur = () => {
    setPlaceholder("Add a task");
  };

  const token = useSelector((state) => state.account.token);

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append("name", task);
        formData.append("completed", false);

        // Send the request using axios
        const response = await axios.post(createToDo, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Update the state with the new task
        setTasks([...tasks, response.data]);
        setTask("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const handleToggleTask = async (index) => {
    const taskToUpdate = tasks[index];
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("name", updatedTask.name);
      formData.append("completed", updatedTask.completed);

      // Send the request using axios
      await axios.put(`${updateToDo}/${taskToUpdate.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const newTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setTasks(newTasks);
      fetchData();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(getAllToDo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div
      className='relative h-full w-full bg-cover bg-center'
      style={{ backgroundImage: `url(${body_area})` }}
    >
      {/* {top} */}
      <div className='p-8 z-10'>
        <h1 className='text-white text-4xl font-medium'>To Do</h1>
        <h2 className='text-white ml-1'>{getFormattedDate()}</h2>
      </div>
      {/* {body part} */}
      <div className='w-full h-[70%] overflow-y-auto '>
        <div className='h-full w-full flex flex-col'>
          {tasks.map((task, index) => (
            <ToDoItem
              key={index}
              task={task}
              index={index}
              onToggle={handleToggleTask}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
      {/* {bottom part} */}
      <div className='h-[12%] p-5  flex justify-center items-center'>
        <textarea
          type='text'
          className='py-3 pl-10 w-full h-full bg-zinc-600 bg-opacity-70 rounded-lg placeholder-gray-400 focus:bg-opacity-80 focus:outline-none  text-white'
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
      </div>
    </div>
  );
};

export default BodyArea;
