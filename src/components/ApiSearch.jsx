import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItems from "./ResultItems";
import useDragAndDrop from "../hooks/useDragAndDrop";
import Selections from "./Selections";
import "../styles/mainStyle.scss";

export default function ApiSearch(props) {
  //set default query to empty
  //http://www.omdbapi.com/?apikey=${REACT_APP_OMDB_KEY}&
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { nominations, setNominations } = useDragAndDrop({
    results,
    setResults,
  });
  //query OMDB, search restricted to movies.
  const dbSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}&type=movie`
      )
      .then((response) => setResults(response.data.Search));
  };
  console.log("RESULTS: ", results);

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
            <ResultItems key={ind} info={elem} />
          ))}
        </div>
        <div className="nominations">
          <Selections choices={nominations} />
        </div>
      </div>
    </div>
  );
}
