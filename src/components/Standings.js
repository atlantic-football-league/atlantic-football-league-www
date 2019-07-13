import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { orderBy } from "lodash";
import styled from "styled-components";
import { withTeams } from "../utils/queries";

import {
  Table,
  THead,
  TBody,
  Row,
  Heading as THeading,
  Cell as TCell,
  Logo,
  Team
} from "./styles/Table";

const Cell = styled(TCell)`
  text-align: right;
`;

const Heading = styled(THeading)`
  text-align: right;
`;

const getStandings = data => {
  const games = data.allMarkdownRemark.edges[0].node.frontmatter.games.filter(
    game => !game.postSeason
  );

  const initTeam = {
    gp: 0,
    w: 0,
    l: 0,
    pf: 0,
    pa: 0,
    t: 0,
    pts: 0,
    wPercent: 0
  };

  const standings = games.reduce((teams, game) => {
    const homeTeam = teams[game.home] || { ...initTeam, team: game.home };
    const awayTeam = teams[game.away] || { ...initTeam, team: game.away };
    if (typeof game.hscore === "number" && typeof game.ascore === "number") {
      // Add game
      homeTeam.gp++;
      awayTeam.gp++;

      // Add win/loss/tie
      if (game.hscore > game.ascore) {
        homeTeam.w++;
        homeTeam.pts += 2;
        awayTeam.l++;
      } else if (game.hscore < game.ascore) {
        homeTeam.l++;
        awayTeam.w++;
        awayTeam.pts += 2;
      } else if (game.hscore === game.ascore) {
        homeTeam.t++;
        homeTeam.pts += 1;
        awayTeam.t++;
        awayTeam.pts += 1;
      }

      // Add points for
      homeTeam.pf += game.hscore;
      awayTeam.pf += game.ascore;

      // Add points against
      homeTeam.pa += game.ascore;
      awayTeam.pa += game.hscore;

      // Calc win %
      homeTeam.wPercent = homeTeam.w / homeTeam.gp;
      awayTeam.wPercent = awayTeam.w / awayTeam.gp;
    }
    return {
      ...teams,
      [game.home]: homeTeam,
      [game.away]: awayTeam
    };
  }, {});

  return orderBy(
    standings,
    ["pts", "w", "gp", "pf", "pa"],
    ["desc", "desc", "asc", "desc", "asc"]
  );
};

const Standings = ({ data, teams }) => (
  <Table>
    <THead>
      <Row>
        <THeading>Team</THeading>
        <Heading>GP</Heading>
        <Heading>W</Heading>
        <Heading>L</Heading>
        <Heading>PF</Heading>
        <Heading>PA</Heading>
        <Heading>Pts</Heading>
        <Heading>W%</Heading>
      </Row>
    </THead>
    <TBody>
      {data.map(({ team, gp, w, l, pf, pa, pts, wPercent }) => (
        <Row key={team}>
          <TCell>
            <Team>
              <Logo src={teams[team].logo.publicURL} />
              <strong>{teams[team].symbol}</strong>
            </Team>
          </TCell>
          <Cell>{gp}</Cell>
          <Cell>{w}</Cell>
          <Cell>{l}</Cell>
          <Cell>{pf}</Cell>
          <Cell>{pa}</Cell>
          <Cell style={{ fontWeight: 600 }}>{pts}</Cell>
          <Cell>{wPercent.toFixed(3)}</Cell>
        </Row>
      ))}
    </TBody>
  </Table>
);

export default () => (
  <StaticQuery
    query={graphql`
      query Schedules {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "schedule" } } }
          sort: { fields: frontmatter___year, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              frontmatter {
                year
                games {
                  home
                  hscore
                  away
                  ascore
                  postSeason
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const standingsData = getStandings(data);
      return withTeams(Standings, { data: standingsData });
    }}
  />
);
