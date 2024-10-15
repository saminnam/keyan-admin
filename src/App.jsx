import React, { useState } from 'react';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Blogs from './Components/Blogs';

const App = () => {
  const [active, setActive] = useState("Home");

  return (
    <Router>
      <div className="flex">
        {/* Fixed Navbar */}
        <Navbar active={active} setActive={setActive} />
        
        {/* Dynamic content area */}
        <div className="w-full mb-24"> {/* Adjust margin for the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home active={active} setActive={setActive} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
