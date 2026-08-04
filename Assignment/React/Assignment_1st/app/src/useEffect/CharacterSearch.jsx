import React, { useEffect, useState } from "react";

const URL = "https://rickandmortyapi.com/api/character/?name=";

const CharacterSearch = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [noResults, setNoResults] = useState(false);


  const fetchCharacters = async () => {
    setLoading(true);

    try {
      console.log("Searching:", searchTerm);

      const response = await fetch(URL + searchTerm);

      if (response.status === 404) {
        setCharacters([]);
        setNoResults(true);

        setIsError({
          status: false,
          msg: "",
        });

        return;
      }

      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();

      setCharacters(data.results);
      setNoResults(false);

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
    if (searchTerm.trim() === "") {
      setCharacters([]);
      setNoResults(false);

      setIsError({
        status: false,
        msg: "",
      });

      return;
    }

    // delay API call by 500ms
    const timer = setTimeout(() => {
      fetchCharacters();
    }, 500);

    // Cleanup previous timer
    return () => clearTimeout(timer);
  }, [searchTerm]);


  
  return (
    <div>
      <h2>Search Characters</h2>

      <input type="text" placeholder="Search character... " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {loading && <h3>Loading...</h3>}

      {isError.status && <h3>Error: {isError.msg}</h3>}

      {noResults && <h3>No Results Found</h3>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {characters.map((character) => {
          const {id,  image, name, status,  species,  gender,   location, } = character;

          return (
            <div  key={id}
              style={{
                border: "1px solid black",
                padding: "10px",
                width: "220px",
              }}  >
              <img src={image} alt={name} width="150" />

              <h3>{name}</h3>
              <p>Status: {status}</p>
              <p>Species: {species}</p>
              <p>Gender: {gender}</p>
              <p>Last Known Location: {location.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSearch;