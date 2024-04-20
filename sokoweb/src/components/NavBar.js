import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Custom Scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #a1d2ce #f7d7ff; // Pastel scrollbar colors
  }

  /* For Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px; // Scrollbar width
  }

  *::-webkit-scrollbar-track {
    background: #f7d7ff; // Scrollbar track color
  }

  *::-webkit-scrollbar-thumb {
    background-color: #a1d2ce; // Scrollbar thumb color
    border-radius: 20px;
    border: 3px solid #f7d7ff; // Scrollbar thumb border color
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 209, 220, 0.8); // Light pastel pink background
  color: #5e6472; // Soft dark gray for contrast
  padding: 1rem 2rem;
  position: absolute;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.4rem;
  cursor: pointer;
`;

const NavItems = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 1rem;
`;

const NavItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Icons = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchIcon = styled(FaSearch)`
  &:hover {
    color: #ccc;
  }
`;

const ShoppingCartIcon = styled(FaShoppingCart)`
  &:hover {
    color: #ccc;
  }
`;

const NavBar = () => {
  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>🍎Vision Pro</Logo>
        <NavItems>
          <NavItem>Store</NavItem>
          <NavItem>Mac</NavItem>
          <NavItem>iPad</NavItem>
          <NavItem>iPhone</NavItem>
          <NavItem>Watch</NavItem>
          {/* Add other nav items as needed */}
        </NavItems>
        <Icons>
          <SearchIcon />
          <ShoppingCartIcon />
        </Icons>
      </Nav>
    </>
  );
};

export default NavBar;
