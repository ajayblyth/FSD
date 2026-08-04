import React, { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

const UseEffect_Ex1 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const fetchUsersData = async (apiUrl) => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();
      setUsers(data);
      setIsError({ status: false, msg: "" });
    } catch (error) {
      setIsError({
        status: true,
        msg: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData(URL);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isError.status) {
    return <h2>Something went wrong: {isError.msg}</h2>;
  }

  return (
    <div>
      <h1>UseEffect_Ex1</h1>

      <ul>
        {users.map((eachUser) => {
          const { id, name, email } = eachUser;

          return (
            <li key={id}>
              <div>{name}</div>
              <div>{email}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UseEffect_Ex1;