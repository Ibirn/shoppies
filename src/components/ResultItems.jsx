import React from "react";
import "../styles/resultStyle.scss";

export default function ResultItem({
  info,
  index,
  setNominations,
  nominations,
}) {
  //prevent more than 5 nominations or the same movie being nominated multiple times.
  let disableButton;
  if (nominations.includes(info) || nominations.length >= 5) {
    disableButton = true;
  }
  return (
    <div className="search-result slot">
      <div className="item">
        <img src={info.Poster} alt={`${info.Title}-poster`}></img>
        <div className="title">{info.Title}</div>
        <div className="year">{info.Year}</div>
        <button
          disabled={disableButton ? true : false}
          className={`add-button`}
          onClick={() => setNominations((prev) => [info, ...prev])}
        >
          +
        </button>
      </div>
    </div>
  );
}
