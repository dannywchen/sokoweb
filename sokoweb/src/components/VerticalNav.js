// VerticalNav.js
import React from "react";
import styled from "styled-components";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 209, 220, 0.8);
  color: #5e6472;
  padding: 2rem 1rem;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 60px;
  box-sizing: border-box;
  z-index: 1000;
`;

const NavItems = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 1rem;
`;

const NavItem = styled.li`
  writing-mode: vertical-rl;
  text-orientation: upright;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ccc;
  }
`;

const Icons = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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

const VerticalNav = () => {
  return (
    <Nav>
      <NavItems>
        <NavItem>Home</NavItem>
        <NavItem>Art</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Gallery</NavItem>
        <NavItem>Facts</NavItem>
      </NavItems>
      <Icons>
        <SearchIcon />
        <ShoppingCartIcon />
      </Icons>
    </Nav>
  );
};

export default VerticalNav;
