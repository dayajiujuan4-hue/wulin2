import * as THREE from "three";

import {
  addBox,
  addCollider,
  createWallMaterial,
  createFloorMaterial,
  createWindow
} from "./details.js";

import {
  createStairs
} from "./stairs.js";


export function createApartment(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const width =
    8;

  const depth =
    9;

  const floorHeight =
    2.8;


  const wall =
    createWallMaterial(
      0x9b978f
    );


  const concrete =
    createFloorMaterial(
      0x686762
    );


  /* ===================================================
     GROUND FLOOR
  =================================================== */

  addBox(
    scene,
    x,
    0.08,
    z,
    width,
    0.16,
    depth,
    concrete
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
    Back wall
  */

  addBox(
    scene,
    x,
    floorHeight / 2,
    z + depth / 2,
    width,
    floorHeight,
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
    Side walls
  */

  addBox(
    scene,
    x - width / 2,
    floorHeight / 2,
    z,
    0.18,
    floorHeight,
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
    floorHeight / 2,
    z,
    0.18,
    floorHeight,
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
    Front sections

    Large entrance opening.
  */

  addBox(
    scene,
    x - 3,
    floorHeight / 2,
    z - depth / 2,
    2,
    floorHeight,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x - 3,
    z - depth / 2,
    2,
    0.18
  );


  addBox(
    scene,
    x + 3,
    floorHeight / 2,
    z - depth / 2,
    2,
    floorHeight,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x + 3,
    z - depth / 2,
    2,
    0.18
  );


  /*
    Ground floor ceiling /
    second floor
  */

  addBox(
    scene,
    x,
    floorHeight,
    z,
    width,
    0.16,
    depth,
    concrete
  );


  /* ===================================================
     STAIRS
  =================================================== */

  createStairs(
    scene,
    floorZones,
    {

      x:
        x + 2.5,

      z:
        z,

      width:
        1.25,

      steps:
        14,

      stepHeight:
        0.2,

      stepDepth:
        0.3,

      direction:
        "z"

    }
  );


  /* ===================================================
     SECOND FLOOR WALKABLE AREA
  =================================================== */

  floorZones.push({

    minX:
      x - width / 2 + 0.25,

    maxX:
      x + width / 2 - 0.25,

    minZ:
      z - depth / 2 + 0.25,

    maxZ:
      z + depth / 2 - 0.25,

    height:
      floorHeight

  });


  /* ===================================================
     SECOND FLOOR WALLS
  =================================================== */

  const secondWallHeight =
    2.7;


  /*
    Back
  */

  addBox(
    scene,
    x,
    floorHeight + secondWallHeight / 2,
    z + depth / 2,
    width,
    secondWallHeight,
    0.18,
    wall
  );


  /*
    Left
  */

  addBox(
    scene,
    x - width / 2,
    floorHeight + secondWallHeight / 2,
    z,
    0.18,
    secondWallHeight,
    depth,
    wall
  );


  /*
    Right
  */

  addBox(
    scene,
    x + width / 2,
    floorHeight + secondWallHeight / 2,
    z,
    0.18,
    secondWallHeight,
    depth,
    wall
  );


  /*
    Partial front wall.

    Middle remains open as balcony.
  */

  addBox(
    scene,
    x - 3,
    floorHeight + secondWallHeight / 2,
    z - depth / 2,
    2,
    secondWallHeight,
    0.18,
    wall
  );


  addBox(
    scene,
    x + 3,
    floorHeight + secondWallHeight / 2,
    z - depth / 2,
    2,
    secondWallHeight,
    0.18,
    wall
  );


  /* ===================================================
     BALCONY
  =================================================== */

  const balconyDepth =
    1.5;


  addBox(
    scene,
    x,
    floorHeight,
    z - depth / 2 - balconyDepth / 2,
    width - 1,
    0.16,
    balconyDepth,
    concrete
  );


  floorZones.push({

    minX:
      x - width / 2 + 0.5,

    maxX:
      x + width / 2 - 0.5,

    minZ:
      z - depth / 2 - balconyDepth,

    maxZ:
      z - depth / 2,

    height:
      floorHeight

  });


  /*
    Balcony rail
  */

  const railMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x25282b,

      metalness:
        0.45,

      roughness:
        0.5

    });


  addBox(
    scene,
    x,
    floorHeight + 0.55,
    z - depth / 2 - balconyDepth,
    width - 1,
    0.08,
    0.08,
    railMaterial
  );


  for (
    let rx = -3;
    rx <= 3;
    rx += 1
  ) {

    addBox(
      scene,
      x + rx,
      floorHeight + 0.3,
      z - depth / 2 - balconyDepth,
      0.06,
      0.6,
      0.06,
      railMaterial
    );

  }


  /* ===================================================
     WINDOWS
  =================================================== */

  createWindow(
    scene,
    x - 2.3,
    floorHeight + 1.4,
    z - depth / 2 - 0.1
  );


  createWindow(
    scene,
    x + 2.3,
    floorHeight + 1.4,
    z - depth / 2 - 0.1
  );


  /* ===================================================
     ROOF
  =================================================== */

  addBox(
    scene,
    x,
    floorHeight * 2,
    z,
    width,
    0.18,
    depth,
    new THREE.MeshStandardMaterial({
      color: 0x4a4b49
    })
  );


  /* ===================================================
     AIR CONDITIONERS
  =================================================== */

  const acMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xbab9b3
    });


  for (
    const offset of [-2.5, 0, 2.5]
  ) {

    addBox(
      scene,
      x + offset,
      4.5,
      z + depth / 2 + 0.28,
      1,
      0.65,
      0.45,
      acMaterial
    );

  }


  /* ===================================================
     SECOND FLOOR LIGHT
  =================================================== */

  const light =
    new THREE.PointLight(

      0xffc47d,

      3,

      7,

      2

    );


  light.position.set(
    x,
    4.7,
    z
  );


  scene.add(
    light
  );

}
