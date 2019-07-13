import React from "react";
import { graphql, StaticQuery } from "gatsby";

export const withTeams = (Component, props) => (
  <StaticQuery
    query={graphql`
      query WithTeams {
        allMarkdownRemark(filter: { frontmatter: { team: { in: true } } }) {
          edges {
            node {
              frontmatter {
                title
                website
                logo {
                  publicURL
                }
                uid
                symbol
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
      return <Component teams={teamsObj} {...props} />;
    }}
  />
);
