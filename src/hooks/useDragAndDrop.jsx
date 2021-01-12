import { useEffect, useState } from "react";

export default function useDragAndDrop(props) {
  const [nominations, setNominations] = useState({
    nomination1: {},
    nomination2: {},
    nomination3: {},
    nomination4: {},
    nomination5: {},
  });

  console.log("D&D loaded", props);

  let dragSource = null;

  useEffect(() => {
    console.log("RC: ", props.results);
  }, [props.results]);

  function handleDragStart(e) {
    dragSource = this;
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/html", this.innerHTML);
    console.log("DS: ", this);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    // console.log("DO: ", this);
    return false;
  }

  function handleDrop(e) {
    console.log("HD DS: ", dragSource);
    console.log("HD TH: ", this);
    if (dragSource !== this && dragSource !== null) {
      // dragSource.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }
  }

  useEffect(() => {
    //grab all items
    console.log("GOING");
    let items = document.querySelectorAll(".slot");
    //give each item listeners for drag
    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("drop", handleDrop);
      item.addEventListener("dragover", handleDragOver);
    });

    return () => {
      //remove the goddamn listeners to prevent problems, you numpty - 5 hours and you should know better.
      items.forEach((item) => {
        item.removeEventListener("dragstart", handleDragStart);
        item.removeEventListener("drop", handleDrop);
        item.removeEventListener("dragover", handleDragOver);
      });
      console.log("GONE");
    };
  });

  return { nominations, setNominations };
}
