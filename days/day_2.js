const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_2_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .replace(/\s+/g, " ")
  .trim()
  .split(",");

function reto_2a() {
  let sumInvalidIds = 0;
  input.forEach((interval) => {
    let lowerLimit = Number(interval.split("-")[0]);
    let upperLimit = Number(interval.split("-")[1]);
    for (let id = lowerLimit; id <= upperLimit; id++) {
      let stringId = id.toString();
      let invalid = true;
      if (stringId.length % 2 === 0) {
        let midLength = stringId.length / 2;
        let aux = 0;
        while (aux < stringId.length / 2) {
          if (stringId.charAt(aux) !== stringId.charAt(aux + midLength)) {
            invalid = false;
            break;
          }
          aux++;
        }
        if (invalid) {
          sumInvalidIds = sumInvalidIds + id;
        }
      }
    }
    return;
  });
  console.log(sumInvalidIds);
}

function getDivisiores(number) {
  let divisores = [];
  for (let i = 1; i <= Math.ceil(Math.sqrt(number)); i++) {
    let division = number / i;
    if (division % 1 === 0) {
      !divisores.includes(i) && divisores.push(i);
      !divisores.includes(division) && divisores.push(division);
    }
  }
  divisores = divisores.sort((a, b) => a - b);
  divisores.pop();
  return divisores;
}

function splitChar(str, size) {
  return str.match(new RegExp(`.{1,${size}}`, "g"));
}

function reto_2b() {
  let sumInvalidIds = 0;
  input.forEach((interval) => {
    let lowerLimit = Number(interval.split("-")[0]);
    let upperLimit = Number(interval.split("-")[1]);
    for (let id = lowerLimit; id <= upperLimit; id++) {
      let stringId = id.toString();
      let dividers = getDivisiores(stringId.length);
      for (let divider of dividers) {
        let splitedChar = splitChar(stringId, divider);
        if (splitedChar.every((x) => x == splitedChar[0])) {
          sumInvalidIds += id;
          break;
        }
      }
    }
  });
  console.log(sumInvalidIds);
}

module.exports = {
  reto_2a,
  reto_2b,
};
