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
    const n = parseInt(lines.shift());

    const inputs = [];
    for (let i = 0; i < n; i++) {
        try {
            inputs.push(parseInt(lines.shift())); // read each input line
        } catch (error) {
            console.error(`Error reading input line ${i + 1} of test case ${currentTestCase}:`, error);
            break;
        }
    }
    
    // Write Output for each test case
    outputLines.push(`Case #${currentTestCase}: ${inputs.join(', ')}`);

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));