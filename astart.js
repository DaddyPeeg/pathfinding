function aStarPathfinding(start, end, board) {
  const ROW = board.length;
  const COL = board[0].length;
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const pq = new PriorityQueue();
  const dist = Array.from({ length: ROW }, () => Array(COL).fill(Infinity));
  const visited = Array.from({ length: ROW }, () => Array(COL).fill(false));
  const prev = Array.from({ length: ROW }, () => Array(COL).fill(null));

  pq.enqueue(start, 0);
  dist[start[0]][start[1]] = 0;

  while (!pq.isEmpty()) {
    const curr = pq.dequeue();

    if (curr[0] === end[0] && curr[1] === end[1]) {
      return constructPath(prev, start, end);
    }

    if (visited[curr[0]][curr[1]]) {
      continue;
    }

    visited[curr[0]][curr[1]] = true;

    for (let i = 0; i < dx.length; i++) {
      const nextX = curr[0] + dx[i];
      const nextY = curr[1] + dy[i];

      if (nextX < 0 || nextX >= ROW || nextY < 0 || nextY >= COL) {
        continue;
      }

      if (board[nextX][nextY] === "W") {
        continue;
      }

      const newDist =
        dist[curr[0]][curr[1]] +
        Math.sqrt(Math.pow(dx[i], 2) + Math.pow(dy[i], 2));

      if (newDist < dist[nextX][nextY]) {
        dist[nextX][nextY] = newDist;
        prev[nextX][nextY] = curr;
        pq.enqueue([nextX, nextY], newDist + heuristic(end, [nextX, nextY]));
      }
    }
  }

  return null;
}

function constructPath(prev, start, end) {
  let curr = end;
  const path = [];

  while (curr !== null) {
    path.unshift(curr);
    curr = prev[curr[0]][curr[1]];
  }

  return path;
}

function heuristic(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift().item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const board = [
  ["S", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "E"],
];

const start = [0, 0];
const end = [4, 4];

const path = aStarPathfinding(start, end, board);

console.log(path);
