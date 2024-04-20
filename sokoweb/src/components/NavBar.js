import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &.active {
    color: #4caf50;
  }

  &:hover {
    color: #4caf50;
  }
`;

const NavBar = () => {
  return (
    <Nav>
      <Logo>Art Gallery</Logo>
      <NavItems>
        <StyledLink to="/" exact activeClassName="active">
          Home
        </StyledLink>
        <StyledLink to="/art" activeClassName="active">
          Art
        </StyledLink>
      </NavItems>
    </Nav>
  );
};

export default NavBar;
