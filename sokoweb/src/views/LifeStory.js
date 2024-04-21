// LifeStory.js
import React from "react";
import styled from "styled-components";
import VerticalNav from "../components/VerticalNav";

const LifeStoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/background1.png");
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Dot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;

const DescriptionMessage = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  max-width: 200px;
  font-size: 14px;
  z-index: 1;
`;

const LifeStory = () => {
  const dotPositions = [
    { top: "20%", left: "30%" },
    { top: "50%", left: "60%" },
    { top: "80%", left: "40%" },
  ];

  const handleDotClick = (event) => {
    const message = event.target.getAttribute("data-message");
    const descriptionMessage = document.createElement("div");
    descriptionMessage.classList.add(DescriptionMessage);
    descriptionMessage.textContent = message;
    descriptionMessage.style.top = `${event.clientY + 10}px`;
    descriptionMessage.style.left = `${event.clientX + 10}px`;
    document.body.appendChild(descriptionMessage);

    setTimeout(() => {
      document.body.removeChild(descriptionMessage);
    }, 2000);
  };

  return (
    <LifeStoryContainer>
      <VerticalNav />
      {dotPositions.map((position, index) => (
        <Dot
          key={index}
          style={{ top: position.top, left: position.left }}
          data-message={`Description ${index + 1}`}
          onClick={handleDotClick}
        />
      ))}
    </LifeStoryContainer>
  );
};

export default LifeStory;
