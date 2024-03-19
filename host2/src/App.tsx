import React from "react";
import Hello from "./components/Hello";
import World from "./components/World";
import "./App.css";
import logo from "./assets/logo.png"; // Tell webpack this JS file uses this image

type Props = {
  [key: string]: unknown;
};
const AppRemote = React.lazy(() => import("remote1/App"));

const App = (props: Props) => {
  console.log(props);
  console.log("From App.tsx");
    console.log(process.env.APP_SECRET);
    const token = "ey123";
  return (
    <>
      <div className="app">App!!</div>
      <img src={logo} width="100px" height="100px" alt="logo" />
      <img src={logo} width="100px" height="100px" alt="logo" />
      <img src={logo} width="100px" height="100px" alt="logo" />
      <Hello name={"as"} />
      <World />
      ===================================================
      <AppRemote token={token} />
    </>
  );
};

export default App;
