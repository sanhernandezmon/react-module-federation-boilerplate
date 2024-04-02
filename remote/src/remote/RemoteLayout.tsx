import React, { useEffect } from "react";
import "./RemoteLayout.css";
import { useAuthStore } from "../auth/stores/AuthStore";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NoMatchPage from "./pages/NoMatchPage";
import HomePage from "./pages/HomePage";

type Props = {
  token: string;
};

const MyProfile = React.lazy(() => import("./components/MyProfile"));
const HelloWorldPage = React.lazy(() => import("./pages/HelloWorldPage"));

const RemoteLayout = (props: Props) => {
  const setMe = useAuthStore((state) => state.setMe);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/remote" replace={true} />} />
            <Route path="remote" element={<DashboardPage />}>
              <Route index element={<HomePage token={props.token} />} />
              <Route
                path="hello-world/*"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <HelloWorldPage />
                  </React.Suspense>
                }
              />
              <Route
                path="my-profile"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <MyProfile />
                  </React.Suspense>
                }
              />
              <Route path="*" element={<NoMatchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default RemoteLayout;
