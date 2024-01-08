import { Perf } from "r3f-perf";
import {
  OrbitControls,
  Environment,
  Stage,
  GizmoHelper,
  GizmoViewport,
  Float,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RubiksModel, setDebug } from "./RubiksModel";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useSpring } from "@react-spring/three";
import { getAllPiecesOnSide, rotateData } from "./RubiksData";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OC } from "three/addons/controls/OrbitControls.js";

const cameraPos = {
  x: -9.915287478471756,
  y: 7.221840303237467,
  z: -7.546472067564382,
};

const cameraRot = {
  isEuler: true,
  _x: -2.3193670651578024,
  _y: -0.720444373328884,
  _z: -2.5240592653536598,
  _order: "XYZ",
};

function CameraLogger() {
  const { camera, gl } = useThree();
  const controls = new OC(camera, gl.domElement);
  controls.addEventListener("change", function () {
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
  });
  camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
  camera.rotation.set(cameraRot._x, cameraRot._y, cameraRot._z);
}

export default function Experience() {
  const edges = Array(12)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );
      const quaternion = new THREE.Quaternion();
      const from = new THREE.Quaternion();
      const animFrom = new THREE.Quaternion();
      const to = new THREE.Quaternion();

      return {
        ref: useRef(),
        id: `edge-${i}`,
        spring,
        api,
        quaternion,
        from,
        animFrom,
        to,
      };
    });
  const corners = Array(8)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );
      const quaternion = new THREE.Quaternion();
      const from = new THREE.Quaternion();
      const animFrom = new THREE.Quaternion();
      const to = new THREE.Quaternion();

      return {
        ref: useRef(),
        id: `corner-${i}`,
        spring,
        api,
        quaternion,
        from,
        animFrom,
        to,
      };
    });

  const fixed = Array(6)
    .fill()
    .map((_, i) => {
      const [spring, api] = useSpring(
        () => ({ t: 0, config: { mass: 5, tension: 200 } }),
        []
      );
      const quaternion = new THREE.Quaternion();
      const from = new THREE.Quaternion();
      const animFrom = new THREE.Quaternion();
      const to = new THREE.Quaternion();

      return {
        ref: useRef(),
        id: `fixed-${i}`,
        spring,
        api,
        quaternion,
        from,
        animFrom,
        to,
      };
    });

  useFrame(() => {
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

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const rotate = (piece, side, cw, useSpring = true) => {
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

    if (useSpring) {
      piece.from.copy(piece.to);
      piece.to.premultiply(q);
      piece.animFrom.copy(piece.ref.current.quaternion);
      piece.api.start({ from: { t: 0 }, to: { t: 1 } });
    } else {
      piece.ref.current.quaternion.premultiply(q);
    }
  };

  let qDown = false;
  let shiftDown = false;
  useEffect(() => {
    const unsubscribeKeys = subscribeKeys(
      (state) => state.F || state.U || state.B || state.D || state.L || state.R,
      (pressed) => {
        if (pressed) {
          let side = Object.entries(getKeys()).filter(
            ([key, value]) => value
          )[0][0];

          console.log(side);

          const sidePiecesIdx = getAllPiecesOnSide(side);
          const sidePieces = [
            ...sidePiecesIdx["edges"].map((value) => edges[value]),
            ...sidePiecesIdx["corners"].map((value) => corners[value]),
            ...sidePiecesIdx["fixed"].map((value) => fixed[value]),
          ];

          if (qDown) {
            sidePieces.forEach((piece) => {
              setDebug(piece, true);
            });
          } else {
            sidePieces.forEach((piece) => {
              rotate(piece, side, !shiftDown);
            });
            rotateData(side, !shiftDown);
          }
        }
      }
    );

    const foo = (side) => {
      if (["F", "U", "B", "D", "L", "R"].indexOf(side) === -1) return;

      const sidePiecesIdx = getAllPiecesOnSide(side);
      const sidePieces = [
        ...sidePiecesIdx["edges"].map((value) => edges[value]),
        ...sidePiecesIdx["corners"].map((value) => corners[value]),
        ...sidePiecesIdx["fixed"].map((value) => fixed[value]),
      ];

      sidePieces.forEach((piece) => {
        rotate(piece, side, !shiftDown, false);
      });
      rotateData(side, !shiftDown);
    };
    window.foo = foo;
    window.getAllPiecesOnSide = getAllPiecesOnSide;

    const tenRandomMoves = () => {
      const moves = ["F", "U", "B", "D", "L", "R"];
      for (let i = 0; i < 10; i++) {
        foo(moves[Math.floor(Math.random() * moves.length)]);
      }
    };
    window.tenRandomMoves = tenRandomMoves;

    const logNormal = (mesh) => {
        const quaternion = new THREE.Quaternion();
        mesh.getWorldQuaternion(quaternion)
        console.log(quaternion);
    };
    window.logNormal = logNormal;

    const getEdge = (idx) => {
      const edge = edges[idx];
      return edge;
    };
    window.getEdge = getEdge;

    const unsubscribeQKey = subscribeKeys(
      (state) => state.Q,
      (pressed) => {
        qDown = pressed;

        if (!pressed) {
          for (let i = 0; i < edges.length; i++) setDebug(edges[i], false);
          for (let i = 0; i < corners.length; i++) setDebug(corners[i], false);
          for (let i = 0; i < fixed.length; i++) setDebug(fixed[i], false);
        }
      }
    );

    const unsubscribeShiftKey = subscribeKeys(
      (state) => state.Shift,
      (pressed) => {
        shiftDown = pressed;
      }
    );

    return () => {
      unsubscribeKeys();
      unsubscribeQKey();
      unsubscribeShiftKey();
    };
  }, []);

  return (
    <>
      {/* <CameraLogger /> */}
      <color args={["#000000"]} attach="background" />

      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport labelColor="black" />
      </GizmoHelper>

      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment={null} // TODO: add environment and make sure it works on all devices.
        preset="portrait"
        intensity={0.8}
        adjustCamera={false}
      >
        {/*<Float floatIntensity={5} rotationIntensity={1} floatingRange={[0, 0.4]}>*/}
        <RubiksModel edges={edges} corners={corners} fixed={fixed} />

        {/*</Float>*/}
        {/* <Environment files="./resting_place_1k.hdr" /> */}
      </Stage>
    </>
  );
}
