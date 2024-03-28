import React, { Suspense, useEffect, useState } from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./App.css";
import logo from "./assets/logo.png";
import HostImg from "./assets/host.jpg";

const RemoteLayout = React.lazy(() => import("remote1/RemoteLayout"));

export const Timer = ({ waitingFor = "unknown" }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time === 5) {
    throw new Error("Could not load: " + waitingFor);
  }

  return <div>Loading{[...Array(time)].map(() => ".")}</div>;
};

const App = () => {
  useEffect(() => {
    console.log("From App.tsx : APP_ENV", process.env.APP_ENV);
  }, []);

  return (
    <>
      <div className="app">App 1</div>
      <img src={HostImg} width="100px" height="100px" alt="logo" />
      <Hello name={"as"} />
      <World />
      =================================================== Begin Remote
      <Suspense fallback={<Timer waitingFor={"remote"} />}>
        <RemoteLayout token={"ej12345"} />
      </Suspense>
    </>
  );
};

export default App;
