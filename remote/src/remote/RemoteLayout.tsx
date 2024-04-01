import React, { useEffect, useState } from "react";
import Hello from "../components/Hello";
import World from "../components/World";
import "./RemoteLayout.css";
import RemoteImg from "../assets/remote.webp";
import { useAuthStore } from "../auth/stores/AuthStore";
import { MyProfile } from "./components/MyProfile";

type Props = {
  token: string;
};

const RemoteLayout = (props: Props) => {
  const setMe = useAuthStore((state) => state.setMe);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("From remote", props);
    setMe({
      fullName: "John Doe",
      email: "jdoe@acme.com",
      hasCompletedOnboarding: false,
    });
    setAccessToken(props.token);
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
        <MyProfile />
      </div>
    </>
  );
};

export default RemoteLayout;
