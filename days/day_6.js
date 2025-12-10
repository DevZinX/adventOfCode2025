const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_6_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .trim()
  .split("|");

function reto_6a() {
  let operations = input[input.length - 1].split(" ").filter(Boolean);
  let results = new Array(operations.length).fill(null);
  for (let i = 0; i < input.length - 1; i++) {
    let numbers = input[i].split(" ").filter(Boolean).map(Number);
    for (let j = 0; j < numbers.length; j++) {
      let acc = results[j];
      if (!acc) results[j] = numbers[j];
      else if (operations[j] === "*") {
        results[j] = acc * numbers[j];
      } else {
        results[j] = acc + numbers[j];
      }
    }
  }
  console.log(results.reduce((total, value) => total + value, 0));
}

function reto_6b() {
  let operations = input[input.length - 1].split(" ").filter(Boolean);
  let results = new Array(operations.length).fill(null);
  let index = 0;
  let newNumber = "";

  for (let j = 0; j < input[0].length; j++) {
    for (let i = 0; i < input.length - 1; i++) {
      newNumber += input[i][j];
    }
    if (newNumber.trim() === "") {
      index++;
    } else {
      let res = results[index];
      if (!res) {
        results[index] = Number(newNumber);
      } else if (operations[index] === "*") {
        results[index] = res * Number(newNumber);
      } else {
        results[index] = res + Number(newNumber);
      }
    }
    newNumber = "";
  }
  console.log(results.reduce((total, value) => total + value, 0));
}

module.exports = {
  reto_6a,
  reto_6b,
};
