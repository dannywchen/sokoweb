import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Homepage from "./views/Homepage";
import Artpage from "./views/Artpage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/art" element={<Artpage />} />
      </Routes>
    </Router>
  );
};

export default App;
