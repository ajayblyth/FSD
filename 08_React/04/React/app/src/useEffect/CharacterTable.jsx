import React, { useEffect, useState } from "react";

const URL = "https://rickandmortyapi.com/api/character";

const CharacterTable = () => {
  //state vairables
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
       // response is a promise, we need to await it to get the actual response object
//response objet has a property called ok, which is true if the response status is in the range 200-299, and false otherwise
      if (!response.ok) {
        throw new Error("Request Failed!");
      }

      const data = await response.json();

      setCharacters(data.results); 
      //API retyurns an object with a results property that contains the array of characters, we only need that
      
      
      setIsError({
        status: false,
        msg: "",
      });

//suppose the previous request failed and error status was true, but this one succeeds, we need to reset the error state
// to false and clear the error message


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
    //Every React component must return JSX (or null).
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
  const { id, image, name, status, species, gender, origin } = character;

  return (
    <tr key={id}>

      {/* Why key={id}?React needs a unique identifier for every item rendered from a list. */}
      
      <td>
        <img src={image} alt={name} width="70" />
      </td>


      <td>{name}</td>
      <td>{status}</td>
      <td>{species}</td>
      <td>{gender}</td>
      <td>{origin.name}</td>
    </tr>
  );
})
}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;