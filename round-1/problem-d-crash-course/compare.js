const fs = require("fs");

// Change these paths if needed
const file1 = "output.txt";          // your program output
const file2 = "target_output.txt";   // expected output

function compareFiles(f1, f2) {
  try {
    const content1 = fs.readFileSync(f1, "utf8").replace(/\r\n/g, "\n");
    const content2 = fs.readFileSync(f2, "utf8").replace(/\r\n/g, "\n");

    if (content1 === content2) {
      console.log("✅ Files match exactly!");
      return;
    }

    console.log("❌ Files do NOT match. Finding differences...\n");

    const arr1 = content1.split("\n");
    const arr2 = content2.split("\n");

    const maxLines = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLines; i++) {
      if (arr1[i] !== arr2[i]) {
        console.log(`Difference at line ${i + 1}:`);
        console.log(`Your Output   : ${arr1[i] ?? "<no line>"}`);
        console.log(`Expected Output: ${arr2[i] ?? "<no line>"}`);
        return;
      }
    }

  } catch (err) {
    console.error("Error reading files:", err);
  }
}

compareFiles(file1, file2);
