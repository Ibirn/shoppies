import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItem from "./ResultItem";

export default function ApiSearch(props) {
  //set default query to empty
  //http://www.omdbapi.com/?apikey=${REACT_APP_OMDB_KEY}&
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  // console.log(process.env);

  const dbSearch = (e) => {
    e.preventDefault();
    console.log();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`
      )
      .then((response) => setResults(response.data.Search));
  };

  return (
    <div>
      <form action="" method="get" className="form-example">
        <div className="form-example">
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
          {results.map((elem, ind) => (
            <ResultItem key={ind} info={elem} />
          ))}
        </div>
      </form>
    </div>
  );
}
