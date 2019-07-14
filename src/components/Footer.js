import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";

import logo from "../img/afl-logo.svg";

const FooterWrapper = styled.footer`
  padding: 2rem 1rem;
  background: #eee;

  a {
    text-decoration: inherit;
    color: inherit;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const InnerFooter = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 1rem;
  margin: auto;
  max-width: 1200px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BrandWrapper = styled.span`
  align-self: start;
  align-items: center;
  display: inline-flex;
  font-weight: 600;
  font-size: 1.2rem;
  opacity: 0.5;
  transition: opacity 100ms ease-in-out;

  &:hover {
    opacity: 0.75;
  }
`;

const Logo = styled.img.attrs({ src: logo, alt: "" })`
  width: 2rem;
  color: black;
  filter: invert(1);
  margin-right: 0.5rem;
`;

const Menu = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  justify-content: start;
`;

const MenuHeading = styled.h4`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0.5em 0;
`;

const Footer = ({ data }) => {
  const { edges: teams } = data.allMarkdownRemark;
  return (
    <FooterWrapper>
      <InnerFooter>
        <div>
          <Link to="/">
            <BrandWrapper>
              <Logo /> Atlantic Football League
            </BrandWrapper>
          </Link>
        </div>
        <Menu>
          <MenuHeading>Teams</MenuHeading>
          {teams.map(({ node: { frontmatter: team } }) => (
            <a href={team.website} key={team.uid}>
              {team.title}
            </a>
          ))}
        </Menu>
        <Menu>
          <MenuHeading>League Info</MenuHeading>
          <Link to="/about-the-league">About The League</Link>
          <Link to="/code-of-ethics">Code of Ethics</Link>
          <Link to="/media-policy">Media Policy</Link>
          <Link to="/rules-and-regulations">Rules & Regulations</Link>
        </Menu>
      </InnerFooter>
    </FooterWrapper>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query Teams {
        allMarkdownRemark(filter: { frontmatter: { team: { in: true } } }) {
          edges {
            node {
              frontmatter {
                title
                website
                uid
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);
