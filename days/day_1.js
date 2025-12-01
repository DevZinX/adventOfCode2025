const { readFileSync } = require("node:fs");

const input = readFileSync("inputs/day_1_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .replace(/\n/g, "|")
  .replace(/\s+/g, " ")
  .trim()
  .split("|");

function reto_1a() {
  let at0 = 0;
  let dial = 50;
  input.forEach((rotation) => {
    let direction = rotation.charAt(0);
    let diferencia = rotation.substring(1) % 100;
    if (direction === "L") diferencia = -diferencia;

    dial = (100 + dial + diferencia) % 100;
    if (dial === 0) at0++;
  });

  console.log(at0);
}

function reto_1b() {
  let pass0 = 0;
  let dial = 50;
  input.forEach((rotation) => {
    let direction = rotation.charAt(0);
    let centenas = Math.floor(rotation.substring(1) / 100);
    let diferencia = rotation.substring(1) % 100;

    pass0 = pass0 + centenas;
    if (direction === "L") diferencia = -diferencia;

    let oldDial = dial;
    dial = (100 + dial + diferencia) % 100;
    if (
      (direction === "R" && dial < oldDial) ||
      (direction === "L" && dial > oldDial)
    )
      pass0++;
  });

  console.log(pass0);
}

module.exports = {
  reto_1a,
  reto_1b,
};
