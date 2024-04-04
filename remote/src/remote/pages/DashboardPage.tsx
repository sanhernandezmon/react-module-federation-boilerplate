import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardPage = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="my-profile">My profile</Link>
        </li>
        <li>
          <Link to="hello-world/messages">Hello World</Link>
        </li>
        <li>
          <Link to="user">Register user</Link>
        </li>
        <li>
          <Link to="users">User List</Link>
        </li>
        <li>
          <Link to="no-match">No Match</Link>
        </li>
      </ul>
    </nav>

    <hr />

    <Outlet />
  </div>
);

export default DashboardPage;
