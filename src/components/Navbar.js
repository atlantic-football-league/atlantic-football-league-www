import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/afl-logo.png";
import styled from "styled-components";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const NavMenu = styled.nav`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr auto;
    grid-auto-flow: row;
    justify-content: stretch;
  }
`;

const NavLink = styled(Link).attrs({ activeClassName: "active" })`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
  text-decoration: none;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: border-bottom-color linerar 100ms;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &.active {
    color: rgba(0, 0, 0, 1);
    border-bottom-color: #223b9f;

    @media (max-width: 800px) {
      border-bottom-color: transparent;
      color: #223b9f;
    }
  }
`;

const BrandLink = styled(NavLink)`
  color: #223b9f;

  &.active {
    color: #223b9f;
  }
`;

const Logo = styled.img.attrs({ src: logo })`
  height: 1.75rem;
`;

const Links = styled.div`
  display: grid;
  grid-auto-flow: column;
  @media (max-width: 800px) {
    grid-column: 1 / -1;
    grid-auto-flow: row;
    display: none;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  font-weight: 700;
  font-size: inherit;
  border: none;
  display: none;

  @media (max-width: 800px) {
    display: block;
  }

  &:focus {
    background: rgba(0, 0, 0, 0.1);
    outline: none;
    & + * {
      display: grid;
    }
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <NavMenu>
        <BrandLink to="/">
          <Logo /> Atlantic Football League
        </BrandLink>
        <MenuButton>Menu</MenuButton>
        <Links>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/achievements">Achievements</NavLink>
        </Links>
      </NavMenu>
    </Wrapper>
  );
};

export default Navbar;
