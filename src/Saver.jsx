import { useThree } from "@react-three/fiber";
import { getSides } from "./2d-visualization/2d-rubiks-data.js";

export function Saver() {
  const { gl, scene, camera } = useThree(); // 'gl' is the renderer
  const saveImage = async () => {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };
  window.saveImage = saveImage;

  const saveImageNormal = async (filename) => {
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
    formData.append("image", blob, filename);

    try {
      const response = await fetch("http://localhost:3000/upload-normal-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  window.saveImageNormal = saveImageNormal;

  const saveImageSegmented = async (filename) => {
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
    formData.append("image", blob, filename);

    try {
      const response = await fetch("http://localhost:3000/upload-segmented-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  window.saveImageSegmented = saveImageSegmented;
}
