let fs = require("fs");
const map = fs.readFileSync("Day10/input.txt", "utf-8").split('\r\n').map(x => x.split('').map(Number));

const trailheads = [];
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] == 0)
            trailheads.push([y, x]);
    }
}
const dirs = [[0, -1], [-1, 0], [0, 1], [1, 0]];

function inRange(map, y, x) {
    return y >= 0 && y < map.length && x >= 0 && x < map[0].length;
};

function countTrails(map, curY, curX, visited) {
    if (map[curY][curX] == 9) {
        return 1;
    }
    return dirs
        .map(([dy, dx]) => [curY + dy, curX + dx])
        .filter(([nextY, nextX]) =>
            !visited.has(`${nextY},${nextX}`)
            && inRange(map, nextY, nextX)
            && map[nextY][nextX] == map[curY][curX] + 1
        )
        .reduce((count, [nextY, nextX]) => {
            visited.add(`${nextY},${nextX}`);
            return count + countTrails(map, nextY, nextX, visited);
        }, 0);
};

function countTrailsWithOverlap(map, curY, curX) {
    if (map[curY][curX] == 9) {
        return 1;
    }
    return dirs
        .map(([dy, dx]) => [curY + dy, curX + dx])
        .filter(([nextY, nextX]) =>
            inRange(map, nextY, nextX)
            && map[nextY][nextX] == map[curY][curX] + 1
        )
        .reduce((count, [nextY, nextX]) => {
            return count + countTrailsWithOverlap(map, nextY, nextX);
        }, 0);
};

let sum1 = 0;
trailheads.forEach(trailhead => {
    sum1 += countTrails(map, trailhead[0], trailhead[1], new Set());
});

console.log("Part1 answer: ", sum1);

let sum2 = 0;
trailheads.forEach(trailhead => {
    sum2 += countTrailsWithOverlap(map, trailhead[0], trailhead[1]);
});

console.log("Part2 answer: ", sum2);