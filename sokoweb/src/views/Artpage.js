import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";
import NavBar from "../components/NavBar";

const zoomIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const zoomOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.5);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px;
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 10px;
  text-align: center;
  font-family: 'Cinzel', serif;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 10px;
  text-align: center;
  color: #666;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  animation: ${fadeIn} 0.5s ease forwards;

  &.fade-out {
    animation: ${fadeOut} 0.5s ease forwards;
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 80%;
  max-height: 80%;
  animation: ${zoomIn} 0.5s ease forwards;

  &.zoom-out {
    animation: ${zoomOut} 0.5s ease forwards;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
`;

const images = [
  { src: "https://via.placeholder.com/300x400", title: "Art Title 1", description: "This is a description for Art Title 1" },
  { src: "https://via.placeholder.com/300x400", title: "Art Title 2", description: "This is a description for Art Title 2" },
  { src: "https://via.placeholder.com/300x400", title: "Art Title 3", description: "This is a description for Art Title 3" },
  { src: "https://via.placeholder.com/300x400", title: "Art Title 4", description: "This is a description for Art Title 4" },
  { src: "https://via.placeholder.com/300x400", title: "Art Title 5", description: "This is a description for Art Title 5" },
  { src: "https://via.placeholder.com/300x400", title: "Art Title 6", description: "This is a description for Art Title 6" },
];

const ArtPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsZoomingOut(false);
    }, 500);
  };

  return (
    <>
      <NavBar />
      <Container>
        {images.map((image, index) => (
          <Card key={index}>
            <Image src={image.src} alt={image.title} onClick={() => openModal(image)} />
            <Title>{image.title}</Title>
            <Description>{image.description}</Description>
          </Card>
        ))}
      </Container>
      {selectedImage && (
        <Modal className={isZoomingOut ? 'fade-out' : ''}>
          <ModalContent className={isZoomingOut ? 'zoom-out' : ''}>
            <ModalImage src={selectedImage.src} alt={selectedImage.title} />
            <CloseButton onClick={closeModal} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ArtPage;
