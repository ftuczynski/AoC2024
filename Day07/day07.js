let fs = require("fs");
const equations = fs.readFileSync("Day07/input.txt", "utf-8").split("\r\n").map(x => {
    const split = x.split(': ');
    return [Number(split[0]), [...split[1].split(' ').map(Number)]];
});

const evaluate = (target, acc, numbers) => {
    if (acc > target) return false;
    if (numbers.length == 0) {
        return acc == target;
    }
    const [nextNumber, ...restNumbers] = numbers;
    return (
        evaluate(target, acc + nextNumber, [...restNumbers])
        || evaluate(target, (acc == 0 ? 1 : acc) * nextNumber, [...restNumbers])
    );
};

let sum1 = 0;
equations.forEach(x => {
    sum1 += evaluate(x[0], 0, x[1]) ? x[0] : 0;
});

console.log("Part1 answer: ", sum1);

const evaluateV2 = (target, acc, numbers) => {
    if (acc > target) return false;
    if (numbers.length == 0) {
        return acc == target;
    }
    const [nextNumber, ...restNumbers] = numbers;
    return (
        evaluateV2(target, acc + nextNumber, [...restNumbers])
        || evaluateV2(target, (acc == 0 ? 1 : acc) * nextNumber, [...restNumbers])
        || evaluateV2(target, Number(`${acc}${nextNumber}`), [...restNumbers])
    );
};

let sum2 = 0;
equations.forEach(x => {
    sum2 += evaluateV2(x[0], 0, x[1]) ? x[0] : 0;
});

console.log("Part2 answer: ", sum2);