import React from "react";
import "../styles/errorStyle.scss";

export default function ApiError(props) {
  return (
    <div className="error">Your query was empty or returned no results.</div>
  );
}
