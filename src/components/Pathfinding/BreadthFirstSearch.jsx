const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
async function breadthFirstSearch(grid, start, end, coor) {
  const queue = [start];
  let graph = {};
  while (queue.length > 0) {
    const current = queue.shift();
    let blocks = `x${current.x}y${current.y}`;
    if (!current.visited) {
      current.visited = true;
      if (coor.blocks.indexOf(blocks) != -1) {
        continue;
      } else {
        let div = document.querySelector(
          `[data-set=x${current.x}y${current.y}]`
        );

        if (
          !div.classList.contains("startCell") &&
          !div.classList.contains("endCell")
        ) {
          div.classList.add("visited");
        }

        if (current.y > 0 && current.y < grid.length - 1) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x}y${current.y - 1}`) == -1) {
              queue.push(grid[current.y - 1][current.x]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x}y${current.y - 1}`
              );
            }
            if (coor.blocks.indexOf(`x${current.x}y${current.y + 1}`) == -1) {
              queue.push(grid[current.y + 1][current.x]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x}y${current.y + 1}`
              );
            }
          }
        }
        if (current.y == 0) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x}y${current.y + 1}`) == -1) {
              queue.push(grid[current.y + 1][current.x]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x}y${current.y + 1}`
              );
            }
          }
        }
        if (current.y == grid.length - 1) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x}y${current.y - 1}`) == -1) {
              queue.push(grid[current.y - 1][current.x]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x}y${current.y - 1}`
              );
            }
          }
        }
        if (current.x > 0 && current.x < grid[current.y].length - 1) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x + 1}y${current.y}`) == -1) {
              queue.push(grid[current.y][current.x + 1]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x + 1}y${current.y}`
              );
            }
            if (coor.blocks.indexOf(`x${current.x - 1}y${current.y}`) == -1) {
              queue.push(grid[current.y][current.x - 1]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x - 1}y${current.y}`
              );
            }
          }
        }
        if (current.x == 0) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x + 1}y${current.y}`) == -1) {
              queue.push(grid[current.y][current.x + 1]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x + 1}y${current.y}`
              );
            }
          }
        }
        if (current.x == grid[current.y].length - 1) {
          if (coor.blocks.indexOf(blocks) == -1) {
            if (!graph[`x${current.x}y${current.y}`]) {
              graph[`x${current.x}y${current.y}`] = [];
            }
            if (coor.blocks.indexOf(`x${current.x - 1}y${current.y}`) == -1) {
              queue.push(grid[current.y][current.x - 1]);
              graph[`x${current.x}y${current.y}`].push(
                `x${current.x - 1}y${current.y}`
              );
            }
          }
        }
        if (current.y === end.y && current.x === end.x) {
          break;
        }
      }

      await sleep(1);
    }
  }
  solvePath(start, end, graph);
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
  if (new_path.length > 0) {
    for (let path of new_path) {
      let div = document.querySelector(`[data-set=${path}]`);
      if (
        !div.classList.contains("startCell") &&
        !div.classList.contains("endCell")
      ) {
        div.classList.add("path");
      }

      await sleep(10);
    }
  } else {
    alert("No path can be found");
  }
}

export default breadthFirstSearch;
