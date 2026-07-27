import React, { useEffect, useState } from "react";

const URL = "https://rickandmortyapi.com/api/character";

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const fetchCharacters = async () => {
    setLoading(true);

    try {
      console.log("Fetching characters..."); // proves useEffect runs once

      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();

      setCharacters(data.results);
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

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isError.status) {
    return <h2>Error: {isError.msg}</h2>;
  }

  return (
    <div>
      <h2>Rick and Morty Characters</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Origin</th>
          </tr>
        </thead>

        <tbody>
          {characters.map((character) => {
            return (
              <tr key={character.id}>
                <td>
                  <img
                    src={character.image}
                    alt={character.name}
                    width="70"
                  />
                </td>

                <td>{character.name}</td>

                <td>{character.status}</td>

                <td>{character.species}</td>

                <td>{character.gender}</td>

                <td>{character.origin.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;