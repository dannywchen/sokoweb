import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: transparent; // Ensures the background is transparent
  z-index: 1000; // Keeps the scrollbar at the top of the z-stack
`;

const ScrollBarProgress = styled.div`
  height: 100%;
  background: #a1d2ce; // Light pastel color for the scroll progress
  transition: width 0.25s ease-out;
`;

const Scroller = () => {
  const [scrollWidth, setScrollWidth] = useState("0%");

  const scrollListener = () => {
    // Calculate the scroll progress as a percentage
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollProgress = `${(totalScroll / windowHeight) * 100}%`;
    setScrollWidth(scrollProgress);
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener("scroll", scrollListener);

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <ScrollBarContainer>
      <ScrollBarProgress style={{ width: scrollWidth }} />
    </ScrollBarContainer>
  );
};

export default Scroller;
