import React, { useEffect, useState } from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./RemoteLayout.css";
import RemoteImg from "./assets/remote.webp";

type Props = {
  token: string;
};

const RemoteLayout = (props: Props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("From remote", props);
  }, []);
  return (
    <>
      <div className="remote-app">
        <div className="remote-app">Remote token: {props.token}</div>
        <img src={RemoteImg} width="100px" height="100px" alt="logo" />
        <Hello />
        <World />
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count {count}</button>
        </div>
      </div>
    </>
  );
};

export default RemoteLayout;
