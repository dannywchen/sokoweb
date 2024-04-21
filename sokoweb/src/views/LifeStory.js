// LifeStory.js
import React from "react";
import styled from "styled-components";

const LifeStoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/life-story-image.jpg");
  background-size: cover;
  background-position: center;
`;

const LifeStory = () => {
  return <LifeStoryContainer />;
};

export default LifeStory;
