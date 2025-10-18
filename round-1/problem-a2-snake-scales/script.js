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

    let finalLadder = 0;
    let minLadderNeedForWholeTestCaseFromGround = inputs[0];
    for (let i = 0; i < inputs.length; i++) {
        minLadderNeedForWholeTestCaseFromGround = Math.min(minLadderNeedForWholeTestCaseFromGround, inputs[i]);
        const differenceWithPrevPlatform = Math.abs((inputs[i - 1] ?? 0) - inputs[i]);
        const differenceWithGround = inputs[i];
        const differenceWithNextPlatform = Math.abs((inputs[i]) - (inputs[i + 1] ?? 0));
        if (differenceWithNextPlatform < differenceWithPrevPlatform && differenceWithNextPlatform < differenceWithGround) {
            minLadderNeedForWholeTestCaseFromGround = inputs[i + 1];
        }

        let bestLadderForCurrentPlatform = Math.min(differenceWithPrevPlatform, differenceWithGround, differenceWithNextPlatform);

        finalLadder = Math.max(finalLadder, bestLadderForCurrentPlatform);
    }

    finalLadder = Math.max(finalLadder, minLadderNeedForWholeTestCaseFromGround);

    // Write Output for each test case
    outputLines.push(`Case #${currentTestCase}: ${finalLadder}`);

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));