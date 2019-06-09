import React from "react";
import { Link } from "gatsby";

import logo from "../img/afl-logo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <img width="30px" style={{ backgroundColor: "gray" }} src={logo} />
        Footer
      </footer>
    );
  }
};

export default Footer;
