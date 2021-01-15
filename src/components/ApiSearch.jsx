import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItems from "./ResultItems";
import Selections from "./Selections";
import Banner from "./Banner";
import "../styles/mainStyle.scss";

export default function ApiSearch(props) {
  //set default query to empty
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [banner, setBanner] = useState(false);

  //query OMDB, search restricted to movies.
  const dbSearch = (e) => {
    e.preventDefault();
    if (query === "") {
      setResults([]);
    } else {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}&type=movie`
        )
        .then((response) => setResults(response.data.Search))
        .catch((err) => console.log(err));
    }
  };

  //remove shoppies banner on click
  const dismissBanner = () => {
    setBanner(false);
  };

  useEffect(() => {
    if (nominations.length >= 5) {
      setBanner(true);
      document.addEventListener("click", dismissBanner);
    }
  }, [nominations]);

  return (
    <div className="container">
      {banner ? <Banner /> : null}
      <form method="get" className="search-form">
        <div>
          <label>Search OMDB: </label>
          <input
            type="search"
            placeholder="Search"
            results="0"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            required
          ></input>
          <button onClick={(e) => dbSearch(e)}>Search</button>
        </div>
      </form>
      <div className="lists">
        <header>
          <h4>
            <i class="fas fa-search"></i> Results
          </h4>
          <h4>
            <i class="fas fa-trophy"></i> Nominations
          </h4>
        </header>
        <div className="results-list">
          {results.map((elem, ind) => (
            <ResultItems
              key={ind}
              index={ind}
              info={elem}
              setNominations={setNominations}
              nominations={nominations}
            />
          ))}
        </div>
        <div className="nominations">
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
