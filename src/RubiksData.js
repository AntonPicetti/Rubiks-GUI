// To begin with all pieces are in the correct place,
// the value at index 0 is 0 etc.
const edgePieces = Array(12).fill().map((_, idx) => idx)
const cornerPieces = Array(8).fill().map((_, idx) => idx)

// Medurs: "positionen på index 0 tar biten från index 1"
const sides = {
    "edges": {
        "F": [7, 3, 6, 11],
        "U": [0, 1, 2, 3],
        "B": [5, 1, 4, 9],
        "D": [8, 11, 10, 9],
        "L": [6, 2, 5, 10],
        "R": [4, 0, 7, 8]
    },
    "corners": {
        "F": [3, 2, 6, 7],
        "U": [0, 1, 2, 3],
        "B": [1, 0, 4, 5],
        "D": [7, 6, 5, 4],
        "L": [2, 1, 5, 6],
        "R": [0, 3, 7, 4]
    },
    "fixed": {
        "F": [4],
        "U": [0],
        "B": [2],
        "D": [5],
        "L": [3],
        "R": [1]
    }
}

export function rotateData(side, cw=true) {
    const edgeT = sides["edges"][side]
    const cornerT = sides["corners"][side]

    if (cw) {
        const tmp = edgePieces[edgeT[3]]
        edgePieces[edgeT[3]] = edgePieces[edgeT[2]]
        edgePieces[edgeT[2]] = edgePieces[edgeT[1]]
        edgePieces[edgeT[1]] = edgePieces[edgeT[0]]
        edgePieces[edgeT[0]] = tmp

        const tmp2 = cornerPieces[cornerT[3]]
        cornerPieces[cornerT[3]] = cornerPieces[cornerT[2]]
        cornerPieces[cornerT[2]] = cornerPieces[cornerT[1]]
        cornerPieces[cornerT[1]] = cornerPieces[cornerT[0]]
        cornerPieces[cornerT[0]] = tmp2
    }
    else {
        const tmp = edgePieces[edgeT[0]]
        edgePieces[edgeT[0]] = edgePieces[edgeT[1]]
        edgePieces[edgeT[1]] = edgePieces[edgeT[2]]
        edgePieces[edgeT[2]] = edgePieces[edgeT[3]]
        edgePieces[edgeT[3]] = tmp

        const tmp2 = cornerPieces[cornerT[0]]
        cornerPieces[cornerT[0]] = cornerPieces[cornerT[1]]
        cornerPieces[cornerT[1]] = cornerPieces[cornerT[2]]
        cornerPieces[cornerT[2]] = cornerPieces[cornerT[3]]
        cornerPieces[cornerT[3]] = tmp2
    }
}

export function getAllPiecesOnSide(side) {
    return {
        edges: sides["edges"][side].map(value => edgePieces[value]),
        corners: sides["corners"][side].map(value => cornerPieces[value]),
        fixed: sides["fixed"][side] // fixed pieces are always the same
    }
}