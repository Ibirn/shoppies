import React from "react";
import "../styles/resultStyle.scss";

export default function ResultItem({
  info,
  index,
  setNominations,
  nominations,
}) {
  let disableButton;
  if (nominations.includes(info)) {
    disableButton = true;
  }
  return (
    <div className="search-result slot">
      <div className="item">
        <img src={info.Poster} alt={`${info.Title}-poster`}></img>
        <div className="title">{info.Title}</div>
        <div className="year">{info.Year}</div>
        {/* <button onClick={() => setNominations((prev) => [info, ...prev])}>
          +
        </button> */}
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
