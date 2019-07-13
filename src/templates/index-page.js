import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";
import { H2 } from "../components/styles/Text";
import Layout from "../components/Layout";
import NewsRoll from "../components/NewsRoll";

const MoreNewsLink = styled(Link)`
  border-radius: 0.25rem;
  display: block;
  background: ${({ theme }) => theme.grayscale(0.1)};
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.grayscale(0.6)};
  text-align: center;
  text-decoration: inherit;
  text-transform: uppercase;
  font-weight: 600;
  transition: background 100ms ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.grayscale(0.15)};
  }
`;

export const IndexPageTemplate = ({}) => (
  <>
    <H2>Latest stories</H2>
    <NewsRoll limit={5} />
    <MoreNewsLink to="/news">More News &rarr;</MoreNewsLink>
  </>
);

const IndexPage = () => {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;
