import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery, Link } from "gatsby";

import logo from "../img/afl-logo.svg";

const FooterWrapper = styled.footer`
  padding: 1rem;
  background: #eee;
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

const BrandWrapper = styled.div`
  align-self: start;
  align-items: center;
  display: flex;
`;

const Logo = styled.img.attrs({ src: logo, alt: "" })`
  width: 2rem;
  filter: grayscale(100);
  color: black;
  filter: invert(0.6);
  margin-right: 0.5rem;
`;

const Menu = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  font-size: 0.8rem;

  a {
    text-decoration: inherit;
    color: inherit;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MenuHeading = styled.h4`
  text-transform: uppercase;
  margin: 0.5em 0;
`;

const Footer = ({ data }) => {
  const { edges: teams } = data.allMarkdownRemark;
  return (
    <FooterWrapper>
      <InnerFooter>
        <BrandWrapper>
          <Logo /> Atlantic Football League
        </BrandWrapper>
        <Menu>
          <MenuHeading>Teams</MenuHeading>
          {teams.map(({ node: { frontmatter: team } }) => (
            <a href={team.website} key={team.symbol}>
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
                symbol
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);
