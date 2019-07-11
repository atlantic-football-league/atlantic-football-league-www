import React from "react";
import { H2 } from "./styles/Text";
import Panel from "./Panel";
import Standings from "./Standings";
import UpcomingGames from "./UpcomingGames";

const Sidebar = () => (
  <aside>
    {/* <LiveSteam /> */}
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
