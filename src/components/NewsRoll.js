import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import Panel from "./Panel";

const Container = styled.main`
  display: grid;
  grid-gap: 1rem;
`;

const Article = styled.article`
  display: grid;
  grid-gap: 0.5rem;
`;

const ArticleLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;

  &:hover {
    h3,
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Title = styled.h3`
  margin: 0;
`;

const Author = styled.p`
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8em;
  color: ${({ theme }) => theme.grayscale(0.5)};

  .prefix {
    font-weight: 400;
    text-transform: none;
  }
`;

const Time = styled.time`
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayscale(0.5)};
`;

const MoreLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayscale(0.5)};
`;

const Excerpt = styled.p`
  font-size: 0.9em;
  margin: 0;
`;

class NewsRoll extends React.Component {
  render() {
    const { data, limit } = this.props;
    const { edges } = data.allMarkdownRemark;
    const posts = limit ? edges.slice(0, limit) : edges;

    return (
      <Container>
        {posts &&
          posts.map(({ node: post }) => (
            <ArticleLink to={post.fields.slug}>
              <Panel key={post.id}>
                <Article>
                  <Time datetime={post.frontmatter.date}>
                    {post.frontmatter.date}
                  </Time>
                  <Title>{post.frontmatter.title}</Title>
                  {post.frontmatter.author && (
                    <Author>
                      <span class="prefix">by</span> {post.frontmatter.author}
                    </Author>
                  )}
                  <Excerpt>{post.excerpt}</Excerpt>
                  <MoreLink to={post.fields.slug}>Keep Reading →</MoreLink>
                </Article>
              </Panel>
            </ArticleLink>
          ))}
      </Container>
    );
  }
}

NewsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default ({ limit }) => (
  <StaticQuery
    query={graphql`
      query NewsRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                author
                templateKey
                date(formatString: "DD MMMM, YYYY")
                featuredpost
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <NewsRoll data={data} count={count} limit={limit} />
    )}
  />
);
