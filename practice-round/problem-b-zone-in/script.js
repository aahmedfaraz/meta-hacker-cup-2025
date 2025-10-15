import * as fs from 'fs';

// Read input file
const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

// Initial Variables
const testCases = parseInt(lines.shift());
const outputLines = [];
let currentTestCase = 1;

while (currentTestCase <= testCases) {
    // Read R, C, S
    const [r, _c, s] = lines.shift().split(' ').map(Number);

    const room = [];
    for (let i = 0; i < r; i++) {
        room.push(lines.shift().trim().split(''));
    }

    // Eliminate walls with distance s from boundary
    for (let step = 0; step < s; step++) {
        for (let i = 0; i < room.length; i++) {
            for (let j = 0; j < room[i].length; j++) {
                if ((i == step || i == room.length - 1 - step || j == step || j == room[i].length - 1 - step)) {
                    room[i][j] = room[i][j] === '#' ? '#' : 0;
                }
            }
        }
    }

    // Eliminate objects and their surrounding zones with distance s
    for (let i = 0; i < room.length; i++) {
        for (let j = 0; j < room[i].length; j++) {
            // If current zone is an object, eliminate it and its surrounding zones
            if (room[i][j] === '#') {
                for (let step = 1; step <= s; step++) {
                    // Up
                    if (i - step >= 0 && room[i - step][j] !== '#') room[i - step][j] = room[i - step][j] === 0 ? 0 : 1;
                    // Down
                    if (i + step <= room.length - 1 && room[i + step][j] !== '#') room[i + step][j] = room[i + step][j] === 0 ? 0 : 1;
                    // Left
                    if (j - step >= 0 && room[i][j - step] !== '#') room[i][j - step] = room[i][j - step] === 0 ? 0 : 1;
                    // Right
                    if (j + step <= room[i].length - 1 && room[i][j + step] !== '#') room[i][j + step] = room[i][j + step] === 0 ? 0 : 1;
                    // // Up-Left
                    // if (i - step >= 0 && j - step >= 0 && room[i - step][j - step] !== '#') room[i - step][j - step] = room[i - step][j - step] === 0 ? 0 : 1;
                    // // Up-Right
                    // if (i - step >= 0 && j + step <= room[i].length - 1 && room[i - step][j + step] !== '#') room[i - step][j + step] = room[i - step][j + step] === 0 ? 0 : 1;
                    // // Down-Left
                    // if (i + step <= room.length - 1 && j - step >= 0 && room[i + step][j - step] !== '#') room[i + step][j - step] = room[i + step][j - step] === 0 ? 0 : 1;
                    // // Down-Right
                    // if (i + step <= room.length - 1 && j + step <= room[i].length - 1 && room[i + step][j + step] !== '#') room[i + step][j + step] = room[i + step][j + step] === 0 ? 0 : 1;
                }
            }
        }
    }

    // Function to find all contiguous safe zones ('.') using DFS
    const visitedCells = new Set();
    const returnGroupAroundThisCell = (i, j, groups) => {
        // Base cases
        if (room[i][j] !== '.' || room[i][j] === null || visitedCells.has([i, j].join(','))) return [];
        visitedCells.add([i, j].join(','));

        // Check adjacent cells
        const up = room[i - 1] && room[i - 1][j] === '.' ? [i - 1, j] : null;
        const down = room[i + 1] && room[i + 1][j] === '.' ? [i + 1, j] : null;
        const left = room[i][j - 1] === '.' ? [i, j - 1] : null;
        const right = room[i][j + 1] === '.' ? [i, j + 1] : null;

        const nextSafeZones = 
            [up, down, left, right]
                .filter(cell => cell !== null) // Make sure cell exists
                .filter(cell => { // Make sure cell is not already in any group
                    for (const groupId in groups) {
                        if (groups[groupId].some(([x, y]) => x === cell[0] && y === cell[1])) {
                            return false;
                        }
                    }
                    return true;
                })
        return [[i, j], ...nextSafeZones.map(cell => returnGroupAroundThisCell(cell[0], cell[1], groups)).flat()];
    }

    // Collect positions of all safe zone cells
    const groups = {};
    let groupId = 0;
    room.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === '.') {
                let alreadyExistInGroup = false;
                for (const id in groups) {
                    if (groups[id].some(([x, y]) => x === i && y === j)) {
                        alreadyExistInGroup = true;
                        break;
                    }
                }
                if (!alreadyExistInGroup) {
                    groups[groupId] = returnGroupAroundThisCell(i, j, groups);
                    groupId++;
                }
            }
        });
    });
    
    // Find the group with the largest size
    const groupWithLargestSize = Object.values(groups).reduce((maxGroup, currentGroup) => {
        return currentGroup.length > maxGroup.length ? currentGroup : maxGroup;
    }, []);
    
    // Log the modified room for debugging
    console.log(`\nRoom # ${currentTestCase}:`);
    console.log('S=', s);
    room.forEach(row => console.log(row.join(' ')));
    // console.log('Groups of contiguous safe zones:', groups);
    console.log(`Size of largest group of contiguous safe zones:`, groupWithLargestSize.length);

    outputLines.push(`Case #${currentTestCase}: ${groupWithLargestSize.length}`);

    currentTestCase++;
}

// Write to output file
fs.writeFileSync('output.txt', outputLines.join('\n'));
