import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { Markdown } from "../components/styles/Markdown";
import TeamTag from "../components/TeamTag";
import Panel from "../components/Panel";

const Header = styled.header`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.grayscale(0.2)};
`;

const Title = styled.h1`
  margin: 0;
`;

const subheading = css`
  font-weight: 600;
  font-size: 0.8em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayscale(0.5)};
`;

const Time = styled.time`
  ${subheading}
`;

const Author = styled.div`
  ${subheading}

  .prefix {
    font-weight: 400;
    text-transform: none;
  }
`;

const TagsTitle = styled.h4`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

const TagsList = styled.ul`
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

export const NewsPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  teamId,
  date,
  author,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <article>
      {helmet || ""}
      <Panel>
        <Header>
          {teamId && <TeamTag teamId={teamId} />}
          <Time>{date}</Time>
          <Title>{title}</Title>
          {author && (
            <Author>
              <span className="prefix">by</span> {author}
            </Author>
          )}
        </Header>
        <Markdown>
          <PostContent content={content} />
        </Markdown>
      </Panel>
      {tags && tags.length ? (
        <section>
          <TagsTitle>Tags</TagsTitle>
          <TagsList>
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Tag to={`/tags/${kebabCase(tag)}/`}>{tag}</Tag>
              </li>
            ))}
          </TagsList>
        </section>
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
        teamId
        author
        tags
      }
    }
  }
`;
