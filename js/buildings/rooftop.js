import * as THREE from "three";

import {
  addBox,
  createRailing
} from "./details.js";

import {
  createStairs
} from "./stairs.js";


export function createRooftop(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const roofY =
    8.4;


  /*
    Stair 3F → roof
  */

  createStairs(
    scene,
    floorZones,
    {
      x: x + 2.5,
      z: z,
      width: 1.2,
      steps: 14,
      stepHeight: 0.2,
      stepDepth: 0.3,
      direction: "z",
      baseHeight: 5.6
    }
  );


  /*
    Roof floor
  */

  const roofMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x4d4e4c,
      roughness: 0.9
    });


  addBox(
    scene,
    x,
    roofY,
    z,
    8,
    0.18,
    9,
    roofMaterial
  );


  floorZones.push({

    minX: x - 3.8,
    maxX: x + 3.8,

    minZ: z - 4.3,
    maxZ: z + 4.3,

    height: roofY

  });


  /*
    Safety railing
  */

  createRailing(
    scene,
    x,
    roofY,
    z - 4.35,
    7.7,
    "x"
  );


  createRailing(
    scene,
    x,
    roofY,
    z + 4.35,
    7.7,
    "x"
  );


  createRailing(
    scene,
    x - 3.85,
    roofY,
    z,
    8.7,
    "z"
  );


  createRailing(
    scene,
    x + 3.85,
    roofY,
    z,
    8.7,
    "z"
  );


  /*
    Water tanks
  */

  for (
    const offset of [-2.2, 2.2]
  ) {

    const tank =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          0.7,
          0.7,
          1.2,
          14
        ),

        new THREE.MeshStandardMaterial({
          color: 0x777d7c,
          metalness: 0.35,
          roughness: 0.6
        })

      );


    tank.position.set(
      x + offset,
      roofY + 0.7,
      z + 2.4
    );


    scene.add(tank);

  }


  /*
    Rooftop ventilation
  */

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    addBox(
      scene,
      x - 2 + i * 2,
      roofY + 0.4,
      z - 2.2,
      0.8,
      0.8,
      0.8,
      new THREE.MeshStandardMaterial({
        color: 0x686d6e,
        metalness: 0.4
      })
    );

  }


  /*
    Rooftop neon sign
  */

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width = 1024;
  canvas.height = 256;


  const ctx =
    canvas.getContext("2d");


  ctx.clearRect(
    0,
    0,
    1024,
    256
  );


  ctx.font =
    "bold 140px sans-serif";


  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";


  ctx.shadowColor =
    "#ff4d88";

  ctx.shadowBlur =
    35;


  ctx.fillStyle =
    "#ff8eb4";


  ctx.fillText(
    "武林夜市",
    512,
    128
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  texture.colorSpace =
    THREE.SRGBColorSpace;


  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        6,
        1.5
      ),

      new THREE.MeshBasicMaterial({

        map: texture,

        transparent: true,

        side:
          THREE.DoubleSide

      })

    );


  sign.position.set(
    x,
    roofY + 2.2,
    z - 3.5
  );


  scene.add(sign);


  /*
    Rooftop colored glow
  */

  const light =
    new THREE.PointLight(
      0xff3f87,
      5,
      11,
      2
    );


  light.position.set(
    x,
    roofY + 2,
    z - 2
  );


  scene.add(light);

}
