import { Engine, Scene, MeshBuilder, Color3 } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas);

const createScene = () => {
  const scene = new Scene(engine);

  // 在此作用域內建立方塊
  const box = MeshBuilder.CreateBox("box", {}, scene);

    // 建立材質
  const boxMaterial = new StandardMaterial("boxMaterial", scene);
  boxMaterial.diffuseColor = Color3.Random(); // 隨機顏色

  // 套用材質到方塊
  box.material = boxMaterial;

  // 預設相機 + 光源 + 環境
  scene.createDefaultCameraOrLight(true, true, true);
  scene.createDefaultEnvironment();

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});