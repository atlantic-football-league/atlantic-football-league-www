import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

const Header = styled.header`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.grayscale(0.2)};
`;

const Title = styled.h1`
  margin: 0;
`;

const Time = styled.time`
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayscale(0.5)};
`;

export const NewsPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  date,
  author,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  console.log(date);
  return (
    <article className="section">
      {helmet || ""}
      <Header>
        <Time>{date}</Time>
        <Title>{title}</Title>
        {author && <div>by {author}</div>}
      </Header>
      <PostContent content={content} />
      {tags && tags.length ? (
        <div>
          <h4>Tags</h4>
          <ul className="taglist">
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
};

NewsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  helmet: PropTypes.object
};

const NewsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <NewsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | News">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        {...post.frontmatter}
      />
    </Layout>
  );
};

NewsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default NewsPost;

export const pageQuery = graphql`
  query NewsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        author
        tags
      }
    }
  }
`;
