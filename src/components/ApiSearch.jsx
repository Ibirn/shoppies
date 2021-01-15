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
    if (nominations.length === 5) {
      setBanner(true);
      document.addEventListener("click", dismissBanner);
    }
    return () => {
      document.removeEventListener("click", dismissBanner);
    };
  }, [nominations]);

  return (
    <div className="container">
      {banner ? <Banner /> : null}
      <header className="search-wrapper">
        <h3>
          <i className="fas fa-film"></i> The Shoppies{" "}
          <i className="fas fa-film"></i>
        </h3>
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
      </header>
      <div className="lists">
        <div className="results-list">
          <h4>
            <i className="fas fa-search"></i> Results
          </h4>
          <div>
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
        </div>
        <hr />
        <div className="nominations">
          <h4>
            <i className="fas fa-trophy"></i> Nominations
          </h4>
          <div>
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
    </div>
  );
}
