import * as fs from 'fs';

// Read input file
const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
const outputLines = [];

// Required variables
const totalTestCases = parseInt(lines.shift());
let currentTestCase = 1;

// All Functions


// Process each test case
while (currentTestCase <= totalTestCases) {
    lines.shift() // Skip empty line between test cases
    
    let inputs = [];
    try {
        inputs = lines.shift().split(' ').map(Number); // read space-separated integers
    } catch (error) {
        console.error(`Error reading input of test case ${currentTestCase}:`, error);
    }

    let maxLenLadder = 0;
    for (let i = 0; i < inputs.length - 1; i++) {
        const difference = Math.abs(inputs[i] - inputs[i + 1]);
        if (difference > maxLenLadder) {
            maxLenLadder = difference;
        }
    }

    // Write Output for each test case
    outputLines.push(`Case #${currentTestCase}: ${maxLenLadder}`);

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));