import React, { useState } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";

import logo from "../img/afl-logo.svg";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.primary};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const NavMenu = styled.nav`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  max-width: 1200px;
  margin: auto;

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
  padding: 0.75rem 1rem;
  color: ${props => props.theme.grayscale_i(0.7)};
  font-weight: 700;
  text-decoration: none;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: border-bottom-color linerar 200ms;

  &:hover {
    background: ${props => props.theme.grayscale(0.1)};
  }

  &.active {
    color: ${props => props.theme.grayscale_i(1)};
    border-bottom-color: ${props => props.theme.grayscale_i(1)};
  }
`;

const BrandLink = styled(NavLink)`
  color: ${props => props.theme.grayscale_i(1)};
  border-bottom-color: ${props => props.theme.grayscale_i(0)} !important;
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
    background: ${props => props.theme.grayscale_i(1)};

    a {
      color: ${props => props.theme.grayscale(0.5)};
    }

    .active {
      color: ${props => props.theme.colors.primary};
      border-bottom-color: ${props => props.theme.grayscale_i(0)};
    }
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  text-transform: uppercase;
  color: ${props => props.theme.grayscale_i(0.7)};
  padding: 1rem;
  font-weight: 700;
  font-size: inherit;
  border: none;
  display: none;

  @media (max-width: 800px) {
    display: block;

    ${props =>
      props.isOpen &&
      css`
        background: rgba(0, 0, 0, 0.1);
        outline: none;
        & + * {
          display: grid;
        }
      `}
  }
`;

const Navbar = ({ schedulePath }) => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <Wrapper>
      <NavMenu>
        <BrandLink to="/">
          <Logo /> Atlantic Football League
        </BrandLink>
        <MenuButton isOpen={openNav} onClick={() => setOpenNav(!openNav)}>
          Menu
        </MenuButton>
        <Links isOpen={openNav} onClick={() => setOpenNav(false)}>
          <NavLink to="/news">News</NavLink>
          <NavLink to={schedulePath}>Schedule</NavLink>
          <NavLink to="/achievements">Achievements</NavLink>
        </Links>
      </NavMenu>
    </Wrapper>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query CurrentScheduleUrl {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "schedule" } } }
          sort: { fields: frontmatter___year, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Navbar
          schedulePath={data.allMarkdownRemark.edges[0].node.fields.slug}
        />
      );
    }}
  />
);
