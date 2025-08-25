import { Engine, Scene, FreeCamera, UniversalCamera, Vector3, MeshBuilder, HemisphericLight, Color3 } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas);

const createScene = () => {
  const scene = new Scene(engine);

  // 在此作用域內建立方塊
  const box = MeshBuilder.CreateBox("box", {}, scene);

  // 建立第一個球體
  const sphere = MeshBuilder.CreateSphere("sphere", { segments: 2, diameterY: 2 }, scene);
  sphere.position.x = 0.5;

  // 建立第二個球體
  const sphere2 = MeshBuilder.CreateSphere("sphere2", { segments: 32, diameter: 1 }, scene);
  sphere2.position.x = -0.5;

    // 建立材質
  const boxMaterial = new StandardMaterial("boxMaterial", scene);
  boxMaterial.diffuseColor = Color3.Random(); // 隨機顏色

  // 套用材質到方塊
  box.material = boxMaterial;

  
  // 創建自由攝像機(名稱, 位置, 場景)
  const camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero()); // 對準場景中心
  camera.attachControl(canvas, true); // 允許用戶控制相機

  // 启用鼠标滚轮
  camera.inputs.addMouseWheel();

  // 創建環境光(名稱, 方向, 場景)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.9; // 調整光源強度

  /*
  // 預設相機 + 光源 + 環境
  scene.createDefaultCameraOrLight(true, true, true);
  */
  scene.createDefaultEnvironment(); // 預設環境

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});