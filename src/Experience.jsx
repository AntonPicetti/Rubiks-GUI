import {
  OrbitControls,
  Environment,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { CameraRotator } from "./camera-path";
import { Saver } from "./Saver";
import { Rubiks } from "./Rubiks/Rubiks";

function AdjustExposure() {
  const { gl } = useThree();
  gl.toneMappingExposure = 0.5; // Adjust this value to reduce or increase exposure
  return null;
}

export default function Experience() {
  return (
    <>
      <color args={["#000000"]} attach="background" />
      <Saver />
      <CameraRotator />
      {/* <CameraPathVisualizerCurves /> */}
      <OrbitControls makeDefault />
      <AdjustExposure />
      <Environment files="snowy_forest_1k.hdr" background />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport labelColor="black" />
      </GizmoHelper>

      <Rubiks />
    </>
  );
}
