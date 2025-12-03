const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_3_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .replace(/\s+/g, " ")
  .trim()
  .split("|");

function reto_3a() {
  let sumJoltage = 0;
  input.forEach((bank) => {
    let firstDigit = null;
    let secondDigit = null;
    let index = null;
    for (let i = 0; i < bank.length - 1; i++) {
      if (firstDigit === null || Number(bank.charAt(i)) > firstDigit) {
        index = i;
        firstDigit = Number(bank.charAt(i));
      }
    }
    for (let j = index + 1; j < bank.length; j++) {
      if (secondDigit === null || Number(bank.charAt(j)) > secondDigit) {
        secondDigit = Number(bank.charAt(j));
      }
    }
    sumJoltage += Number(firstDigit.toString() + secondDigit.toString());
  });
  console.log(sumJoltage);
}

function reto_3b() {
  let sumJoltage = 0;
  input.forEach((bank) => {
    let digits = 12;
    let lastIndex = 0;
    let max = null;
    let index = 0;
    let number = "";
    while (digits > 0) {
      if (max === null || Number(bank.charAt(index)) > max) {
        max = Number(bank.charAt(index));
        lastIndex = index;
      }

      if (bank.charAt(index) === "9" || index === bank.length - digits) {
        number = number + max.toString();
        index = lastIndex + 1;
        digits--;
        max = null;
      } else {
        index++;
      }
    }
    sumJoltage += Number(number);
  });
  console.log(sumJoltage);
}

module.exports = {
  reto_3a,
  reto_3b,
};
