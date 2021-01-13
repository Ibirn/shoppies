import { useEffect, useState } from "react";

export default function useDragAndDrop(props) {
  const [nominations, setNominations] = useState([
    // {
    //   Title: "Nick Offerman: American Ham",
    //   Year: "2014",
    //   imdbID: "tt3441700",
    //   Type: "movie",
    //   Poster:
    //     "https://m.media-amazon.com/images/M/MV5BMDdjZTFlYjItYTUxZi00NDVlLWEyOGYtMjU3OWJmYjMxMTM0XkEyXkFqcGdeQXVyMTk3NDAwMzI@._V1_SX300.jpg",
    // },
    // {
    //   Title: "Ham & Cheese",
    //   Year: "2004",
    //   imdbID: "tt0342505",
    //   Type: "movie",
    //   Poster:
    //     "https://m.media-amazon.com/images/M/MV5BMTQ2OTY3NTYwNF5BMl5BanBnXkFtZTgwMDI4OTk1MDE@._V1_SX300.jpg",
    // },
  ]);

  let dragSource = null;
  let dragSwap = null;

  function handleDragStart(e) {
    dragSource = this;
    e.dataTransfer.effectAllowed = "copyMove";
    if (this.className.includes("search-result")) {
      e.dataTransfer.setData(
        "text/html",
        JSON.stringify(props.results[this.id[0]])
      );
    } else {
      e.dataTransfer.setData("text/html", this.innerHTML);
    }
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (this.className.includes("nominations")) {
      e.dataTransfer.dropEffect = "copy";
    } else {
      dragSwap = this;
      e.dataTransfer.dropEffect = "move";
    }

    return false;
  }

  function handleDrop(e) {
    if (dragSource !== this && dragSource !== null) {
      if (dragSwap && dragSource.className.includes("nomination-choice")) {
        dragSource.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
        e.stopPropagation();
      } else {
        setNominations((prev) => [
          ...prev,
          JSON.parse(e.dataTransfer.getData("text/html")),
        ]);
        e.stopPropagation();
      }
    }
    e.dataTransfer.clearData("text/html");
  }

  useEffect(() => {
    //grab all items
    console.log("GOING");
    let items = document.querySelectorAll(".slot");
    let dropZone = document.getElementById("drop-zone");
    let nominees = document.querySelectorAll(".nomination-choice");
    //give each item listeners for drag
    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("dragover", handleDragOver);
    });

    nominees.forEach((nominee) => {
      nominee.addEventListener("dragstart", handleDragStart);
      nominee.addEventListener("dragover", handleDragOver);
      nominee.addEventListener("drop", handleDrop);
      console.log("APPLIED: ", nominee);
    });

    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      //remove the goddamn listeners to prevent problems, you numpty - 5 hours and you should know better.
      items.forEach((item) => {
        item.removeEventListener("dragstart", handleDragStart);
        item.removeEventListener("dragover", handleDragOver);
      });

      nominees.forEach((nominee) => {
        nominee.removeEventListener("dragstart", handleDragStart);
        nominee.removeEventListener("dragover", handleDragOver);
        nominee.removeEventListener("drop", handleDrop);
      });

      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);

      console.log("GONE");
    };
  });

  return { nominations, setNominations };
}
