import { getSides } from "./RubiksData";
import { useThree } from "@react-three/fiber";

export function Saver() {
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
