import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>

      {/* ===========================
          Navigation Bar

          Requirement 3:
          Use <Link> for navigation.
          Never use <a href>.
      ============================ */}

      <nav
        style={{
          padding: "15px",
          backgroundColor: "#1976d2",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/notes"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Notes
        </Link>

        <Link
          to="/add"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Add Note
        </Link>
      </nav>

      {/* ===========================
          Outlet

          Requirement 1:
          Navbar should appear on every page.

          Outlet displays whichever child
          route is currently active.
      ============================ */}

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;