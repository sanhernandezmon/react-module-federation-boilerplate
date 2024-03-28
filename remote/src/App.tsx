import React from "react";
import "./App.css";
import RemoteLayout from "./RemoteLayout"; // Tell webpack this JS file uses this image

const App = () => {
  return (
    <>
      <RemoteLayout token={"tokenToDev"} />
    </>
  );
};

export default App;
