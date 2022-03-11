import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./notFound.css";
function NotFound() {
  const user_id = useSelector((state) => state.user_0);
  return (
    <>
      <div className="container-404">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The Page you are looking for doesn't exist or an other error occured.
          Go to{"  "}
          {user_id === "" ? (
            <a href="/">Login Page.</a>
          ) : (
            <a href="/users">Friend list.</a>
          )}
        </p>
      </div>
    </>
  );
}

export default NotFound;
