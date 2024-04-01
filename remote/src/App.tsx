import React from "react";
import "./App.css";
import RemoteLayout from "./remote/RemoteLayout";

const App = () => {
  return (
    <>
      <RemoteLayout token={"tokenToDev"} />
    </>
  );
};

export default App;
