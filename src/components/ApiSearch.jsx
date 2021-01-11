import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItem from "./ResultItem";
import useDragAndDrop from "../hooks/useDragAndDrop";

export default function ApiSearch(props) {
  //set default query to empty
  //http://www.omdbapi.com/?apikey=${REACT_APP_OMDB_KEY}&
  let data = "bepid";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { nominations, setNominations } = useDragAndDrop(query);

  // console.log(process.env);

  //query OMDB, search restricted to movies.
  const dbSearch = (e) => {
    e.preventDefault();
    console.log();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}&type=movie`
      )
      .then((response) => setResults(response.data.Search));
  };

  return (
    <div>
      <form action="" method="get" className="form-example">
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
          <div className="results-list">
            {results.map((elem, ind) => (
              <ResultItem key={ind} info={elem} />
            ))}
          </div>
          <div className="nominations">
            <div draggable={true} className="slot">
              Bmanmans
            </div>
            <div draggable={true} className="slot">
              Spidermans
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
