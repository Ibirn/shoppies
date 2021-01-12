import { useEffect, useState } from "react";

export default function useDragAndDrop(props) {
  const [nominations, setNominations] = useState([]);

  // console.log("D&D loaded", props);

  let dragSource = null;

  useEffect(() => {
    console.log("RC: ", props.results);
  }, [props.results]);

  function handleDragStart(e) {
    dragSource = this;
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData(
      "text/html",
      JSON.stringify(props.results[this.id[0]])
    );
    // console.log("DS: ", this, props.results[this.id[0]]);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "copy";
    return false;
  }

  function handleDrop(e) {
    console.log("HD DS: ", dragSource);
    console.log("HD TH: ", this);
    if (dragSource !== this && dragSource !== null) {
      // document.getElementById("drop-zone").appendChild();
      // dragSource.innerHTML = this.innerHTML;
      setNominations((prev) => [
        ...prev,
        JSON.parse(e.dataTransfer.getData("text/html")),
      ]);
    }
  }

  useEffect(() => {
    //grab all items
    console.log("GOING");
    let items = document.querySelectorAll(".slot");
    let selections = document.getElementById("drop-zone");
    //give each item listeners for drag
    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      // item.addEventListener("drop", handleDrop);
      item.addEventListener("dragover", handleDragOver);
    });
    console.log("SELECTIONS: ", selections);
    selections.addEventListener("dragover", handleDragOver);
    selections.addEventListener("drop", handleDrop);

    return () => {
      //remove the goddamn listeners to prevent problems, you numpty - 5 hours and you should know better.
      items.forEach((item) => {
        item.removeEventListener("dragstart", handleDragStart);
        // item.removeEventListener("drop", handleDrop);
        item.removeEventListener("dragover", handleDragOver);
      });
      selections.removeEventListener("dragover", handleDragOver);
      selections.removeEventListener("drop", handleDrop);

      console.log("GONE");
    };
  });

  return { nominations, setNominations };
}
