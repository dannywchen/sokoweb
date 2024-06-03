import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaBook, FaGlobe, FaUsers, FaQuestionCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SideNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ $isOpen }) => ($isOpen ? '250px' : '60px')};
  height: 100%;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 999;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s forwards;
`;

const HamburgerIcon = styled(GiHamburgerMenu)`
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;
  align-self: flex-end;
`;

const NavItem = styled.a`
  width: 100%;
  padding: 1rem 0;
  margin: 1rem 0;
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #555;
    color: #f7d7ff;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  margin-right: ${({ $isOpen }) => ($isOpen ? '1rem' : '0')};
  transition: margin-right 0.3s;
`;

const NavLabel = styled.span`
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
  transition: display 0.3s;
`;

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SideNavContainer $isOpen={isOpen}>
        <HamburgerIcon onClick={toggleNav} />
        <NavItem href="#home">
          <IconWrapper $isOpen={isOpen}><FaHome /></IconWrapper>
          <NavLabel $isOpen={isOpen}>Home</NavLabel>
        </NavItem>
        <NavItem href="#books">
          <IconWrapper $isOpen={isOpen}><FaBook /></IconWrapper>
          <NavLabel $isOpen={isOpen}>Books</NavLabel>
        </NavItem>
        <NavItem href="#explore">
          <IconWrapper $isOpen={isOpen}><FaGlobe /></IconWrapper>
          <NavLabel $isOpen={isOpen}>Explore</NavLabel>
        </NavItem>
        <NavItem href="#team">
          <IconWrapper $isOpen={isOpen}><FaUsers /></IconWrapper>
          <NavLabel $isOpen={isOpen}>Team</NavLabel>
        </NavItem>
        <NavItem href="#faq">
          <IconWrapper $isOpen={isOpen}><FaQuestionCircle /></IconWrapper>
          <NavLabel $isOpen={isOpen}>FAQ</NavLabel>
        </NavItem>
      </SideNavContainer>
    </>
  );
};

export default SideNav;
