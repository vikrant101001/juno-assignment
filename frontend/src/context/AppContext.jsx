import React, { createContext, useState , useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [key, setKey] = useState(localStorage.getItem('accessToken'));




  const [showUlogin, setShowUlogin] = useState(true); 
  const [ulogin, setUlogin] = useState(false); 
  const [tasks, setTasks] = useState([])

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      setKey(token);
      setUlogin(true);
      setShowUlogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken'); 
    setUlogin(false);
    setShowUlogin(true);
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    showUlogin,
    setShowUlogin,
    ulogin,
    setUlogin, 
    backendURL,
    showCreate,
    setShowCreate,
    tasks,
    setTasks,
    key, 
    setKey,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
