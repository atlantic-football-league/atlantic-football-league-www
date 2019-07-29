import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Panel from "../components/Panel";

const Heading = styled.h1`
  color: ${({ theme }) => theme.grayscale(0.5)};
  font-size: 1rem;
  font-style: italic;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 1rem;
`;

const PanelLink = styled(Link)`
  color: inherit;
  font-weight: 600;
  text-decoration: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <PanelLink to={post.node.fields.slug}>
          <Panel>{post.node.frontmatter.title}</Panel>
        </PanelLink>
      </li>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    return (
      <Layout>
        <main>
          <Helmet title={`${tag} | ${title}`} />
          {/* <Panel> */}
          <Heading>{tagHeader}</Heading>
          <List className="taglist">{postLinks}</List>
          <p>
            <Link to="/tags/">Browse all tags</Link>
          </p>
          {/* </Panel> */}
        </main>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
