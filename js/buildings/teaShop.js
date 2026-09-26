import * as THREE from "three";

import {
  addBox,
  addCollider,
  createSignTexture,
  createWindow
} from "./details.js";


export function createTeaShop(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const width = 6;
  const depth = 6;
  const height = 3.4;


  const wallMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x403c3b,
      roughness: 0.75
    });


  const floorMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x554c45,
      roughness: 0.72
    });


  addBox(
    scene,
    x,
    0.06,
    z,
    width,
    0.12,
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
    Back
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


  /*
    Sides
  */

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
    Front side pieces
  */

  addBox(
    scene,
    x - 2.35,
    height / 2,
    z - depth / 2,
    1.3,
    height,
    0.16,
    wallMaterial
  );


  addBox(
    scene,
    x + 2.35,
    height / 2,
    z - depth / 2,
    1.3,
    height,
    0.16,
    wallMaterial
  );


  addCollider(
    colliders,
    x - 2.35,
    z - depth / 2,
    1.3,
    0.16
  );


  addCollider(
    colliders,
    x + 2.35,
    z - depth / 2,
    1.3,
    0.16
  );


  /*
    Header
  */

  addBox(
    scene,
    x,
    3,
    z - depth / 2,
    3.4,
    0.8,
    0.16,
    wallMaterial
  );


  /*
    Sign
  */

  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        3,
        0.75
      ),

      new THREE.MeshBasicMaterial({

        map:
          createSignTexture(
            "武林茶铺",
            "#123d3a",
            "#8effd9"
          )

      })

    );


  sign.position.set(
    x,
    2.85,
    z - depth / 2 - 0.1
  );


  scene.add(sign);


  /*
    Window
  */

  createWindow(
    scene,
    x - 2.25,
    1.55,
    z - depth / 2 - 0.1,
    0,
    true
  );


  /*
    Counter
  */

  const counterMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x7a5942
    });


  addBox(
    scene,
    x,
    0.55,
    z + 1.8,
    3.5,
    1.1,
    0.65,
    counterMaterial
  );


  addCollider(
    colliders,
    x,
    z + 1.8,
    3.5,
    0.65
  );


  /*
    Drink machines
  */

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    addBox(
      scene,
      x - 1 + i,
      1.35,
      z + 2.35,
      0.55,
      0.75,
      0.4,
      new THREE.MeshStandardMaterial({
        color:
          i === 0
            ? 0xdedede
            : i === 1
              ? 0x9fc7c1
              : 0xc9b29c,
        metalness: 0.2,
        roughness: 0.5
      })
    );

  }


  /*
    Menu boards
  */

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const board =
      new THREE.Mesh(

        new THREE.PlaneGeometry(
          0.85,
          1.15
        ),

        new THREE.MeshBasicMaterial({
          map:
            createSignTexture(
              i === 0
                ? "奶茶"
                : i === 1
                  ? "水果茶"
                  : "咖啡",
              "#f4eee1",
              "#333333"
            )
        })

      );


    board.position.set(
      x - 1.05 + i * 1.05,
      2.05,
      z + depth / 2 - 0.12
    );


    board.rotation.y =
      Math.PI;


    scene.add(board);

  }


  /*
    Interior light
  */

  const light =
    new THREE.PointLight(
      0xffd6a1,
      5,
      8,
      2
    );


  light.position.set(
    x,
    2.5,
    z
  );


  scene.add(light);

}
