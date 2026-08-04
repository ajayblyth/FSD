import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>

      {/* ===============================
          Requirement 6

          If the user enters an invalid URL,
          this page will be displayed.
      =============================== */}

      <h1>404 - Page Not Found</h1>

      <p>
        Sorry! The page you are looking for does not exist.
      </p>

      {/* Requirement:
         Use Link instead of <a href>
      */}

      <Link to="/">
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFound;
