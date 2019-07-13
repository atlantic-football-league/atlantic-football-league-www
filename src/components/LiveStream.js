import React from "react";
import styled from "styled-components";
import Panel from "./Panel";

import banner from "../img/webcast-banner.jpg";

const ExternalLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer"
})`
  color: inherit;
  text-decoration: inherit;

  & > * {
    filter: saturate(0.7);

    &:hover {
      filter: saturate(1);
    }
  }
`;

const LiveStreamPanel = styled(Panel)`
  padding: 0;
  overflow: hidden;
`;

const Heading = styled.h2`
  background: ${({ theme }) => theme.colors.green};
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
`;

const Banner = styled.img.attrs({
  src: banner,
  alt: "Atlantic Football Leagure Live web cast - watch now on FibreOp tv1"
})`
  width: 100%;
`;

const LiveStream = () => {
  return (
    <ExternalLink href="https://player.communitylive.ca/Player/GetEvent/4489">
      <LiveStreamPanel>
        <Heading>Live Webcast</Heading>
        <Banner />
      </LiveStreamPanel>
    </ExternalLink>
  );
};

export default LiveStream;
