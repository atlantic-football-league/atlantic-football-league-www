import React from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { H1 } from "../../components/styles/Text";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
  }
`;

const Tag = styled(Link)`
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.grayscale(0.6)};
  background: ${({ theme }) => theme.grayscale(0.05)};
  padding: 0.5em 1em;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25em;
  transition: background 100ms ease-in-out;

  :hover {
    background: ${({ theme }) => theme.grayscale(0.1)};
  }
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Tags | ${title}`} />
      <H1>Tags</H1>
      <List className="taglist">
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </li>
        ))}
      </List>
    </section>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
