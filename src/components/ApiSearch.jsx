import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultItems from "./ResultItems";
import Selections from "./Selections";
import Banner from "./Banner";
import ApiError from "./ApiError";
import "../styles/mainStyle.scss";
import { useCookies } from "react-cookie";

export default function ApiSearch(props) {
  //set defaults to empty
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [banner, setBanner] = useState(false);
  const [cookies, setCookie] = useCookies(["nominations"]);
  const [error, setError] = useState(false);

  //a very simple cookie to remember nominations
  useEffect(() => {
    if (cookies.nominations) {
      setNominations([...cookies.nominations]);
    }
  }, []);

  //query OMDB, search restricted to movies.
  const dbSearch = (e) => {
    //prevent an empty query from causing problems
    e.preventDefault();
    if (query === "") {
      setError(true);
      setResults([]);
    } else {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}&type=movie`
        )
        .then((response) => {
          if (response.data.Search !== undefined) {
            setResults(response.data.Search);
            setError(false);
          } else {
            setError(true);
            setResults([]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //remove shoppies banner on click
  const dismissBanner = () => {
    setBanner(false);
  };

  //listen for and load banner on 5 nominations
  useEffect(() => {
    if (nominations.length === 5) {
      setBanner(true);
      document.addEventListener("click", dismissBanner);
    }
    return () => {
      document.removeEventListener("click", dismissBanner);
    };
  }, [nominations]);

  useEffect(() => {
    if (query) {
      setError(false);
    }
  }, [query]);

  return (
    <div className="container">
      {banner ? <Banner /> : null}
      <header>
        <div className="stripe-container">
          <div className="red"></div>
          <div className="green"></div>
          <div className="blue"></div>
        </div>
        <div className="search-wrapper">
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
              <button className="search-button" onClick={(e) => dbSearch(e)}>
                Search
              </button>
            </div>
          </form>
          <button
            onClick={() =>
              setCookie("nominations", JSON.stringify(nominations), {
                path: "/",
              })
            }
          >
            Save
          </button>
        </div>
        <div className="stripe-container">
          <div className="red"></div>
          <div className="green"></div>
          <div className="blue"></div>
        </div>
      </header>
      <div className="lists">
        <div className="results-list">
          <h4>
            <i className="fas fa-search"></i> Results
          </h4>
          {error ? <ApiError /> : null}
          <div>
            {results.map((elem, ind) => (
              <ResultItems
                key={ind}
                index={ind}
                info={elem}
                setNominations={setNominations}
                nominations={nominations}
                results={results}
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
