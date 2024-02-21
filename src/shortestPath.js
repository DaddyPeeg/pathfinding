// Define a graph as an object
const graph = {
  A: ["B", "D"],
  B: ["A", "C"],
  C: ["B", "E"],
  D: ["A", "E"],
  E: ["C", "D"],
};

if (
  current.y > 0 &&
  current.y < grid.length - 1 &&
  current.x > 0 &&
  current.x < grid[current.y].length - 1
) {
  queue.push(grid[current.y - 1][current.x]);
  queue.push(grid[current.y + 1][current.x]);
  queue.push(grid[current.y][current.x + 1]);
  queue.push(grid[current.y][current.x - 1]);
}
if (current.y == 0) {
  queue.push(grid[current.y + 1][current.x]);
}
if (current.y == grid.length - 1) {
  queue.push(grid[current.y - 1][current.x]);
}
if (current.x == 0) {
  queue.push(grid[current.y][current.x + 1]);
}
if (current.x == grid[current.y].length - 1) {
  queue.push(grid[current.y][current.x - 1]);
}

// Define a source node and a destination node
const source = "A";
const destination = "E";

// Define a queue as an array
const queue = [source];

// Define a visited set as an object
const visited = {};
visited[source] = true;

// Define a previous object as an object
const previous = {};
previous[source] = null;

// Loop until the queue is empty or the destination is found
while (queue.length > 0) {
  // Dequeue the first node from the queue
  const current = queue.shift();

  // Check if the current node is equal to the destination node
  if (current === destination) {
    break;
  }

  // Loop through the adjacent nodes of the current node
  for (const neighbor of graph[current]) {
    // Check if the neighbor is not in the visited set
    if (!visited[neighbor]) {
      // Mark it as visited
      visited[neighbor] = true;
      // Enqueue it to the queue
      queue.push(neighbor);
      // Set its previous node as the current node
      previous[neighbor] = current;
    }
  }
}

// Define a path array
const path = [];

// Check if the destination is found
if (visited[destination]) {
  // Loop backward from the destination to the source by following the previous nodes
  let current = destination;
  while (current !== null) {
    // Push each node to the path array
    path.push(current);
    // Set the current node as its previous node
    current = previous[current];
  }
}

// Reverse the path array
path.reverse();

// Return or print the path array
console.log(path); // ["A", "D", "E"]
