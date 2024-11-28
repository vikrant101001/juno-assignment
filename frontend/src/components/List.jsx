import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import Create from './Create'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const List = ({ showCreate, setShowCreate }) => {
  const { tasks, setTasks, key } = useContext(AppContext);

    // Axios configuration with key as an authorization header
    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      };

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, axiosConfig);
      setTasks(response.data); // Update state with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Delete Task by ID
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, axiosConfig);
      
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks); // Update state after deletion
      console.log('Task deleted successfully!');
      //toast.success('The task has been deleted successfully'); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle Update status
  const handleUpdate = async (id, newStatus) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/${id}/status`, {
        status: newStatus,
      }, axiosConfig);
      if (response.status === 200) {
        fetchTasks(); 
        console.log('Task updated successfully');
        //toast.success('The task has been updated successfully');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Callback function to refresh the task list
  const refreshTaskList = () => {
    fetchTasks(); 
  };

  return (
    <motion.div className="flex flex-col justify-center items-center text-center space-y-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 3 }}
    >
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-12 py-4 rounded-full border border-neutral-500">
        <p className="text-3xl">List of Tasks and Their Details</p>
      </div>

      <div className="space-y-4 w-full max-w-4xl">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-start">
            <div className="w-2/3">
              <h2 className="font-bold text-lg text-left mb-2">{task.title}</h2>
              <p className="text-sm mb-4 text-left">{task.description}</p>
            </div>
            <div className="w-1/3 flex flex-col items-end justify-between">
            <select
                className="border px-4 py-2 rounded-full mb-4"
                value={task.status} 
                onChange={(e) => handleUpdate(task.id, e.target.value)}
              >
                <option value="OPEN">OPEN</option>
                <option value="DONE">DONE</option>
              </select>
              <div className="flex gap-2">
                
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                  onClick={() => deleteTask(task.id)} 
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal will be managed by the parent component */}
      {showCreate && <Create setShowCreate={setShowCreate} refreshTaskList={refreshTaskList} />}

      <ToastContainer />
    </motion.div>
  );
};

export default List;
