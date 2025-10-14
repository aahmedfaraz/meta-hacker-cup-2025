import * as fs from 'fs';

// Read input file
const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
const outputLines = [];

// Initial Variables
const testCases = parseInt(lines.shift());
let currentTestCase = 1;


// All Functions
const needDownShift = (current, target) => {
    for (let i = 0; i < current.length; i++) {
        if (current[i] > target[i]) {
            return true;
        }
    }
    return false;
}

const reachTarget = (current, target) => {
    let swapCount = 0;
    let swapPairs = [];
    let possible = true;

    const initTempObj = current.reduce((acc, temp, idx) => {
        acc[temp] = idx;
        return acc;
    }, {});

    for (let i = 0; i < current.length; i++) {
        if (current[i] !== target[i]) {
            const targetIndex = initTempObj[target[i]];
            if (targetIndex) {
                swapPairs.push(`${targetIndex + 1} ${i + 1}`);
                swapCount++;
            } else {
                possible = false;
                break;
            }
        }
    }
    return {
        swapCount,
        swapPairs,
        possible,
    }
}

// Main Logic
while (currentTestCase <= testCases) {
    // Check if both arrays have same values
    lines.shift(); // ignore N
    const iniTempStr = lines.shift().split(' ').map(val => val.trim()).join(' ');
    const finTempStr = lines.shift().split(' ').map(val => val.trim()).join(' ');
    if (iniTempStr == finTempStr) {
        outputLines.push(`Case #${currentTestCase}: 0`);
        currentTestCase++;
        continue;
    }
    
    // Check if downshift is needed
    const dishInitialTemperatures = iniTempStr.split(' ').map(Number);
    const dishFinalTemperatures = finTempStr.split(' ').map(Number);
    if (needDownShift(dishInitialTemperatures, dishFinalTemperatures)) {
        outputLines.push(`Case #${currentTestCase}: -1`);
        currentTestCase++;
        continue;
    }

    // Check if both arrays have same length
    if (dishInitialTemperatures.length !== dishFinalTemperatures.length) {
        outputLines.push(`Case #${currentTestCase}: -1`);
        currentTestCase++;
        continue;
    }

    // Try to reach target
    const { swapCount, swapPairs, possible } = reachTarget(dishInitialTemperatures, dishFinalTemperatures);
    if (!possible) {
        outputLines.push(`Case #${currentTestCase}: -1`);
        currentTestCase++;
        continue;
    }
    outputLines.push(`Case #${currentTestCase}: ${swapCount}`);
    swapPairs.forEach(pair => outputLines.push(pair));

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));
