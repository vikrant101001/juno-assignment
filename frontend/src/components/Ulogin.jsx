import React, { useState, useContext } from 'react';
import axios from 'axios'; 
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'; 

const Ulogin = () => {
  const { setUlogin, setShowUlogin , setKey} = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    
    const finalUsername = isAdmin ? "admin" : username;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin/`, { username: finalUsername, password });

      const { accessToken } = response.data;

   
      localStorage.setItem('accessToken', accessToken);
      setKey(accessToken);

     
      setShowUlogin(false);
      setUlogin(true);

    } catch (error) {
      
      setError("Invalid username or password.");
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { username, password });
      if (response.status === 201) {
        setError(""); 
      setIsLogin(true); 
    } else {
      // Non-201 status
      setError('Signup failed. Please try again.');
    }
    } catch (error) {
      //("Signup failed. Please try again.");
    }
  };

  return (
  
        
    <div className='h-screen flex justify-center items-center'>
      
      {/* Container for Login and SignUp toggle */}
      
      

      <div className='w-full max-w-[500px]'>


      <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-20 py-1 rounded-full border border-neutral- my-20 items-center justify-center'>
      <p className='text-center'>
                JUNO AI Assignment - Vikrant Thoidingjam
        </p>
      </div>
      
        <div className='flex justify-between'>
          
          {/* Login Button */}
          <button
            className={`flex-1 py-4 text-center border-2 text-xl font-semibold ${isLogin ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-500'}`}
            onClick={() => setIsLogin(true)} // Switch to Login
          >
            Login
          </button>

          {/* SignUp Button */}
          <button
            className={`flex-1 py-4 text-center border-2 text-xl font-semibold ${!isLogin ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-500'}`}
            onClick={() => setIsLogin(false)} // Switch to SignUp
          >
            SignUp
          </button>
        </div>

        {/* Render login or signup form based on isLogin state */}
        <div className='mt-8'>
          {isLogin ? (
            <div>
              <h2 className='text-3xl text-center mb-4'>Login</h2>
              <form className='space-y-4' onSubmit={handleLogin}>
                {/* Admin Login Toggle */}
                 {/* Admin Login Toggle */}
                 <div className="flex items-center justify-center mb-4">
                  <label className="mr-2 text-xl">Admin Login</label>
                  <input
                    type="checkbox"  
                    checked={isAdmin} 
                    onChange={() => setIsAdmin(!isAdmin)} 
                  />
                </div>
                 {/* Username Input (Hidden for Admin Login) */}
                {!isAdmin && (
                  <input
                    type="text"
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className='w-full p-4 border-2 border-gray-300 rounded-md'
                  />
                 )}
                <input
                  type="password"
                  placeholder="Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-full p-4 border-2 border-gray-300 rounded-md'
                />
                <button
                  type="submit"
                  className='w-full py-4 bg-blue-600 text-white rounded-md text-xl'
                >
                  Login
                </button>
              </form>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>} {/* Display error message */}
            </div>
          ) : (
            <div>
              <h2 className='text-3xl text-center mb-4'>SignUp</h2>
              <form className='space-y-4' onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full p-4 border-2 border-gray-300 rounded-md'
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full p-4 border-2 border-gray-300 rounded-md'
                />
                <button
                  type="submit"
                  className='w-full py-4 bg-blue-600 text-white rounded-md text-xl'
                >
                  SignUp
                </button>
              </form>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ulogin;
