import React from "react";
import "../styles/nominationStyle.scss";

export default function Selections({ choice, index }) {
  console.log("SELEC: ", choice);
  /**   
   *  <div className="search-result slot" id={`${index}result`} draggable={true}>
      <div className="item">
        <img src={info.Poster} alt={`${info.Title}-poster`}></img>
        <div className="title">{info.Title}</div>
        <div className="year">{info.Year}</div>
        <button onClick={() => setNominations((prev) => [info, ...prev])}>
          +
        </button>
      </div>
    </div> */
  return (
    <div className="nomination-choice" id={`${index}-result`} draggable={true}>
      <div className="item">
        <img src={choice.Poster} alt={`${choice.Title}-poster`}></img>
        <div className="title">{choice.Title}</div>
        <div className="year">{choice.Year}</div>
        {/* <button onClick={() => setNominations((prev) => [info, ...prev])}>
          -
        </button> */}
      </div>
    </div>
  );
}
