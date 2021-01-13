import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItems from "./ResultItems";
import Selections from "./Selections";
import "../styles/mainStyle.scss";

export default function ApiSearch(props) {
  //set default query to empty

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  //query OMDB, search restricted to movies.
  const dbSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}&type=movie`
      )
      .then((response) => setResults(response.data.Search));
  };

  return (
    <div className="container">
      <form method="get" className="search-form">
        <div className="search-form">
          <label>Search OMDB: </label>
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            required
          ></input>
          <button onClick={(e) => dbSearch(e)}>Search</button>
        </div>
      </form>
      <div className="container lists">
        <div className="results-list">
          {results.map((elem, ind) => (
            <ResultItems
              key={ind}
              index={ind}
              info={elem}
              setNominations={setNominations}
            />
          ))}
        </div>
        <div className="nominations" id="drop-zone">
          {nominations.length > 0
            ? nominations.map((elem, ind) => (
                <Selections
                  key={ind}
                  index={ind}
                  choice={elem}
                  setNominations={setNominations}
                  nominations={nominations}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
