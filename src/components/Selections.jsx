import React from "react";
import "../styles/nominationStyle.scss";

export default function Selections({ choices }) {
  // console.log("SELEC: ", choices);
  return (
    <div>
      <div className="nomination-choice slot" draggable={true}>
        {choices.nomination1.Poster ? (
          <img
            src={choices.nomination1.Poster}
            alt={`${choices.nomination1.Title}-poster`}
          ></img>
        ) : null}
        <span>
          <h3>{choices.nomination1.Title}</h3>
          <p>{choices.nomination1.Year}</p>
        </span>
      </div>
      <div className="nomination-choice slot" draggable={true}>
        {choices.nomination2.Poster ? (
          <img
            src={choices.nomination2.Poster}
            alt={`${choices.nomination2.Title}-poster`}
          ></img>
        ) : null}
        <span>
          <h3>{choices.nomination2.Title}</h3>
          <p>{choices.nomination2.Year}</p>
        </span>
      </div>
      <div className="nomination-choice slot" draggable={true}>
        {choices.nomination3.Poster ? (
          <img
            src={choices.nomination3.Poster}
            alt={`${choices.nomination3.Title}-poster`}
          ></img>
        ) : null}
        <span>
          <h3>{choices.nomination3.Title}</h3>
          <p>{choices.nomination3.Year}</p>
        </span>
      </div>
      <div className="nomination-choice slot" draggable={true}>
        {choices.nomination4.Poster ? (
          <img
            src={choices.nomination4.Poster}
            alt={`${choices.nomination4.Title}-poster`}
          ></img>
        ) : null}
        <span>
          <h3>{choices.nomination4.Title}</h3>
          <p>{choices.nomination4.Year}</p>
        </span>
      </div>
      <div className="nomination-choice slot" draggable={true}>
        {choices.nomination5.Poster ? (
          <img
            src={choices.nomination5.Poster}
            alt={`${choices.nomination5.Title}-poster`}
          ></img>
        ) : null}
        <span>
          <h3>{choices.nomination5.Title}</h3>
          <p>{choices.nomination5.Year}</p>
        </span>
      </div>
    </div>
  );
}
