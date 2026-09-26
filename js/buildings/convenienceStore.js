import * as THREE from "three";

import {
  addBox,
  addCollider,
  createSignTexture
} from "./details.js";


export function createConvenienceStore(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const width = 7;
  const depth = 6;
  const height = 3.5;


  const wallMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xd7d7d3,
      roughness: 0.72
    });


  const floorMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x777777,
      roughness: 0.62
    });


  addBox(
    scene,
    x,
    0.05,
    z,
    width,
    0.1,
    depth,
    floorMaterial
  );


  floorZones.push({

    minX: x - width / 2,
    maxX: x + width / 2,

    minZ: z - depth / 2,
    maxZ: z + depth / 2,

    height: 0

  });


  /*
    Walls
  */

  addBox(
    scene,
    x,
    height / 2,
    z + depth / 2,
    width,
    height,
    0.16,
    wallMaterial
  );


  addCollider(
    colliders,
    x,
    z + depth / 2,
    width,
    0.16
  );


  for (const side of [-1, 1]) {

    addBox(
      scene,
      x + side * width / 2,
      height / 2,
      z,
      0.16,
      height,
      depth,
      wallMaterial
    );


    addCollider(
      colliders,
      x + side * width / 2,
      z,
      0.16,
      depth
    );

  }


  /*
    Glass front
  */

  const glass =
    new THREE.MeshStandardMaterial({

      color: 0x92b7c7,

      transparent: true,

      opacity: 0.38,

      metalness: 0.2,

      roughness: 0.18

    });


  addBox(
    scene,
    x - 2.4,
    1.45,
    z - depth / 2,
    1.8,
    2.9,
    0.05,
    glass
  );


  addBox(
    scene,
    x + 2.4,
    1.45,
    z - depth / 2,
    1.8,
    2.9,
    0.05,
    glass
  );


  /*
    Sign
  */

  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        4.5,
        0.8
      ),

      new THREE.MeshBasicMaterial({

        map:
          createSignTexture(
            "便利店",
            "#164e73",
            "#d9ffff"
          )

      })

    );


  sign.position.set(
    x,
    3,
    z - depth / 2 - 0.08
  );


  scene.add(sign);


  /*
    Shelves
  */

  const shelfMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xb9b6ae
    });


  for (
    let row = 0;
    row < 3;
    row++
  ) {

    const shelfZ =
      z - 1.3 + row * 1.35;


    addBox(
      scene,
      x,
      0.65,
      shelfZ,
      3.8,
      1.3,
      0.42,
      shelfMaterial
    );


    /*
      Products
  */

    for (
      let i = 0;
      i < 9;
      i++
    ) {

      const colors = [
        0xef5a4e,
        0x5a8fd6,
        0xf2c35d,
        0x72a768,
        0xe8e8e8
      ];


      addBox(
        scene,
        x - 1.6 + i * 0.4,
        1.38,
        shelfZ,
        0.22,
        0.28,
        0.18,
        new THREE.MeshStandardMaterial({
          color:
            colors[
              i % colors.length
            ]
        })
      );

    }

  }


  /*
    Register
  */

  addBox(
    scene,
    x + 2.2,
    0.55,
    z + 2,
    1.5,
    1.1,
    0.65,
    new THREE.MeshStandardMaterial({
      color: 0x52575b
    })
  );


  /*
    Strong white store light
  */

  const light =
    new THREE.PointLight(
      0xe6f4ff,
      7,
      9,
      2
    );


  light.position.set(
    x,
    2.7,
    z
  );


  scene.add(light);

}
