import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Ulogin'
import Home from './pages/Home'

import { AppContext } from './context/AppContext'
import Create from './components/Create'

const App = () => {
  const { showUlogin, setShowUlogin, ulogin } = useContext(AppContext);
  const {showCreate,setShowCreate} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-[#d7dcc1] via-[#e8e4d9] to-[#f4f3ef] animate-gradient'>
      {/* Show Ulogin if the user is not logged in */}
      {showUlogin && !ulogin && <Login />}
      {showCreate && <Create/>}

      {/* Only show the Home page if the user is logged in */}
      {ulogin && (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
