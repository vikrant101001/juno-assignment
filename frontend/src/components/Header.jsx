import React, { useContext, useState } from 'react'


import ReactDOM from 'react-dom/client';
import { Link , useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"

import { AppContext } from '../context/AppContext'

const Header = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [descriptions, setDescription] = useState("");
  const {user, setShowLogin,setShowCreate, logout, credit, ulogin} = useContext(AppContext)
    

  return (
    <motion.div className='flex flex-col justify-center items-center text-center '
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}} 
    viewport={{once: true}}
    
    >
      <div>
        <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral- my-20'>
        <p>
                JUNO AI Assignment - Vikrant Thoidingjam
        </p>
        </div>
        {ulogin && (
          <button
            className='bg-red-600 text-white px-4 py-2 rounded-full text-sm'
            onClick={logout}
          >
            Sign Out
          </button>
        )}
        </div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-5xl sm:max-w-[590px] mx-auto text-center'
        >
          
          Task Management System with <span className='text-blue-600'
          initial={{opacity: 0}}
          animate={{opacity:1}}
          transition={{delay:0.4, duration: 2}}
          
          >NESTJS and ReactJS</span> </motion.h1>

        <form className='relative  p-10 rounded-xl text-slate-500'>
        <p>Please Enter Your Task details which you want to Insert</p>

        

          <br/>
          <button
            type="button" // Prevents form submission
            onClick={() => setShowCreate(true)} 
            className='bg-blue-600 w-full text-white px-6 py-10 rounded-full text-2xl'>
            {'Click Here to Insert a Task'}
        </button>

          

        </form>

       
        


    </motion.div>
  )
}

export default Header