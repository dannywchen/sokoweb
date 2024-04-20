import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import NavBar from "./components/NavBar";
import Homepage from "./views/Homepage";
import Artpage from "./views/Artpage";
import Scroller from "./components/Scroller"; // Make sure to create this component

// Hide the default scrollbar
const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll; // keeps the layout stable
    scrollbar-width: none; // for Firefox

    &::-webkit-scrollbar {
      display: none; // for Webkit browsers
    }
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle /> {/* This will hide the default scrollbar */}
      <Router>
        <Scroller /> {/* Custom scroller at the top */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/art" element={<Artpage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
