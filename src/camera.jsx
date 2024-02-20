import * as THREE from "three";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";

let iteration = 0;
const targetPosition = new THREE.Vector3(0, 0, 0); // The point to rotate around and look at

function calculateCameraPath() {
  // One visible sector in eeach quadrant.
  const visibleSectorSize = degToRad(50);

  const poinstPerSector = 10;
  const radius = 25; // Distance from the target point
  const heigthAmplitude = 4; // Amplitude of the heigth variation
  const corners = [45, 135, 225, 315].map(degToRad);

  const points = [];
  for (let corner of corners) {
    const segment = [];
    let start = corner - visibleSectorSize / 2;
    let end = corner + visibleSectorSize / 2;
    for (
      let angle = start;
      angle < end;
      angle += (end - start) / poinstPerSector
    ) {
      let x = targetPosition.x + radius * Math.cos(angle);
      let z = targetPosition.z + radius * Math.sin(angle);
      let y = targetPosition.y + 16 + heigthAmplitude * Math.sin(angle * 10);
      segment.push(new Vector3(x, y, z));
    }
    points.push(segment);
  }

  return points;
}

/*
This component rotates the camera arount the target point and makes it look at the
target point. It also adjusts the camera elevation based on a sine wave. Some ranges
of angles are skipped to make sure that three sides of the cube are always visible.
*/
export function CameraRotator() {
  const { gl, scene, camera } = useThree();

  const cameraPath = calculateCameraPath().flat();
  const pointsLen = cameraPath.length;
  function rotateCamera() {
    const { x, y, z } = cameraPath[iteration++ % pointsLen];
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;

    camera.lookAt(targetPosition);
    gl.render(scene, camera);
  }
  window.rotateCamera = rotateCamera;
}

export function CameraPathVisualizerPoints() {
  const { scene } = useThree();
  const points = calculateCameraPath().flat();

  // Create the points geometry and material
  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 1.5,
  });

  // Add the points to the scene
  useMemo(() => {
    const pointsObject = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsObject);
    return () => {
      scene.remove(pointsObject); // Cleanup the points from the scene when the component unmounts
    };
  }, [scene, pointsGeometry, pointsMaterial]);
}

export function CameraPathVisualizerCurves() {
  const { scene } = useThree();
  const points = calculateCameraPath();

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const curves = [];
  for (let segment of points) {
    const curve = new THREE.CatmullRomCurve3(segment);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
    curves.push(new THREE.Line(tubeGeometry, material));
  }

  useMemo(() => {
    for (let curve of curves) {
      scene.add(curve);
    }
    return () => {
      for (let curve of curves) {
        scene.remove(curve);
      }
    };
  }, [
    scene,
    curves[0].geometry,
    curves[1].geometry,
    curves[2].geometry,
    curves[3].geometry,
    material,
  ]);
}

export function CameraLogger() {
  const { camera, gl } = useThree();
  const controls = new OC(camera, gl.domElement);
  controls.addEventListener("change", function () {
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
  });
}
