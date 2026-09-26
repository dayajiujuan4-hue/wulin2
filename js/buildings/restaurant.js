import * as THREE from "three";

import {
  addBox,
  addCollider,
  createWallMaterial,
  createFloorMaterial,
  createSignTexture,
  createWindow
} from "./details.js";


export function createRestaurant(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const width =
    7;

  const depth =
    7;

  const height =
    3.3;


  const wall =
    createWallMaterial(
      0xb7ad9e
    );


  const floor =
    createFloorMaterial(
      0x57483c
    );


  /*
    FLOOR
  */

  addBox(
    scene,
    x,
    0.06,
    z,
    width,
    0.12,
    depth,
    floor
  );


  floorZones.push({

    minX:
      x - width / 2,

    maxX:
      x + width / 2,

    minZ:
      z - depth / 2,

    maxZ:
      z + depth / 2,

    height:
      0

  });


  /*
    BACK WALL
  */

  addBox(
    scene,
    x,
    height / 2,
    z + depth / 2,
    width,
    height,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x,
    z + depth / 2,
    width,
    0.18
  );


  /*
    SIDE WALLS
  */

  addBox(
    scene,
    x - width / 2,
    height / 2,
    z,
    0.18,
    height,
    depth,
    wall
  );


  addCollider(
    colliders,
    x - width / 2,
    z,
    0.18,
    depth
  );


  addBox(
    scene,
    x + width / 2,
    height / 2,
    z,
    0.18,
    height,
    depth,
    wall
  );


  addCollider(
    colliders,
    x + width / 2,
    z,
    0.18,
    depth
  );


  /*
    FRONT WALL

    Leave large entrance opening.
  */

  addBox(
    scene,
    x - 2.6,
    height / 2,
    z - depth / 2,
    1.8,
    height,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x - 2.6,
    z - depth / 2,
    1.8,
    0.18
  );


  addBox(
    scene,
    x + 2.6,
    height / 2,
    z - depth / 2,
    1.8,
    height,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x + 2.6,
    z - depth / 2,
    1.8,
    0.18
  );


  /*
    HEADER ABOVE ENTRANCE
  */

  addBox(
    scene,
    x,
    2.85,
    z - depth / 2,
    3.4,
    0.9,
    0.18,
    wall
  );


  /*
    ROOF
  */

  addBox(
    scene,
    x,
    height,
    z,
    width,
    0.16,
    depth,
    new THREE.MeshStandardMaterial({
      color: 0x47433f
    })
  );


  /*
    SIGN
  */

  const signTexture =
    createSignTexture(
      "武林小馆"
    );


  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        2.7,
        0.75
      ),

      new THREE.MeshBasicMaterial({
        map:
          signTexture
      })

    );


  sign.position.set(
    x,
    2.75,
    z - depth / 2 - 0.11
  );


  scene.add(
    sign
  );


  /*
    WINDOWS
  */

  createWindow(
    scene,
    x - 2.4,
    1.65,
    z - depth / 2 - 0.1
  );


  createWindow(
    scene,
    x + 2.4,
    1.65,
    z - depth / 2 - 0.1
  );


  /*
    COUNTER
  */

  const counterMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x50392a,

      roughness:
        0.8

    });


  addBox(
    scene,
    x,
    0.55,
    z + 2.1,
    3.8,
    1.1,
    0.65,
    counterMaterial
  );


  addCollider(
    colliders,
    x,
    z + 2.1,
    3.8,
    0.65
  );


  /*
    TABLES
  */

  const tableMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x694936
    });


  for (
    const tx of [-1.7, 1.7]
  ) {

    for (
      const tz of [-0.8, 0.9]
    ) {

      addBox(
        scene,
        x + tx,
        0.62,
        z + tz,
        1.05,
        0.12,
        0.75,
        tableMaterial
      );


      addBox(
        scene,
        x + tx,
        0.3,
        z + tz,
        0.12,
        0.6,
        0.12,
        tableMaterial
      );

    }

  }


  /*
    WARM INTERIOR LIGHT
  */

  const light =
    new THREE.PointLight(

      0xffb66d,

      5,

      8,

      2

    );


  light.position.set(
    x,
    2.45,
    z
  );


  scene.add(
    light
  );

}
