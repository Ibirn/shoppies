import React from "react";
import "../styles/nominationStyle.scss";

export default function Selections({
  choice,
  index,
  setNominations,
  nominations,
}) {
  console.log("SELEC: ", choice);

  const removeNomination = () => {
    let copyArr = [...nominations];
    copyArr.splice(index, 1);
    setNominations([...copyArr]);
  };

  return (
    <div className="nomination-choice" id={`${index}-result`} draggable={true}>
      <div className="item">
        <img src={choice.Poster} alt={`${choice.Title}-poster`}></img>
        <div className="title">{choice.Title}</div>
        <div className="year">{choice.Year}</div>
        <div className="remove-button" onClick={() => removeNomination()}>
          -
        </div>
      </div>
    </div>
  );
}
