let fs = require("fs");
const startingMap = fs.readFileSync("Day06/input.txt", "utf-8").split("\r\n").map(x => x.split(""));

const guardInitDir = [-1, 0];
let guardInitPos;
for (let y = 0; y < startingMap.length; y++) {
  for (let x = 0; x < startingMap[y].length; x++) {
    if (startingMap[y][x] == '^')
      guardInitPos = [y, x];
  }
}

let guardPos = [...guardInitPos];
let guardDir = [...guardInitDir];
let map = structuredClone(startingMap);
while (true) {
  map[guardPos[0]][guardPos[1]] = 'X';
  const nextPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]]
  if (nextPos[0] < 0 || nextPos[0] >= map.length || nextPos[1] < 0 || nextPos[1] >= map[nextPos[0]].length)
    break;

  if (map[nextPos[0]][nextPos[1]] == '#') {
    guardDir = [guardDir[1], -1 * guardDir[0]];
  } else {
    guardPos = [nextPos[0], nextPos[1]];
  }
}

console.log("Part1 answer: ", map.flat().filter(x => x == 'X').length);

//Brute-force part2 :c
let loops = new Set();
for (let y = 0; y < startingMap.length; y++) {
  for (let x = 0; x < startingMap[y].length; x++) {
    if (startingMap[y][x] != '.')
      continue;
    map = structuredClone(startingMap);
    guardPos = [...guardInitPos];
    guardDir = [...guardInitDir];
    map[y][x] = '#';
    let turns = new Set();
    while (true) {
      map[guardPos[0]][guardPos[1]] = 'X';
      const nextPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]]
      if (nextPos[0] < 0 || nextPos[0] >= map.length || nextPos[1] < 0 || nextPos[1] >= map[nextPos[0]].length)
        break;

      if (map[nextPos[0]][nextPos[1]] == '#') {
        let turn = guardPos.toString() + '|' + nextPos.toString();
        if (turns.has(turn)) {
          loops.add(`${y},${x}`);
          break;
        }
        turns.add(turn);
        guardDir = [guardDir[1], -1 * guardDir[0]];
      } else {
        guardPos = [nextPos[0], nextPos[1]];
      }
    }
  }
}

console.log("Part2 answer: ", loops.size);
