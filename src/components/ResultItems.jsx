import React from "react";
import "../styles/resultStyle.scss";

export default function ResultItem({ info, index }) {
  // console.log("PROPS: ", info);
  return (
    <div className="search-result slot" id={`${index}-result`} draggable={true}>
      <img src={info.Poster} alt={`${info.Title}-poster`}></img>
      <span>
        <h3>{info.Title}</h3>
        <p>{info.Year}</p>
      </span>
    </div>
  );
}
