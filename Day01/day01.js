let fs = require("fs");
let text = fs.readFileSync("Day01/input.txt", "utf-8");
let lines = text.split("\r\n");
let list1 = [];
let list2 = [];

lines.forEach(x => {
    let row = x.split("   ");
    list1.push(row[0]);
    list2.push(row[1]);
});

list1.sort();
list2.sort();

let sum1 = 0;
for (let i = 0; i < list1.length; i++) {
    sum1 += Math.abs(list1[i] - list2[i]);
}

console.log("Part1 answer:", sum1);

let sum2 = 0;
for (let i = 0; i < list1.length; i++) {
    sum2 += list2.filter(x => x == list1[i]).length * list1[i];
}

console.log("Part2 answer:", sum2);