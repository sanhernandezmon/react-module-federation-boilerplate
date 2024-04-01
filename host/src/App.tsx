import React, { Suspense, useEffect, useState } from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./App.css";
import HostImg from "./assets/host.jpg";

const RemoteLayout = React.lazy(() => import("remote/RemoteLayout"));

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
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("From App.tsx : APP_BUILD_MODE", process.env.APP_BUILD_MODE);
  }, []);

  return (
    <>
      <div className="app">Host</div>
      <img src={HostImg} width="100px" height="100px" alt="logo" />
      <Hello name={"as"} />
      <World />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count {count}</button>
      </div>
      ============================================= Begin Remote  ===============================================
      <Suspense fallback={<Timer waitingFor={"remote"} />}>
        <RemoteLayout token={"ej12345"} />
      </Suspense>
    </>
  );
};

export default App;
