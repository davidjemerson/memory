import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav>
    <ul>
      <li className="">
        {props.title}
      </li>

      <li id="rw">{props.message}</li>

      <li id="cur-sco">Current Score: {props.score}</li>

      <li id="top-sco">Top Score: {props.topScore}</li>
    </ul>
  </nav>
);

export default Nav;