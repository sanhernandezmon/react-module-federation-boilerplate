import React from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./App.css";
import logo from "./assets/logo.png"; // Tell webpack this JS file uses this image

type Props = {
  token: string;
};

const AppRemote = (props: Props) => {
  console.log(props);
  console.log("From remote");

  return (
    <>
      <div className="app">Remote HR token: {props.token}</div>
      <img src={logo} width="100px" height="100px" alt="logo" />
      <img src={logo} width="100px" height="100px" alt="logo" />
      <img src={logo} width="100px" height="100px" alt="logo" />

      <Hello />
      <World />
    </>
  );
};

export default AppRemote;
