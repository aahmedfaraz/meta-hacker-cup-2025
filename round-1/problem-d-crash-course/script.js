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
    
    let inputs = "";
    try {
        inputs = lines.shift(); // read space-separated integers
    } catch (error) {
        console.error(`Error reading input of test case ${currentTestCase}:`, error);
    }

    let pointerA = 0;
    let pointerB = inputs.length - 1;

    let nextTurn = 'A';

    while (pointerA < pointerB) {
        if (nextTurn === 'A') {
            if (inputs[pointerA] === 'B') {
                nextTurn = 'B';
            }
            pointerA++;
        } else {
            if (inputs[pointerB] === 'A') {
                nextTurn = 'A';
            }
            pointerB--;
        }
    }

    // Write Output for each test case
    outputLines.push(`Case #${currentTestCase}: ${nextTurn === "A"  ? "Alice" : "Bob"}`);

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));