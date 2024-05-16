import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 9999;
  transition: opacity 1s ease-in-out;
  ${({ isHidden }) =>
    isHidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background-image: url("/images/background3.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 1s ease-in-out;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/background3.png");
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-out;
`;

const titleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

const TitleLeft = styled.h1`
  font-size: 6rem;
  font-family: "Indie Flower", cursive;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
  position: absolute;
  left: 35%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const TitleRight = styled.h1`
  font-size: 6rem;
  font-family: "Indie Flower", cursive;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
  position: absolute;
  right: 35%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  position: absolute;
  bottom: 20%;
  z-index: 1;
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
`;

const Button = styled.button`
  font-size: 1.5rem;
  font-family: "Indie Flower", cursive;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid #fff;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

const Curtain = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #b0e0e6;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LifeStoryContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/background3.png");
  background-size: cover;
  background-position: center;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
`;

const Homepage = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const backgroundRef = useRef(null);
  const lifeStoryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onended = () => {
        setIsLoading(false);
        const curtain = document.querySelector(Curtain);
        gsap.to(curtain, {
          x: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => setIsAnimationComplete(true),
        });
      };
    }

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleExploreHover = () => {
    gsap.to(lifeStoryRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleExploreLeave = () => {
    gsap.to(lifeStoryRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleExploreClick = () => {
    const sceneContainer = document.querySelector(SceneContainer);
    gsap.to(sceneContainer, {
      scale: 20,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/LifeStory");
      },
    });
  };

  return (
    <>
      <SideNav />
      {isLoading && (
        <VideoContainer isHidden={!isLoading}>
          <Video ref={videoRef} autoPlay muted>
            <source src="/introvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </VideoContainer>
      )}
      <SceneContainer>
        <BackgroundImage ref={backgroundRef} />
        {!isAnimationComplete && <Curtain />}
        {isAnimationComplete && (
          <>
            <TitleLeft>SOKO</TitleLeft>
            <TitleRight>JOURNEY</TitleRight>
            <ButtonContainer>
              <Button>BOOKS</Button>
              <Button
                onMouseEnter={handleExploreHover}
                onMouseLeave={handleExploreLeave}
                onClick={handleExploreClick}
              >
                EXPLORE
              </Button>
            </ButtonContainer>
            <LifeStoryContainer ref={lifeStoryRef} />
          </>
        )}
      </SceneContainer>
    </>
  );
};

export default Homepage;
