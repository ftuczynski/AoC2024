let fs = require("fs");
let text = fs.readFileSync("Day05/input.txt", "utf-8").split("\r\n\r\n");
let rules = text[0].split("\r\n").map(x => x.split('|').map(Number));
let updates = text[1].split("\r\n").map(x => x.split(',').map(Number));

const rulesMap = new Map();
rules.forEach(rule => {
    if (rulesMap.has(rule[1])) {
        rulesMap.get(rule[1]).push(rule[0]);
    } else {
        rulesMap.set(rule[1], [rule[0]]);
    }
});

let sum1 = 0;
updates.forEach(update => {
    let valid = true;
    for (let i = 0; i < update.length - 1; i++) {
        const rule = rulesMap.get(update[i]) || [];
        const nextUpdates = update.slice(i + 1);
        if (nextUpdates.some(u => rule.includes(u))) {
            valid = false;
            break;
        }
    }
    if (valid) {
        sum1 += update[Math.floor(update.length / 2)];
    }
});

console.log("Part1 answer: ", sum1);

let sum2 = 0;
updates.forEach(update => {
    let corrected = false;
    for (let i = 0; i < update.length - 1; i++) {
        let valid = true;
        let usedNumbers = [];
        do {
            valid = true;
            const rule = rulesMap.get(update[i]) || [];
            const nextUpdates = update.slice(i + 1) || [];
            if (nextUpdates.some(u => rule.includes(u))) {
                valid = false;
            }
            if (!valid) {
                let possibleValue = nextUpdates.filter(x => rule.includes(x) && !usedNumbers.includes(x))[0];
                usedNumbers.push(possibleValue);
                let possibleIndex = update.indexOf(possibleValue);
                [update[i], update[possibleIndex]] = [update[possibleIndex], update[i]];
                corrected = true;
            }
        }
        while (!valid)
    }
    if (corrected) {
        sum2 += update[Math.floor(update.length / 2)];
    }
});

console.log("Part2 answer: ", sum2);