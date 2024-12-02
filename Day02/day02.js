let fs = require("fs");
let text = fs.readFileSync("Day02/input.txt", "utf-8");
const reports = text.split("\r\n").map(x => x.split(" ").map(Number));

function checkReport(report) {
    const increasing = report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
        const diff = Math.abs(report[i] - report[i + 1]);
        if (report[i] < report[i + 1] != increasing || diff < 1 || diff > 3)
            return false;
    }
    return true;
};

function checkReportWithDampener(report) {
    for (let i = 0; i < report.length; i++) {
        let newReport = [...report];
        newReport.splice(i, 1);
        const increasing = newReport[0] < newReport[1];
        let error = false;
        for (let j = 0; j < newReport.length - 1; j++) {
            const diff = Math.abs(newReport[j] - newReport[j + 1]);
            if (newReport[j] < newReport[j + 1] != increasing || diff < 1 || diff > 3) {
                error = true;
                break;
            }
        }
        if (!error) return true;
    }
    return false;
};

const result1 = reports.map(checkReport).filter(Boolean).length;
console.log("Part1 answer: ", result1);

const result2 = reports.map(checkReportWithDampener).filter(Boolean).length;
console.log("Part2 answer: ", result2);