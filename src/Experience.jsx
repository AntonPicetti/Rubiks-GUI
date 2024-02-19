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
import { useRef, useEffect, useMemo } from "react";
import { useSpring } from "@react-spring/three";
import { getAllPiecesOnSide, getSides, rotateData } from "./RubiksData";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OC } from "three/addons/controls/OrbitControls.js";
import { MathUtils, Line } from "three";
import { BufferGeometry, LineBasicMaterial, Vector3 } from "three";

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

const targetPosition = new THREE.Vector3(0, 0, 0); // The point to rotate around and look at

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

function* pointGenerator(camera) {
  let angle = 0; // Angle in radians
  const radius = 20; // Distance from the target point
  const heigthAmplitude = 4; // Amplitude of the heigth variation
  const speed = 3; // Rotation speed in degrees

  while (true) {
    const angleDegrees = THREE.MathUtils.radToDeg(angle) % 360; // Convert angle to degrees

    // Check if the angle is within the skip ranges
    const skipRange = 15; // Skip range in degrees
    const isSkipRange = [0, 90, 180, 270].some((degree) => {
      return (
        angleDegrees >= degree - skipRange && angleDegrees <= degree + skipRange
      );
    });

    if (!isSkipRange) {
      let x = targetPosition.x + radius * Math.sin(angle);
      let z = (camera.position.z = targetPosition.z + radius * Math.cos(angle));
      let y = (camera.position.y =
        targetPosition.y + 16 + heigthAmplitude * Math.sin(angle));
      yield { x, y, z };
    }

    // Increment the angle for the next iteration
    angle += THREE.MathUtils.degToRad(speed);

    // Adjust for skip range
    if (isSkipRange) {
      // Find the closest skip range boundary and advance to just past it
      const nextBoundary = [0, 90, 180, 270].reduce((acc, degree) => {
        const lowerBound = degree - skipRange;
        const upperBound = degree + skipRange;
        if (angleDegrees >= lowerBound && angleDegrees <= upperBound) {
          // Calculate next angle just outside the upper bound of the current skip range
          const nextAngle = upperBound + 0.1; // Add a small value to ensure it's outside the range
          return Math.min(acc, nextAngle);
        }
        return acc;
      }, 360); // Default to 360 if not within any skip range

      angle = THREE.MathUtils.degToRad(nextBoundary); // Update angle to just past the skip range
    }
  }
}

/*
This component rotates the camera arount the target point and makes it look at the
target point. It also adjusts the camera elevation based on a sine wave. Some ranges
of angles are skipped to make sure that three sides of the cube are always visible.
*/
function CameraRotator() {
  const { gl, scene, camera } = useThree(); // Assuming useThree is a hook from react-three-fiber or @react-three/fiber

  const pointIter = pointGenerator(camera); // Create an instance of the generator

  function rotateCamera() {
    // Calculate the new camera position
    const point = pointIter.next(); // Get the next angle from the generator
    camera.position.x = point.x;
    camera.position.z = point.z;
    camera.position.y = point.y;

    // Make the camera always look at the given global coordinate
    camera.lookAt(targetPosition);

    gl.render(scene, camera);
  }
  window.rotateCamera = rotateCamera;
}

function CameraPathVisualizer() {
  const { scene, camera } = useThree();
  const points = useMemo(() => {
    const pathPoints = [];
    const pointIter = pointGenerator(camera);
    let result = pointIter.next();
    while (!result.done) {
      let { x, y, z } = result.value;
      pathPoints.push(new THREE.Vector3(x, y, z));
      result = pointIter.next();
      if (pathPoints.length > 1000) {
        break; // Prevent too many points
      }
    }
    return pathPoints;
  }, []); // Empty dependency array means this only runs once

  // Create the points geometry and material
  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 1.5 });

  // Add the points to the scene
  useMemo(() => {
    const pointsObject = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsObject);
    return () => {
      scene.remove(pointsObject); // Cleanup the points from the scene when the component unmounts
    };
  }, [scene, pointsGeometry, pointsMaterial]);

  return null; // This component does not render anything itself
}

function Saver() {
  const { gl, scene, camera } = useThree(); // 'gl' is the renderer
  const saveImage = async () => {
    console.log("Saving image.");
    if (!gl) return;
    // Assuming 'scene' and 'camera' are accessible here
    gl.render(scene, camera);

    const blob = await new Promise((resolve, reject) => {
      gl.domElement.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob creation failed"));
        }
      }, "image/png");
    });

    const formData = new FormData();
    formData.append("image", blob, "scene.png");

    const sides = getSides();
    formData.append("sides", JSON.stringify(sides));

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  window.saveImage = saveImage;
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

  const rotate = (piece, side, cw, rotationWithSpring = true) => {
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

    const foo = async (side) => {
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

    const tenRandomMoves = async () => {
      const moves = ["F", "U", "B", "D", "L", "R"];
      for (let i = 0; i < 10; i++) {
        foo(moves[Math.floor(Math.random() * moves.length)]);
        await window.saveImage();
      }
    };
    window.tenRandomMoves = tenRandomMoves;

    const logNormal = (mesh) => {
      const quaternion = new THREE.Quaternion();
      mesh.getWorldQuaternion(quaternion);
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
      <Saver />
      <CameraRotator />
      <CameraPathVisualizer />
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
        <Environment files="./cobblestone_street_night_1k.hdr" background />
      </Stage>
    </>
  );
}
