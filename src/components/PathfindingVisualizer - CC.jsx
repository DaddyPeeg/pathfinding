import React, { useRef, useState, useEffect } from "react";

const key = window.addEventListener("keydown", () => console.log("wew"));
console.log(key);

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
  const [mode, setMode] = useState("");
  const [render, setRender] = useState(true);

  const rows = 10;
  const columns = 10;
  const grid = gridCells(rows, columns);

  const resetGrid = () => {
    setRender((prev) => !prev);
  };

  const sleep = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  async function breadthFirstSearch(grid, start, end) {
    const queue = [start];
    let graph = {};
    while (queue.length > 0) {
      const current = queue.shift();
      let blocks = `x${current.x}y${current.y}`;
      if (!current.visited) {
        current.visited = true;

        if (coor.blocks.indexOf(blocks) != -1) {
          console.log("XY", current.x, current.y);
          continue;
        } else {
          console.log("XY Finish", current.x, current.y);
          let div = document.querySelector(
            `[data-set=x${current.x}y${current.y}]`
          );
          div.classList.add("visited");
          if (current.y > 0 && current.y < grid.length - 1) {
            queue.push(grid[current.y - 1][current.x]);
            queue.push(grid[current.y + 1][current.x]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x}y${current.y - 1}`
            );
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x}y${current.y + 1}`
            );
          }
          if (current.y == 0) {
            queue.push(grid[current.y + 1][current.x]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x}y${current.y + 1}`
            );
          }
          if (current.y == grid.length - 1) {
            queue.push(grid[current.y - 1][current.x]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x}y${current.y - 1}`
            );
          }
          if (current.x > 0 && current.x < grid[current.y].length - 1) {
            queue.push(grid[current.y][current.x + 1]);
            queue.push(grid[current.y][current.x - 1]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x + 1}y${current.y}`
            );
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x - 1}y${current.y}`
            );
          }
          if (current.x == 0) {
            queue.push(grid[current.y][current.x + 1]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x + 1}y${current.y}`
            );
          }
          if (current.x == grid[current.y].length - 1) {
            queue.push(grid[current.y][current.x - 1]);
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            graph[`x${current.x}y${current.y}`].push(
              `x${current.x - 1}y${current.y}`
            );
          }
          if (current.y === end.y && current.x === end.x) {
            break;
          }
        }

        await sleep(500);
      }
    }
    console.log(graph);
    // solvePath(start, end, graph);
  }

  async function solvePath(start, end, graph) {
    console.log(graph);
    const pointA = `x${start.x}y${start.y}`;
    const pointB = `x${end.x}y${end.y}`;
    const queue_2 = [pointA];
    const visited_2 = {};
    visited_2[pointA] = true;
    const previous = {};
    previous[pointA] = null;

    while (queue_2.length > 0) {
      const current_new = queue_2.shift();
      if (current_new === pointB) {
        break;
      }
      for (let new_neighbor of graph[current_new]) {
        if (!visited_2[new_neighbor]) {
          visited_2[new_neighbor] = true;
          queue_2.push(new_neighbor);
          previous[new_neighbor] = current_new;
        }
      }
    }
    const new_path = [];
    if (visited_2[pointB]) {
      let current = pointB;
      while (current !== null) {
        new_path.push(current);
        current = previous[current];
      }
    }

    new_path.reverse();

    for (let path of new_path) {
      let div = document.querySelector(`[data-set=${path}]`);
      div.classList.add("path");
      await sleep(10);
    }
  }

  function handleCoor(x, y) {
    switch (mode) {
      case "set-start":
        setCoor({ ...coor, start: { x: x, y: y } });
        break;
      case "set-end":
        setCoor({ ...coor, end: { x: x, y: y } });
        break;
      case "set-blocks":
        if (
          (x != coor.start.x && x != coor.end.x) ||
          (y != coor.start.y && y != coor.end.y)
        ) {
          setCoor({ ...coor, blocks: [...coor.blocks, `x${x}y${y}`] });
          let div = document.querySelector(`[data-set=x${x}y${y}]`);
          div.classList.add("borders");
        } else {
          alert("Cannot put blocks on either start and end points");
        }
        break;
      default:
        return;
    }
  }

  const renderCell = (node, indexRow, indexColumn, add = "") => {
    let div = document.querySelector(`[data-set=x${node.x}y${node.y}]`);
    if (div) {
      div.classList.remove("visited");
    }
    if (add) {
      return (
        <div
          onClick={() => handleCoor(node.x, node.y)}
          className={`cell ${add}`}
          data-set={`x${node.x}y${node.y}`}
          key={`${indexRow}-${indexColumn}`}
        ></div>
      );
    }
    return (
      <div
        onClick={() => handleCoor(node.x, node.y)}
        className={`cell`}
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
        <div className="grid">
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
              grid[coor.end.y][coor.end.x]
            );
          }}
          className="btn go"
        >
          Start
        </button>
        <button
          onClick={() => setMode("set-start")}
          style={{ backgroundColor: "#1ba300" }}
          className="btn"
        >
          Set Start
        </button>
        <button
          onClick={() => setMode("set-end")}
          style={{ backgroundColor: "#b20000" }}
          className="btn"
        >
          Set End
        </button>
        <button
          onClick={() => setMode("set-blocks")}
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
