let fs = require("fs");
const array = fs.readFileSync("Day09/input.txt", "utf-8").split('').map(Number);

let driveMap1 = [];
let isFile = true;
let index = 0;
array.forEach(number => {
    for (let i = 0; i < number; i++) {
        driveMap1.push(isFile ? index : '.');
    }
    if (isFile) index++;
    isFile = !isFile;
});

index = 0;
while (true) {
    const lastVal = driveMap1.pop();
    while (index < driveMap1.length) {
        if (driveMap1[index] == '.') {
            driveMap1[index] = lastVal;
            break;
        }
        index++;
    }
    if (index >= driveMap1.length) {
        if (lastVal != '.')
            driveMap1.push(lastVal)
        break;
    }
}

let sum1 = 0;
for (let i = 0; i < driveMap1.length; i++) {
    sum1 += i * driveMap1[i];
}

console.log("Part1 answer: ", sum1);

let driveMap2 = [];
isFile = true;
index = 0;
array.forEach(number => {
    if (number != 0)
        driveMap2.push(isFile ? [index, number] : ['.', number]);
    if (isFile) index++;
    isFile = !isFile;
});

for (let i = driveMap2.length - 1; i > 2; i--) {
    if (driveMap2[i][0] == '.')
        continue;
    for (let j = 1; j < i; j++) {
        if (driveMap2[j][0] == '.' && driveMap2[j][1] >= driveMap2[i][1]) {
            const file = structuredClone(driveMap2[i])
            driveMap2[i][0] = '.';
            driveMap2[j][1] -= file[1];
            driveMap2.splice(j, 0, file);
            if (driveMap2[j + 1][1] == 0)
                driveMap2.splice(j + 1, 1);
            else
                i++;
            break;
        }
    }
}

let sum2 = 0;
driveMap2 = driveMap2.map(x => {
    let arr = []
    for (let i = 0; i < x[1]; i++)
        arr.push(x[0]);
    return arr;
});
driveMap2 = [].concat(...driveMap2);
driveMap2.forEach((x, i) => {
    if (x != '.') {
        sum2 += i * x;
    }
});

console.log("Part2 answer: ", sum2);