import { useFrame } from "@react-three/fiber";
import { RubiksModel, setDebug } from "./Rubiks3DModel";
import * as THREE from "three";
import { useRef } from "react";
import { useSpring } from "@react-spring/three";
import { getAllPiecesOnSide, rotateData } from "./RubiksData";
import { KeyHandler } from "./KeyHandler";
import uuid4 from "uuid4";

export const Rubiks = () => {
  const edges = Array(12)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );

      return {
        ref: useRef(),
        id: `edge-${i}`,
        spring,
        api,
        quaternion: new THREE.Quaternion(),
        from: new THREE.Quaternion(),
        animFrom: new THREE.Quaternion(),
        to: new THREE.Quaternion(),
      };
    });

  const corners = Array(8)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );

      return {
        ref: useRef(),
        id: `corner-${i}`,
        spring,
        api,
        quaternion: new THREE.Quaternion(),
        from: new THREE.Quaternion(),
        animFrom: new THREE.Quaternion(),
        to: new THREE.Quaternion(),
      };
    });

  const fixed = Array(6)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );

      return {
        ref: useRef(),
        id: `fixed-${i}`,
        spring,
        api,
        quaternion: new THREE.Quaternion(),
        from: new THREE.Quaternion(),
        animFrom: new THREE.Quaternion(),
        to: new THREE.Quaternion(),
      };
    });

  useFrame(() => {
    // Animate rotation of pieces.
    [...edges, ...corners, ...fixed].forEach((piece, i) => {
      if (piece.spring.t.animation.values.length) {
        piece.ref.current.quaternion.slerpQuaternions(
          piece.animFrom,
          piece.to,
          piece.spring.t.animation.values[0]._value
        );
      }
    });
  });

  const rotatePiece = (piece, side, cw, rotationWithSpring = true) => {
    let q = new THREE.Quaternion();

    if (side === "F") {
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      if (!cw) q.invert();
    } else if (side === "U") {
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
      if (!cw) q.invert();
    } else if (side === "B") {
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      if (cw) q.invert();
    } else if (side === "D") {
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
      if (cw) q.invert();
    } else if (side === "L") {
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      if (cw) q.invert();
    } else if (side === "R") {
      q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      if (!cw) q.invert();
    }

    if (rotationWithSpring) {
      piece.from.copy(piece.to);
      piece.to.premultiply(q);
      piece.animFrom.copy(piece.ref.current.quaternion);
      piece.api.start({ from: { t: 0 }, to: { t: 1 } });
    } else {
      piece.ref.current.quaternion.premultiply(q);
    }
  };

  const rotateSide = async (
    side,
    shiftDown = false,
    rotationWithSpring = true
  ) => {
    const sidePieces = piecesOnSide(side);

    sidePieces.forEach((piece) => {
      rotatePiece(piece, side, !shiftDown, rotationWithSpring);
    });
    rotateData(side, !shiftDown);
  };

  const randomMoves = async (n) => {
    const moves = ["F", "U", "B", "D", "L", "R"];
    for (let i = 0; i < n; i++) {
      window.rotateCamera()
      rotateSide(moves[Math.floor(Math.random() * moves.length)], false, false);
      // await window.saveImage();
    }
  };
  window.randomMoves = randomMoves;

  function piecesOnSide(side) {
    const sidePiecesIdx = getAllPiecesOnSide(side);
    return [
      ...sidePiecesIdx["edges"].map((value) => edges[value]),
      ...sidePiecesIdx["corners"].map((value) => corners[value]),
      ...sidePiecesIdx["fixed"].map((value) => fixed[value]),
    ];
  }

  function debugSide(side) {
    const sidePieces = piecesOnSide(side);
    sidePieces.forEach((piece) => {
      setDebug(piece, true);
    });
  }

  function debugAll() {
    for (let i = 0; i < edges.length; i++) setDebug(edges[i], true);
    for (let i = 0; i < corners.length; i++) setDebug(corners[i], true);
    for (let i = 0; i < fixed.length; i++) setDebug(fixed[i], true);
  }
  window.debugAll = debugAll;

  function disableDebug() {
    for (let i = 0; i < edges.length; i++) setDebug(edges[i], false);
    for (let i = 0; i < corners.length; i++) setDebug(corners[i], false);
    for (let i = 0; i < fixed.length; i++) setDebug(fixed[i], false);
  }
  window.disableDebug = disableDebug;

  async function generateSegmentationDataset(n) {
    const startTime = new Date().getTime();
    for (let i = 0; i < n; i++) {
      await randomMoves(1);

      const filename = uuid4() + ".png";

      await window.saveImageNormal(filename);

      debugAll();
      await window.saveImageSegmented(filename);
      disableDebug();

      // Every 100th image, log the progress.
      if (i % 100 === 0) {
        console.log(i, (new Date().getTime() - startTime)/1000, "s");
      }
    }

    console.log("done", (new Date().getTime() - startTime)/1000, "s");
  }
  window.generateSegmentationDataset = generateSegmentationDataset;

  return (
    <>
      <RubiksModel edges={edges} corners={corners} fixed={fixed} />
      <KeyHandler
        rotateSide={rotateSide}
        debugSide={debugSide}
        disableDebug={disableDebug}
      />
    </>
  );
};
