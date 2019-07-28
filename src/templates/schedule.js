import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { H1, H2 } from "../components/styles/Text";

import {
  Table,
  THead,
  TBody,
  Row,
  Heading,
  Cell,
  Team,
  Logo
} from "../components/styles/Table";
import { formatDate, formatTime } from "../utils/dateTime";
import Standings from "../components/Standings";

const Score = styled.div`
  text-align: right;
  font-weight: ${({ win }) => (win ? 600 : 400)};
  color: ${({ win, theme }) => (win ? theme.colors.green : "inherit")};
`;

const PreviousYears = styled.div`
  margin: 1rem 0;
`;

const TableHeader = () => (
  <THead>
    <Row>
      <Heading>Away</Heading>
      <Heading style={{ textAlign: "right" }}>A. Score</Heading>
      <Heading>Home</Heading>
      <Heading style={{ textAlign: "right" }}>H. Score</Heading>
      <Heading>Date</Heading>
      <Heading>Time/Location</Heading>
    </Row>
  </THead>
);

const Game = ({ away, ascore, home, hscore, date, location, teams }) => {
  const awayTeam = away ? teams[away] : undefined;
  const homeTeam = home ? teams[home] : undefined;
  return (
    <Row>
      <Cell>
        {awayTeam ? (
          <Team>
            <Logo src={awayTeam.logo.publicURL} />
            {awayTeam.title}
          </Team>
        ) : (
          "--"
        )}
      </Cell>
      <Cell>
        <Score win={hscore < ascore}>
          {typeof ascore === "number" ? ascore : "--"}
        </Score>
      </Cell>
      <Cell>
        {homeTeam ? (
          <Team>
            <Logo src={homeTeam.logo.publicURL} />
            {homeTeam.title}
          </Team>
        ) : (
          "--"
        )}
      </Cell>
      <Cell>
        <Score win={hscore > ascore}>
          {typeof hscore === "number" ? hscore : "--"}
        </Score>
      </Cell>
      <Cell>
        <time>
          {formatDate(new Date(date), { month: "short", weekday: "short" })}
        </time>
      </Cell>
      <Cell>
        <time>{formatTime(new Date(date))}</time> @ {location}
      </Cell>
    </Row>
  );
};

// export const Years = () => (
//   <StaticQuery
//     query={graphql`
//       query Years {
//         allMarkdownRemark(
//           filter: { frontmatter: { templateKey: { eq: "schedule" } } }
//           sort: { fields: frontmatter___year, order: DESC }
//         ) {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 year
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={staticData => {
//       const years = staticData.allMarkdownRemark.edges.map(({ node }) => ({
//         ...node.frontmatter,
//         ...node.fields
//       }));
//       return (
//         <PreviousYears>
//           Previous Years:{" "}
//           {years.map(({ year, slug }) => (
//             <Link to={slug}>{year}</Link>
//           ))}
//         </PreviousYears>
//       );
//     }}
//   />
// );

export const ScheduleTemplate = ({ games, teams }) => {
  return (
    <>
      <H1>Schedule</H1>
      {/* <Years /> */}
      <Panel style={{ overflowX: "auto" }}>
        <Table>
          <TableHeader />
          <TBody>
            {games.map(game => (
              <Game key={game.id} {...game} teams={teams} />
            ))}
          </TBody>
        </Table>
      </Panel>

      <H2>Standings</H2>
      <Panel style={{ overflowX: "auto" }}>
        <Standings />
      </Panel>
    </>
  );
};

const Schedule = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark: teams } = data;
  const teamsObj = {};

  teams.edges.forEach(team => {
    teamsObj[team.node.frontmatter.uid] = team.node.frontmatter;
  });

  return (
    <Layout noSidebar>
      <Helmet
        title={`${post.frontmatter.year} Schedule | Atlantic Football League`}
      />
      <ScheduleTemplate {...post.frontmatter} teams={teamsObj} />
    </Layout>
  );
};

export default Schedule;

export const pageQuery = graphql`
  query ScheduleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        year
        games {
          home
          hscore
          away
          ascore
          date
          location
          postSeason
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { team: { in: true } } }) {
      edges {
        node {
          frontmatter {
            title
            logo {
              publicURL
            }
            uid
          }
        }
      }
    }
  }
`;
