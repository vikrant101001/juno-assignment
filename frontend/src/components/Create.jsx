import React, { useContext, useState } from 'react';

import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios




import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { assets } from '../assets/assets';

const Create = () => {
  const { setShowCreate, setTasks, key  } = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  // Axios configuration with key as an authorization header
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };

  // Create Task API function
  const createTask = async (e) => {
    
    e.preventDefault(); // Prevent the form from refreshing the page

    if (!title || !description) {
      toast.error("Both title and description are required!"); // Show error if fields are empty
      return;
    }

    // Prepare the data to send to the API
    const taskData = {
      title: title,
      description: description,
    };

    try {
      // Make the API call
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData, axiosConfig);
      setShowCreate(false);
      
      
      const updatedTasks = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, axiosConfig);
      setTasks(updatedTasks.data); // Update tasks in context

      // If the API call is successful
      if (response.status === 200) {
        //toast.success("Task created successfully!"); // Notify success
        
        setShowCreate(false); // Close the form
      }
    } catch (error) {
      // If an error occurs during the API call
      toast.error("Error creating task! Please try again."); // Notify error
    }
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form
        className='relative bg-white p-20 rounded-2xl text-slate-500 w-[600px] h-[700px]'
        onSubmit={createTask} // Attach the createTask function to the form submit
      >
        <h1 className='text-center text-4xl text-neutral-700 font-bold mb-8'>
          Create A Task
        </h1>
        <p className='text-center'>Please provide information about your Task</p>

        <div className='border px-6 py-4 flex gap-2 mt-4 rounded-lg'>
          <textarea
            onChange={e => setTitle(e.target.value)} // Update title state
            value={title}
            className='outline-none text-sm w-full resize-none'
            placeholder='Title'
            required
          />
        </div>

        <div className='border px-6 py-4 flex gap-2 mt-4 rounded-lg'>
          <textarea
            onChange={e => setDescription(e.target.value)} // Update description state
            value={description}
            className='outline-none text-sm w-full h-40 resize-none'
            placeholder='Description'
            required
          />
        </div>

        <br/><br/><br/><br/>

        <button
          type="submit" // Changed to submit to trigger the onSubmit event
          
          className='bg-blue-600 w-full text-white py-2 rounded-full'
        >
          {'Create Task'}
        </button>

        <img
          onClick={() => setShowCreate(false)}
          src={assets.cross_icon}
          alt=""
          className='absolute top-5 right-5 cursor-pointer'
        />
      </form>

      <ToastContainer />
    </div>
  );
};

export default Create;
