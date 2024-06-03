import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-width: thin;
    scrollbar-color: #a1d2ce #f7d7ff;
  }
  *::-webkit-scrollbar {
    width: 12px;
  }
  *::-webkit-scrollbar-track {
    background: #f7d7ff;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #a1d2ce;
    border-radius: 20px;
    border: 3px solid #f7d7ff;
  }
`;

const Sidebar = styled.nav`
  width: 80px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const NavItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  gap: 1.5rem;
`;

const NavItem = styled.li`
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const NavIcon = styled(FiMenu)`
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const BottomIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
`;

const ShoppingCartIcon = styled(FaShoppingCart)`
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
`;

const NavBar = () => {
  return (
    <>
      <GlobalStyle />
      <Sidebar>
        <NavIcon />
        <NavItems>
          <Logo>🍎Sokolovski</Logo>
          <NavItem>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/art" style={{ textDecoration: 'none', color: 'inherit' }}>Art</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>Gallery</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/facts" style={{ textDecoration: 'none', color: 'inherit' }}>Facts</NavLink>
          </NavItem>
        </NavItems>
        <BottomIcons>
          <SearchIcon />
          <ShoppingCartIcon />
        </BottomIcons>
      </Sidebar>
    </>
  );
};

export default NavBar;