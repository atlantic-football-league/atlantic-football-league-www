import React from "react";
import { H2 } from "./styles/Text";
import Panel from "./Panel";
import LiveStream from "./LiveStream";
import Standings from "./Standings";
import UpcomingGames from "./UpcomingGames";

const Sidebar = () => (
  <aside>
    <LiveStream />
    <H2>Standings</H2>
    <Panel>
      <Standings />
    </Panel>
    <H2>Games</H2>
    <Panel>
      <UpcomingGames />
    </Panel>
  </aside>
);

export default Sidebar;
