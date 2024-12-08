let fs = require("fs");
const array = fs.readFileSync("Day08/input.txt", "utf-8").split("\r\n").map(x => x.split(''));

let antennas = new Map();
for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
        if (array[y][x] != '.') {
            if (antennas.has(array[y][x])) {
                antennas.get(array[y][x]).push([y, x]);
            } else {
                antennas.set(array[y][x], [[y, x]]);
            }
        }
    }
}

const isInArray = (x) => {
    return x[0] >= 0 && x[0] < array.length && x[1] >= 0 && x[1] < array[0].length;
};

//PART 1
let antinodes = new Set();
let antennas1 = structuredClone(antennas);
antennas1.forEach((locations, key) => {
    while (locations.length > 1) {
        const curLoc = locations.pop();
        locations.forEach(loc => {
            const diff = [curLoc[0] - loc[0], curLoc[1] - loc[1]];
            const anti1 = [curLoc[0] + diff[0], curLoc[1] + diff[1]];
            const anti2 = [loc[0] - diff[0], loc[1] - diff[1]];
            if (isInArray(anti1) && array[anti1[0]][anti1[1]] != key)
                antinodes.add(anti1.toString());
            if (isInArray(anti2) && array[anti2[0]][anti2[1]] != key)
                antinodes.add(anti2.toString());
        });
    }
});

console.log("Part1 answer: ", antinodes.size);

//PART 2
let resonantAntinodes = new Set();
let antennas2 = structuredClone(antennas);
antennas2.forEach(locations => {
    while (locations.length > 1) {
        locations.forEach(l => resonantAntinodes.add(l.toString()));
        const curLoc = locations.pop();
        locations.forEach(loc => {
            const diff = [curLoc[0] - loc[0], curLoc[1] - loc[1]];
            let anti1 = [curLoc[0] + diff[0], curLoc[1] + diff[1]];
            let anti2 = [loc[0] - diff[0], loc[1] - diff[1]];
            while (isInArray(anti1) || isInArray(anti2)) {
                if (isInArray(anti1))
                    resonantAntinodes.add(anti1.toString());
                if (isInArray(anti2))
                    resonantAntinodes.add(anti2.toString());
                anti1 = [anti1[0] + diff[0], anti1[1] + diff[1]];
                anti2 = [anti2[0] - diff[0], anti2[1] - diff[1]];
            }
        });
    }
});

console.log("Part2 answer: ", resonantAntinodes.size);
