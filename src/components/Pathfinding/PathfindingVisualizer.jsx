import React, { useEffect, useState } from "react";
import breadthFirstSearch from "./BreadthFirstSearch";

const gridCells = (rows, columns) => {
  const array = [];
  for (let r = 0; r < rows; r++) {
    array.push([]);
    for (let c = 0; c < columns; c++) {
      array[r].push({ x: c, y: r, visited: false });
    }
  }
  return array;
};

let isMouse = false;
let isBlocks = false;

const PathfindingVisualizer = () => {
  const [coor, setCoor] = useState({
    start: {
      x: 8,
      y: 5,
    },
    end: {
      x: 0,
      y: 0,
    },
    blocks: [],
  });
  const [mode, setMode] = useState("set-start");
  const [render, setRender] = useState(true);

  const mouseDown = () => {
    if (isBlocks && mode === "set-blocks") isMouse = true;
  };
  const mouseUp = () => {
    if (isBlocks && mode === "set-blocks") isMouse = false;
  };

  const rows = 20;
  const columns = 20;
  const cellSize = 30;
  const grid = gridCells(rows, columns);

  const resetGrid = () => {
    setRender((prev) => !prev);
    setCoor({ ...coor, blocks: [] });
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        let div = document.querySelector(`[data-set=x${x}y${y}]`);
        if (div) {
          if (div.classList.contains("visited"))
            div.classList.remove("visited");
          if (div.classList.contains("path")) div.classList.remove("path");
          if (div.classList.contains("borders"))
            div.classList.remove("borders");
        }
      }
    }
  };
  function handleStartEnd(x, y) {
    if (!isMouse && !isBlocks) {
      if (mode === "set-end") setCoor({ ...coor, end: { x: x, y: y } });
      if (mode === "set-start") setCoor({ ...coor, start: { x: x, y: y } });
    }
  }

  function handleCoor(x, y) {
    if (isMouse && isBlocks && mode === "set-blocks") {
      if (
        (x != coor.start.x && x != coor.end.x) ||
        (y != coor.start.y && y != coor.end.y) ||
        (x != coor.start.x && y != coor.end.y) ||
        (x != coor.end.x && y != coor.start.y)
      ) {
        setCoor({ ...coor, blocks: [...coor.blocks, `x${x}y${y}`] });
        let div = document.querySelector(`[data-set=x${x}y${y}]`);
        div.classList.add("borders");
      } else {
        alert("Cannot put blocks on either start and end points");
      }
    }
  }

  const setGrid = (string, blocks) => {
    setMode(string);
    isBlocks = blocks;
  };

  const renderCell = (node, indexRow, indexColumn, add = "") => {
    if (add) {
      return (
        <div
          onMouseOver={() => handleCoor(node.x, node.y)}
          onClick={() => handleStartEnd(node.x, node.y)}
          className={`cell ${add}`}
          style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
          data-set={`x${node.x}y${node.y}`}
          key={`${indexRow}-${indexColumn}`}
        ></div>
      );
    }
    return (
      <div
        onMouseOver={() => handleCoor(node.x, node.y)}
        onClick={() => handleStartEnd(node.x, node.y)}
        className={`cell`}
        style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
        data-set={`x${node.x}y${node.y}`}
        key={`${indexRow}-${indexColumn}`}
      ></div>
    );
  };

  const handleRender = (node, indexRow, indexColumn) => {
    if (node.x === coor.start.x && node.y === coor.start.y) {
      return renderCell(node, indexRow, indexColumn, "startCell");
    } else if (node.x === coor.end.x && node.y === coor.end.y) {
      return renderCell(node, indexRow, indexColumn, "endCell");
    } else {
      return renderCell(node, indexRow, indexColumn);
    }
  };

  return (
    <>
      <div className="gridContainer">
        <div
          className="grid"
          style={{ width: `calc(10px + ((${cellSize}px + 2px) * ${columns}))` }}
          onMouseDown={() => mouseDown()}
          onMouseUp={() => mouseUp()}
        >
          {grid.map((row, indexRow) => (
            <div key={`${indexRow}`} className="row">
              {row.map((node, indexColumn) =>
                handleRender(node, indexRow, indexColumn)
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="button-contain">
        <button onClick={() => resetGrid()} className="btn">
          Clear
        </button>
        <button
          onClick={() => {
            breadthFirstSearch(
              grid,
              grid[coor.start.y][coor.start.x],
              grid[coor.end.y][coor.end.x],
              coor
            );
          }}
          className="btn go"
        >
          Start
        </button>
        <button
          onClick={() => setGrid("set-start", false)}
          style={{ backgroundColor: "#1ba300" }}
          className="btn"
        >
          Set Start
        </button>
        <button
          onClick={() => setGrid("set-end", false)}
          style={{ backgroundColor: "#b20000" }}
          className="btn"
        >
          Set End
        </button>
        <button
          onClick={() => setGrid("set-blocks", true)}
          style={{ backgroundColor: "#3100a5" }}
          className="btn"
        >
          Set Blocks
        </button>
      </div>
    </>
  );
};

export default PathfindingVisualizer;
