import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Panel from "../components/Panel";

const Table = styled.table`
  width: 100%;
  font-size: 0.9rem;
`;

const Row = styled.tr`
  vertical-align: center;
`;

const Cell = styled.td``;
const Team = styled.div`
  display: grid;
  align-items: center;
  justify-content: start;
  grid-auto-flow: column;
  grid-gap: 0.25rem;
`;

const Logo = styled.img.attrs({ alt: "" })`
  max-height: 1.25rem;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;
const Heading = styled.th`
  text-align: left;
`;

const TableHeader = () => (
  <THead>
    <Row>
      <Heading>Away</Heading>
      <Heading>Score</Heading>
      <Heading>Home</Heading>
      <Heading>Score</Heading>
      <Heading>Date</Heading>
      <Heading>Time/Location</Heading>
    </Row>
  </THead>
);

const Game = ({ away, ascore, home, hscore, date, location, teams }) => {
  const [dateOnly, time] = date.split("~");
  const awayTeam = teams[away];
  const homeTeam = teams[home];
  return (
    <Row>
      <Cell>
        <Team>
          <Logo src={awayTeam.logo.publicURL} />
          {awayTeam.title}
        </Team>
      </Cell>
      <Cell>{typeof ascore === "number" ? ascore : "--"}</Cell>
      <Cell>
        <Team>
          <Logo src={awayTeam.logo.publicURL} />
          {homeTeam.title}
        </Team>
      </Cell>
      <Cell>{typeof hscore === "number" ? hscore : "--"}</Cell>
      <Cell>{dateOnly}</Cell>
      <Cell>
        {time} @ {location}
      </Cell>
    </Row>
  );
};

export const ScheduleTemplate = ({ games, teams }) => {
  return (
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
  );
};

const Schedule = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark: teams } = data;
  const teamsObj = {};

  teams.edges.forEach(team => {
    teamsObj[team.node.frontmatter.symbol] = team.node.frontmatter;
  });

  return (
    <Layout noSidebar>
      <ScheduleTemplate
        helmet={
          <Helmet titleTemplate="%s | News">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        {...post.frontmatter}
        teams={teamsObj}
      />
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
          date(formatString: "ddd, DD MMM~h:mm A")
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
            symbol
          }
        }
      }
    }
  }
`;
