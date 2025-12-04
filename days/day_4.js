const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_4_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .replace(/\s+/g, " ")
  .trim()
  .split("|");

let matrix = input.map((line) => line.split(""));
const get = (r, c) => matrix?.[r]?.[c];

function isAccessible(row, col) {
  let adjacentRolls = 0;

  if (get(row - 1, col) === "@") adjacentRolls++;
  if (get(row - 1, col - 1) === "@") adjacentRolls++;
  if (get(row - 1, col + 1) === "@") adjacentRolls++;
  if (get(row + 1, col) === "@") adjacentRolls++;
  if (get(row + 1, col - 1) === "@") adjacentRolls++;
  if (get(row + 1, col + 1) === "@") adjacentRolls++;
  if (get(row, col - 1) === "@") adjacentRolls++;
  if (get(row, col + 1) === "@") adjacentRolls++;

  return adjacentRolls < 4 ? true : false;
}

function reto_4a() {
  let rolls = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "@") {
        rolls += isAccessible(i, j) ? 1 : 0;
      }
    }
  }
  console.log(rolls);
}

function reto_4b() {
  let rolls = 0;
  let coordenadas = [null];
  while (coordenadas.length > 0) {
    coordenadas = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === "@" && isAccessible(i, j)) {
          coordenadas.push({ i, j });
          rolls++;
        }
      }
    }
    coordenadas.forEach(({ i, j }) => (matrix[i][j] = "."));
  }
  console.log(rolls);
}

module.exports = {
  reto_4a,
  reto_4b,
};
