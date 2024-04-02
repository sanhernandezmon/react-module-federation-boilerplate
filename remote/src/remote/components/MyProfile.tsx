import { useState } from "react";
import { useAuthStore } from "../../auth/stores/AuthStore";
import React from "react";

const MyProfile = () => {
  const me = useAuthStore((state) => state.me);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [state] = useState("local state");
  return (
    <>
      <ul>
        <li> Email: {me?.email}</li>
        <li>Full Name: {me?.fullName}</li>
        <li>Has complete onboarding: {me?.hasCompletedOnboarding === true ? "Yes" : "No"}</li>
        <li>Token : {accessToken}</li>
      </ul>
      <div>{state}</div>
    </>
  );
};

export default MyProfile;
