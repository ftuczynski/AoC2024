let fs = require("fs");
let text = fs.readFileSync("Day03/input.txt", "utf-8");

let instructions1 = text.match(/mul\(\d{1,3},\d{1,3}\)/g);
let sum1 = 0;
instructions1.forEach(inst => {
    const mul = inst.match(/\d+/g);
    sum1 += mul[0] * mul[1];
});

console.log("Part1 answer: ", sum1);

let instrunctions2 = text.match(/(mul\(\d{1,3},\d{1,3}\))|(do(?:n't)?\(\))/g);
let sum2 = 0;
let enableInst = true;
instrunctions2.forEach(inst => {
    switch (inst) {
        case 'do()':
            enableInst = true;
            break;
        case 'don\'t()':
            enableInst = false;
            break;
        default:
            if (enableInst) {
                const mul = inst.match(/\d+/g);
                sum2 += mul[0] * mul[1];
            }
    }
});

console.log("Part2 answer: ", sum2);