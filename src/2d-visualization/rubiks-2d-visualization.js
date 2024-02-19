const sideNames = ["F", "U", "B", "D", "L", "R"];

const defaultColors = {
  F: "green",
  U: "yellow",
  B: "blue",
  D: "white",
  L: "red",
  R: "orange",
};

const digit2Side = {
  0: "F",
  1: "U",
  2: "B",
  3: "D",
  4: "L",
  5: "R",
}; 

const colors = ["green", "yellow", "blue", "white", "red", "orange"];

export function update(newColor) {
  const vis2d = document.getElementById("vis2d");
  vis2d.innerHTML = "";

  sideNames.forEach((side) => {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      if (i === 8) {
        div.className = `side ${side}-${i} ${defaultColors[side]}`;
      } else {
        div.className = `side ${side}-${i} ${colors[newColor[side][i]]}`;
      }
    //   div.innerText = i;
      vis2d.appendChild(div);
    }
  });
}

function main() {
  const vis2d = document.getElementById("vis2d");

  sideNames.forEach((side) => {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.className = `side ${side}-${i} ${defaultColors[side]}`;
      div.innerText = i;
      vis2d.appendChild(div);
    }
  });
}

main();
