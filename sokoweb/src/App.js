import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SideNav from './components/SideNav';
import Homepage from './views/Homepage';
import Artpage from './views/Artpage';
import LifeStory from './views/LifeStory';
import Scroller from './components/Scroller';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* Prevent horizontal scroll */
    font-family: Arial, sans-serif;
  }

  /* Custom vertical scrollbar */
  body {
    scrollbar-width: thin;
    scrollbar-color: #a1d2ce #f7d7ff; /* Firefox */
  }

  body::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  body::-webkit-scrollbar-track {
    background: #f7d7ff; /* Track color */
  }

  body::-webkit-scrollbar-thumb {
    background-color: #a1d2ce; /* Scrollbar color */
    border-radius: 20px; /* Rounded corners */
    border: 3px solid #f7d7ff; /* Padding around thumb */
  }
`;

const AppContainer = styled.div`
  display: block;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Scroller />
          <SideNav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/art" element={<Artpage />} />
            <Route path="/LifeStory" element={<LifeStory />} />
          </Routes>
        </Router>
      </AppContainer>
    </>
  );
};

export default App;
