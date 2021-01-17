import React from "react";
import "../styles/resultStyle.scss";

export default function ResultItem({
  info,
  index,
  setNominations,
  nominations,
}) {
  let disableButton = false;

  //necessary to ensure buttons are disabled if a movie is on a list from cookie
  const cookieHandler = () => {
    for (const key of nominations) {
      if (key.imdbID === info.imdbID) {
        return true;
      }
    }
  };

  //prevent more than 5 nominations or the same movie being nominated multiple times.
  if (nominations.includes(info) || nominations.length >= 5) {
    disableButton = true;
  }

  return (
    <div className="search-result" id={`${index}-result`}>
      <div className="item">
        <img src={info.Poster} alt={`${info.Title}-poster`}></img>
        <div className="title">{info.Title}</div>
        <div className="year">{info.Year}</div>
        <button
          disabled={(disableButton ? true : false) || cookieHandler()}
          className={`add-button`}
          onClick={() => setNominations((prev) => [info, ...prev])}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
