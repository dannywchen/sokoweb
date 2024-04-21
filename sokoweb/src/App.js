// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import NavBar from "./components/NavBar";
import Homepage from "./views/Homepage";
import Artpage from "./views/Artpage";
import Scroller from "./components/Scroller";
import FakeLoader from "./components/FakeLoader";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      <GlobalStyle />
      {isLoading ? (
        <FakeLoader />
      ) : (
        <Router>
          <Scroller />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/art" element={<Artpage />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
