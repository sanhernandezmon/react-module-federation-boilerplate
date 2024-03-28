import React, { useEffect } from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./RemoteLayout.css";
import logo from "./assets/logo.png"; // Tell webpack this JS file uses this image
import RemoteImg from './assets/remote.webp'

type Props = {
  token: string;
};

const RemoteLayout = (props: Props) => {
  useEffect(() => {
    console.log("From remote", props);
  }, []);
  return (
    <>
      <div className="remote-app">
        <div className="remote-app">Remote HR token: {props.token}</div>
        <img src={RemoteImg} width="100px" height="100px" alt="logo" />
        <Hello />
        <World />
      </div>
    </>
  );
};

export default RemoteLayout;
