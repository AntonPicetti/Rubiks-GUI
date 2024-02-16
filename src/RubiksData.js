import { update } from "./rubiks-2d-visualization";

// To begin with all pieces are in the correct place,
// the value at index 0 is 0 etc.
const edgePieces = Array(12)
  .fill()
  .map((_, idx) => idx);
const cornerPieces = Array(8)
  .fill()
  .map((_, idx) => idx);

// Medurs: "positionen på index 0 tar biten från index 1"
const pieces = {
  edges: {
    F: [7, 3, 6, 11],
    U: [0, 1, 2, 3],
    B: [5, 1, 4, 9],
    D: [8, 11, 10, 9],
    L: [6, 2, 5, 10],
    R: [4, 0, 7, 8],
  },
  corners: {
    F: [3, 2, 6, 7],
    U: [0, 1, 2, 3],
    B: [1, 0, 4, 5],
    D: [7, 6, 5, 4],
    L: [2, 1, 5, 6],
    R: [0, 3, 7, 4],
  },
  fixed: {
    F: [4],
    U: [0],
    B: [2],
    D: [5],
    L: [3],
    R: [1],
  },
};

export function rotateData(side, cw = true) {
  const edgeT = pieces["edges"][side];
  const cornerT = pieces["corners"][side];

  if (cw) {
    const tmp = edgePieces[edgeT[3]];
    edgePieces[edgeT[3]] = edgePieces[edgeT[2]];
    edgePieces[edgeT[2]] = edgePieces[edgeT[1]];
    edgePieces[edgeT[1]] = edgePieces[edgeT[0]];
    edgePieces[edgeT[0]] = tmp;

    const tmp2 = cornerPieces[cornerT[3]];
    cornerPieces[cornerT[3]] = cornerPieces[cornerT[2]];
    cornerPieces[cornerT[2]] = cornerPieces[cornerT[1]];
    cornerPieces[cornerT[1]] = cornerPieces[cornerT[0]];
    cornerPieces[cornerT[0]] = tmp2;
  } else {
    const tmp = edgePieces[edgeT[0]];
    edgePieces[edgeT[0]] = edgePieces[edgeT[1]];
    edgePieces[edgeT[1]] = edgePieces[edgeT[2]];
    edgePieces[edgeT[2]] = edgePieces[edgeT[3]];
    edgePieces[edgeT[3]] = tmp;

    const tmp2 = cornerPieces[cornerT[0]];
    cornerPieces[cornerT[0]] = cornerPieces[cornerT[1]];
    cornerPieces[cornerT[1]] = cornerPieces[cornerT[2]];
    cornerPieces[cornerT[2]] = cornerPieces[cornerT[3]];
    cornerPieces[cornerT[3]] = tmp2;
  }

  // Update 2d visualization.
  const actions = { F, U, B, D, L, R }; 
  if (cw) {
      for (let i = 0; i < 3; i++) {
        actions[side]?.();
      }
  } else {
    actions[side]?.();
  }

  update(sides);
}

export function getAllPiecesOnSide(side) {
  return {
    edges: pieces["edges"][side].map((value) => edgePieces[value]),
    corners: pieces["corners"][side].map((value) => cornerPieces[value]),
    fixed: pieces["fixed"][side], // fixed pieces are always the same
  };
}

const sides = {
  F: [0, 0, 0, 0, 0, 0, 0, 0],
  U: [1, 1, 1, 1, 1, 1, 1, 1],
  B: [2, 2, 2, 2, 2, 2, 2, 2],
  D: [3, 3, 3, 3, 3, 3, 3, 3],
  L: [4, 4, 4, 4, 4, 4, 4, 4],
  R: [5, 5, 5, 5, 5, 5, 5, 5],
};

const F = () => {
  const tmp = sides["F"][0];
  sides["F"][0] = sides["F"][1];
  sides["F"][1] = sides["F"][2];
  sides["F"][2] = sides["F"][3];
  sides["F"][3] = tmp;

  const tmp2 = sides["F"][4];
  sides["F"][4] = sides["F"][5];
  sides["F"][5] = sides["F"][6];
  sides["F"][6] = sides["F"][7];
  sides["F"][7] = tmp2;

  const tmp3 = sides["U"][6];
  sides["U"][6] = sides["L"][6];
  sides["L"][6] = sides["D"][4];
  sides["D"][4] = sides["R"][6];
  sides["R"][6] = tmp3;

  const tmp4 = sides["L"][7];
  sides["L"][7] = sides["D"][5];
  sides["D"][5] = sides["R"][7];
  sides["R"][7] = sides["U"][7];
  sides["U"][7] = tmp4;

  const tmp5 = sides["U"][3];
  sides["U"][3] = sides["L"][3];
  sides["L"][3] = sides["D"][1];
  sides["D"][1] = sides["R"][3];
  sides["R"][3] = tmp5;
};

const U = () => {
  const tmp = sides["U"][0];
  sides["U"][0] = sides["U"][1];
  sides["U"][1] = sides["U"][2];
  sides["U"][2] = sides["U"][3];
  sides["U"][3] = tmp;

  const tmp2 = sides["U"][4];
  sides["U"][4] = sides["U"][5];
  sides["U"][5] = sides["U"][6];
  sides["U"][6] = sides["U"][7];
  sides["U"][7] = tmp2;

  const tmp3 = sides["L"][7];
  sides["L"][7] = sides["F"][4];
  sides["F"][4] = sides["R"][5];
  sides["R"][5] = sides["B"][6];
  sides["B"][6] = tmp3;

  const tmp4 = sides["F"][5];
  sides["F"][5] = sides["R"][6];
  sides["R"][6] = sides["B"][7];
  sides["B"][7] = sides["L"][4];
  sides["L"][4] = tmp4;

  const tmp5 = sides["F"][1];
  sides["F"][1] = sides["R"][2];
  sides["R"][2] = sides["B"][3];
  sides["B"][3] = sides["L"][0];
  sides["L"][0] = tmp5;
};

const B = () => {
  const tmp = sides["B"][0];
  sides["B"][0] = sides["B"][1];
  sides["B"][1] = sides["B"][2];
  sides["B"][2] = sides["B"][3];
  sides["B"][3] = tmp;

  const tmp2 = sides["B"][4];
  sides["B"][4] = sides["B"][5];
  sides["B"][5] = sides["B"][6];
  sides["B"][6] = sides["B"][7];
  sides["B"][7] = tmp2;

  const tmp3 = sides["U"][4];
  sides["U"][4] = sides["R"][4];
  sides["R"][4] = sides["D"][6];
  sides["D"][6] = sides["L"][4];
  sides["L"][4] = tmp3;

  const tmp4 = sides["R"][5];
  sides["R"][5] = sides["D"][7];
  sides["D"][7] = sides["L"][5];
  sides["L"][5] = sides["U"][5];
  sides["U"][5] = tmp4;

  const tmp5 = sides["U"][1];
  sides["U"][1] = sides["R"][1];
  sides["R"][1] = sides["D"][3];
  sides["D"][3] = sides["L"][1];
  sides["L"][1] = tmp5;
};

const D = () => {
  const tmp = sides["D"][0];
  sides["D"][0] = sides["D"][1];
  sides["D"][1] = sides["D"][2];
  sides["D"][2] = sides["D"][3];
  sides["D"][3] = tmp;

  const tmp2 = sides["D"][4];
  sides["D"][4] = sides["D"][5];
  sides["D"][5] = sides["D"][6];
  sides["D"][6] = sides["D"][7];
  sides["D"][7] = tmp2;

  const tmp3 = sides["L"][6];
  sides["L"][6] = sides["B"][5];
  sides["B"][5] = sides["R"][4];
  sides["R"][4] = sides["F"][7];
  sides["F"][7] = tmp3;

  const tmp4 = sides["F"][6];
  sides["F"][6] = sides["L"][5];
  sides["L"][5] = sides["B"][4];
  sides["B"][4] = sides["R"][7];
  sides["R"][7] = tmp4;

  const tmp5 = sides["F"][3];
  sides["F"][3] = sides["L"][2];
  sides["L"][2] = sides["B"][1];
  sides["B"][1] = sides["R"][0];
  sides["R"][0] = tmp5;
};

const L = () => {
  const tmp = sides["L"][0];
  sides["L"][0] = sides["L"][1];
  sides["L"][1] = sides["L"][2];
  sides["L"][2] = sides["L"][3];
  sides["L"][3] = tmp;

  const tmp2 = sides["L"][4];
  sides["L"][4] = sides["L"][5];
  sides["L"][5] = sides["L"][6];
  sides["L"][6] = sides["L"][7];
  sides["L"][7] = tmp2;

  const tmp3 = sides["U"][5];
  sides["U"][5] = sides["B"][5];
  sides["B"][5] = sides["D"][5];
  sides["D"][5] = sides["F"][5];
  sides["F"][5] = tmp3;

  const tmp4 = sides["B"][6];
  sides["B"][6] = sides["D"][6];
  sides["D"][6] = sides["F"][6];
  sides["F"][6] = sides["U"][6];
  sides["U"][6] = tmp4;

  const tmp5 = sides["U"][2];
  sides["U"][2] = sides["B"][2];
  sides["B"][2] = sides["D"][2];
  sides["D"][2] = sides["F"][2];
  sides["F"][2] = tmp5;
};

const R = () => {
  const tmp = sides["R"][0];
  sides["R"][0] = sides["R"][1];
  sides["R"][1] = sides["R"][2];
  sides["R"][2] = sides["R"][3];
  sides["R"][3] = tmp;

  const tmp2 = sides["R"][4];
  sides["R"][4] = sides["R"][5];
  sides["R"][5] = sides["R"][6];
  sides["R"][6] = sides["R"][7];
  sides["R"][7] = tmp2;

  const tmp3 = sides["U"][7];
  sides["U"][7] = sides["F"][7];
  sides["F"][7] = sides["D"][7];
  sides["D"][7] = sides["B"][7];
  sides["B"][7] = tmp3;

  const tmp4 = sides["F"][4];
  sides["F"][4] = sides["D"][4];
  sides["D"][4] = sides["B"][4];
  sides["B"][4] = sides["U"][4];
  sides["U"][4] = tmp4;

  const tmp5 = sides["U"][0];
  sides["U"][0] = sides["F"][0];
  sides["F"][0] = sides["D"][0];
  sides["D"][0] = sides["B"][0];
  sides["B"][0] = tmp5;
};
