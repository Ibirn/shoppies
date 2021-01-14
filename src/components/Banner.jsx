import React, { useEffect } from "react";
import "../styles/bannerStyle.scss";

export default function Banner(props) {
  return (
    <div className="banner">
      <img
        id="shoppies-banner"
        alt="shoppies-banner"
        src="images/shoppies.png"
      />
    </div>
  );
}
