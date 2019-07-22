import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import { sortBy, groupBy } from "lodash";
import styled from "styled-components";

import { formatDate, formatTime } from "../utils/dateTime";
import { withTeams } from "../utils/queries";
import { Team, Logo } from "./styles/Table";

const Heading = styled.h4`
  margin: 0;
  font-size: 0.9rem;
`;

const Section = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grayscale(0.2)};
  padding: 0.5rem 0;

  display: grid;
  grid-gap: 0.25rem;
  font-weight: 600;
`;

const Scoreboard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1rem;
  align-items: center;
`;

const Score = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

// const Team = styled.div``;

const Versus = styled.div`
  color: ${({ theme }) => theme.grayscale(0.5)};
  font-size: 0.8rem;
`;

const TimeLocation = styled.div`
  color: ${({ theme }) => theme.grayscale(0.5)};

  font-size: 0.8rem;
  text-align: center;
`;

const Final = styled.span`
  color: ${({ theme }) => theme.colors.green};
  text-transform: uppercase;
`;

const ScheduleLink = styled(Link)`
  border-radius: 0.25rem;
  display: block;
  background: ${({ theme }) => theme.grayscale(0.1)};
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.grayscale(0.6)};
  text-align: center;
  text-decoration: inherit;
  text-transform: uppercase;
  font-weight: 600;
  transition: background 100ms ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.grayscale(0.15)};
  }
`;

const Game = ({ date, location, home, away, hscore, ascore, teams }) => {
  const isFinal = typeof hscore === "number" && typeof ascore === "number";
  return (
    <>
      <Scoreboard>
        <Score>
          <Team>
            <Logo src={teams[home].logo.publicURL} />
            {teams[home].symbol}
          </Team>{" "}
          {typeof hscore === "number" ? hscore : "--"}
        </Score>
        <Versus>vs.</Versus>
        <Score>
          <Team>
            <Logo src={teams[away].logo.publicURL} />
            {teams[away].symbol}
          </Team>
          {typeof ascore === "number" ? ascore : "--"}
        </Score>
      </Scoreboard>
      <TimeLocation>
        <time>{formatTime(new Date(date))}</time> @ {location}{" "}
        {isFinal && (
          <span>
            &mdash; <Final>Final</Final>
          </span>
        )}
      </TimeLocation>
    </>
  );
};

const GamesByDay = ({ games, teams }) => (
  <>
    <Section>
      <Heading>
        <time>{formatDate(new Date(games[0].date))}</time>
      </Heading>
    </Section>
    {games.map(game => (
      <Section>
        <Game {...game} teams={teams} />
      </Section>
    ))}
  </>
);

const NoGames = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.grayscale(0.5)};
  text-align: center;
`;

const UpcomingGames = ({ data, schedulePath, teams }) => {
  if (data.length === 0)
    return (
      <>
        <NoGames>The are no recent or upcoming games.</NoGames>
        <ScheduleLink to={schedulePath}>Full Schedule &rarr;</ScheduleLink>
      </>
    );
  const gamesByDate = sortBy(
    groupBy(data, game => game.date.split("T")[0]),
    (obj, key) => key
  );

  return (
    <>
      {gamesByDate.map(games => (
        <GamesByDay games={games} teams={teams} />
      ))}
      <ScheduleLink to={schedulePath}>Full Schedule &rarr;</ScheduleLink>
    </>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query UpcomingGames {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "schedule" } } }
          sort: { fields: frontmatter___year, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                year
                games {
                  home
                  hscore
                  away
                  ascore
                  date
                  location
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const today = new Date();
      const lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      ).toISOString();
      const nextWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      ).toISOString();
      const sortedGames = sortBy(
        data.allMarkdownRemark.edges[0].node.frontmatter.games.filter(
          game => game.date > lastWeek && game.date < nextWeek
        ),
        "date"
      );

      return withTeams(UpcomingGames, {
        data: sortedGames,
        schedulePath: data.allMarkdownRemark.edges[0].node.fields.slug
      });
    }}
  />
);
