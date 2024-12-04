let fs = require("fs");
let text = fs.readFileSync("Day04/input.txt", "utf-8");

// hehe
let count1 = 0;
let array1 = text.split("\r\n").map(x => x.split(''));
for (let k = 0; k < 2; k++) {
    array1.forEach(x => {
        count1 += Array.from(x.join('').matchAll(/(?=((XMAS)|(SAMX)))/g), x => x[1]).length;
    });
    let maxDiagIndex = array1.length + array1[0].length - 1;
    let rotatedArray = []; //Rotate 45 degrees
    for (let i = 0; i < maxDiagIndex; ++i) rotatedArray.push([]);
    for (let j = 0; j < array1[0].length; ++j)
        for (let i = 0; i < array1.length; ++i)
            rotatedArray[i + j].push(array1[i][j]);

    rotatedArray.forEach(x => {
        count1 += Array.from(x.join('').matchAll(/(?=((XMAS)|(SAMX)))/g), x => x[1]).length;
    });
    array1 = array1[0].map((val, index) => array1.map(row => row[index]).reverse()); //Rotate 90 degrees
};

console.log("Part1 answer: ", count1);

let array2 = text.split("\r\n").map(x => x.split(''));
let mas = ['MAS', 'SAM'];
let count2 = 0;
for (let i = 1; i < array2.length - 1; i++) {
    for (let j = 1; j < array2.length - 1; j++) {
        if (
            array2[i][j] == 'A'
            && mas.includes(array2[i-1][j-1] + array2[i][j] + array2[i+1][j+1])
            && mas.includes(array2[i-1][j+1] + array2[i][j] + array2[i+1][j-1])
        ) {
            count2++;
        }
    }
}
console.log("Part2 answer: ", count2);
