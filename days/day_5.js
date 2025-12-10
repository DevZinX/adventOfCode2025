const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_5_test.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .replace(/\s+/g, " ")
  .trim()
  .split("|");

const separatorIndex = input.indexOf("");

const ranges = input.slice(0, separatorIndex).map((line) => {
  const [start, end] = line.split("-").map(Number);
  return [Number(start), Number(end)];
});

const ingredientIds = input.slice(separatorIndex + 1).map(Number);
ranges.sort((a, b) => {
  return a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];
});

function reto_5a() {
  let counter = 0;
  ingredientIds.forEach((ingedientId) => {
    for (let range of ranges) {
      if (
        Number(ingedientId) >= Number(range[0]) &&
        Number(ingedientId) <= Number(range[1])
      ) {
        counter++;
        break;
      }
    }
  });
  console.log(counter);
}

function combinaRangos(index, a, b) {
  if ((a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1])) {
    ranges[index][0] = Math.min(a[0], b[0]);
    ranges[index][1] = Math.max(a[1], b[1]);
    return true;
  }
  return false;
}

function reto_5b() {
  let a = 0;
  console.log(ranges.length);
  let take = Array(ranges.length).fill(true);
  for (let i = 0; i < ranges.length - 1; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      if (combinaRangos(j, ranges[i], ranges[j])) {
        take[i] = false;
      }
    }
  }
  console.log(take);
  for (let t = 0; t < ranges.length; t++) {
    if (take[t]) {
      a += ranges[t][1] - ranges[t][0] + 1;
    }
  }
  const suma = take
    .map((valor, index) =>
      valor ? ranges[index][1] - ranges[index][0] + 1 : 0
    )
    .reduce((acc, valor) => acc + valor, 0);
  console.log(a);
  console.log(suma);
}

module.exports = {
  reto_5a,
  reto_5b,
};
