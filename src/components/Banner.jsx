import React from "react";
import "../styles/bannerStyle.scss";

export default function Banner(props) {
  return (
    <div className="banner">
      <div className="modal">
        <img
          id="shoppies-banner"
          alt="shoppies-banner"
          src="images/shoppies.png"
        />
        <div className="modal-text">Thank you for your nominations!</div>
      </div>
    </div>
  );
}
