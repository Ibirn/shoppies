import React from "react";
import "../styles/nominationStyle.scss";

export default function Selections({ choice }) {
  console.log("SELEC: ", choice);
  return (
    <div className="nomination-choice" draggable={true}>
      <img src={choice.Poster} alt={`${choice.Title}-poster`}></img>
      <span>
        <h3>{choice.Title}</h3>
        <p>{choice.Year}</p>
      </span>
    </div>
  );
}
