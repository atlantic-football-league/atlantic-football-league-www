import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import { Logo } from "./styles/Table";

const Tag = styled.div`
  background: ${({ color }) => color || "lightgray"};
  color: ${({ textColor }) => textColor || "black"};
  display: inline-flex;
  padding: 0.25em 0.5em;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 3px;
  align-items: center;
  margin-left: 0.5rem;
`;

const TagLogo = styled(Logo)`
  max-height: 1.5rem;
  margin: -0.5rem 0.25rem -0.5rem -1rem;
  filter: drop-shadow(1px 2px 0px white) drop-shadow(1px -2px 0px white);
`;

const TeamTag = ({ title, logo, color, textColor }) => (
  <div>
    <Tag color={color} textColor={textColor}>
      <TagLogo src={logo.publicURL} />
      {title}
    </Tag>
  </div>
);

export default ({ teamId }) => (
  <StaticQuery
    query={graphql`
      query TeamTags {
        allMarkdownRemark(filter: { frontmatter: { team: { in: true } } }) {
          edges {
            node {
              frontmatter {
                title
                logo {
                  publicURL
                }
                color
                textColor
                uid
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { allMarkdownRemark: teams } = data;
      const teamsObj = {};

      teams.edges.forEach(team => {
        teamsObj[team.node.frontmatter.uid] = team.node.frontmatter;
      });
      return <TeamTag {...teamsObj[teamId]} />;
    }}
  />
);
