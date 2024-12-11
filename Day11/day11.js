let fs = require("fs");
const input = fs.readFileSync("Day11/input.txt", "utf-8").split(' ');

function addStone(stones, key, qty) {
    stones[key] = (stones[key] || 0) + (qty || 1);
}

function blink(stones) {
    const newStones = new Map();
    Object.keys(stones).forEach(key => {
        const qty = stones[key] || 0;
        if (key == '0')
            addStone(newStones, 1, qty);
        else if (key.length % 2 == 0) {
            addStone(newStones, Number(key.substring(0, key.length / 2)), qty);
            addStone(newStones, Number(key.substring(key.length / 2)), qty);
        } else
            addStone(newStones, Number(key) * 2024, qty);
    });
    return newStones;
}

function solve(numberOfBlinks) {
    let stones = new Map();
    input.forEach(key => addStone(stones, key));

    for (let i = 0; i < numberOfBlinks; i++) {
        stones = blink(stones);
    }

    return Object.values(stones).reduce((sum, s) => sum + s, 0);
}

const start1 = Date.now();
const result1 = solve(25);
const end1 = Date.now();
console.log(`Part1 answer: ${result1} in ${end1 - start1}ms`);

const start2 = Date.now();
const result2 = solve(75);
const end2 = Date.now();
console.log(`Part2 answer: ${result2} in ${end2 - start2}ms`);
