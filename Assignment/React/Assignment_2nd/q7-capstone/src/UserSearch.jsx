import { useCallback, useEffect, useMemo, useState } from "react";
import UserCard from "./UserCard";

const URL = "https://jsonplaceholder.typicode.com/users";

function UserSearch() {
  // ==========================
  // State
  // ==========================
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  // ==========================
  // Fetch Users
  // ==========================
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();

      setUsers(data);

      setIsError({
        status: false,
        msg: "",
      });
    } catch (error) {
      setIsError({
        status: true,
        msg: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // useEffect
  // ==========================
  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // Filter Users
  // ==========================
  const filteredUsers = useMemo(() => {
    console.log("Filtering Users...");

    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Without useMemo, filtering runs on every render,
  // even when selecting a user.

  // ==========================
  // Select User
  // ==========================
  const handleSelect = useCallback((id) => {
    setSelectedUserId(id);
  }, []);

  // Without useCallback, a new function is created on
  // every render, causing all React.memo UserCards
  // to re-render.

  // ==========================
  // JSX
  // ==========================
  return (
    <div style={{ padding: "20px" }}>
      <h2>User Search</h2>

      <input
        type="text"
        placeholder="Search User..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <h3>Loading...</h3>}

      {isError.status && <h3>{isError.msg}</h3>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            selected={selectedUserId === user.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default UserSearch;