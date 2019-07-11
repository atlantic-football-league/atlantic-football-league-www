import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { sortBy, groupBy } from "lodash";
import styled from "styled-components";

const formatDate = date =>
  new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);

const formatTime = date =>
  new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "numeric"
  }).format(date);

const Final = styled.span`
  color: ${({ theme }) => theme.colors.green};
`;

const Section = styled.div`
  border-bottom: 1px solid black;
`;

const TimeLocation = styled.div`
  color: ${({ theme }) => theme.grayscale(0.5)};
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
`;

const Game = ({ date, location, home, away, hscore, ascore }) => {
  const isFinal = typeof hscore === "number" && typeof ascore === "number";
  return (
    <div>
      <div>
        {home} {hscore} vs. {away} {ascore}
      </div>
      <TimeLocation>
        <time>{formatTime(new Date(date))}</time> @ {location}{" "}
        {isFinal && (
          <span>
            &mdash; <Final>Final</Final>
          </span>
        )}
      </TimeLocation>
    </div>
  );
};

const GamesByDay = ({ games }) => (
  <>
    <Section>{formatDate(new Date(games[0].date))}</Section>
    <Section>
      {games.map(game => (
        <Game {...game} />
      ))}
    </Section>
  </>
);

const NoGames = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.grayscale(0.5)};
  text-align: center;
`;

const UpcomingGames = ({ data }) => {
  if (data.length === 0)
    return <NoGames>The are no recent or upcoming games.</NoGames>;
  const gamesByDate = sortBy(
    groupBy(data, game => game.date.split("T")[0]),
    (obj, key) => key
  );

  return (
    <div>
      {/* <pre>{JSON.stringify(gamesByDate, null, 2)}</pre> */}
      {gamesByDate.map(games => (
        <GamesByDay games={games} />
      ))}
    </div>
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
        today.getDate() + 80
      ).toISOString();
      const sortedGames = sortBy(
        data.allMarkdownRemark.edges[0].node.frontmatter.games.filter(
          game => game.date > lastWeek && game.date < nextWeek
        ),
        "date"
      );

      return <UpcomingGames data={sortedGames} />;
    }}
  />
);
