import React, { useState } from "react";
import RemoteImg from "../../assets/remote.webp";
type Props = {
  token: string;
};
const HomePage = (props: Props) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>Remote token: {props.token}</div>
      <img src={RemoteImg} width="100px" height="100px" alt="logo" />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count {count}</button>
      </div>
    </>
  );
};
export default HomePage;
