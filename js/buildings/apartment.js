import * as THREE from "three";

import {
  addBox,
  addCollider,
  createWallMaterial,
  createFloorMaterial,
  createWindow,
  createAC,
  createPipe,
  createRailing
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

  const width = 8;
  const depth = 9;

  const floorHeight = 2.8;

  const wall =
    createWallMaterial(
      0x8f8b83
    );

  const concrete =
    createFloorMaterial(
      0x62615c
    );


  /* =====================================================
     FLOOR 1
  ===================================================== */

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

    minX: x - 4,
    maxX: x + 4,

    minZ: z - 4.5,
    maxZ: z + 4.5,

    height: 0

  });


  /*
    Exterior walls
  */

  addBox(
    scene,
    x,
    1.4,
    z + 4.5,
    8,
    2.8,
    0.18,
    wall
  );


  addCollider(
    colliders,
    x,
    z + 4.5,
    8,
    0.18
  );


  addBox(
    scene,
    x - 4,
    1.4,
    z,
    0.18,
    2.8,
    9,
    wall
  );


  addCollider(
    colliders,
    x - 4,
    z,
    0.18,
    9
  );


  addBox(
    scene,
    x + 4,
    1.4,
    z,
    0.18,
    2.8,
    9,
    wall
  );


  addCollider(
    colliders,
    x + 4,
    z,
    0.18,
    9
  );


  /*
    Front wall pieces
  */

  addBox(
    scene,
    x - 3,
    1.4,
    z - 4.5,
    2,
    2.8,
    0.18,
    wall
  );


  addBox(
    scene,
    x + 3,
    1.4,
    z - 4.5,
    2,
    2.8,
    0.18,
    wall
  );


  /*
    Mailboxes
  */

  const mailboxMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x55585b,
      metalness: 0.35
    });


  for (
    let row = 0;
    row < 2;
    row++
  ) {

    for (
      let col = 0;
      col < 4;
      col++
    ) {

      addBox(
        scene,
        x - 1.2 + col * 0.42,
        0.9 + row * 0.35,
        z + 4.35,
        0.34,
        0.26,
        0.12,
        mailboxMaterial
      );

    }

  }


  /* =====================================================
     FLOOR 2
  ===================================================== */

  createFloor(
    scene,
    floorZones,
    x,
    z,
    width,
    depth,
    floorHeight,
    concrete
  );


  /*
    Stair 1 → 2
  */

  createStairs(
    scene,
    floorZones,
    {
      x: x + 2.5,
      z: z,
      width: 1.25,
      steps: 14,
      stepHeight: 0.2,
      stepDepth: 0.3,
      direction: "z"
    }
  );


  createUpperWalls(
    scene,
    x,
    z,
    floorHeight,
    wall
  );


  /* =====================================================
     FLOOR 3
  ===================================================== */

  const thirdY =
    floorHeight * 2;


  createFloor(
    scene,
    floorZones,
    x,
    z,
    width,
    depth,
    thirdY,
    concrete
  );


  /*
    Second stair positioned on
    opposite side of building.
  */

  createStairs(
    scene,
    floorZones,
    {
      x: x - 2.5,
      z: z,
      width: 1.25,
      steps: 14,
      stepHeight: 0.2,
      stepDepth: 0.3,
      direction: "z"
    }
  );


  /*
    Important:
    second stair needs +2.8m offset.
  */

  const latestZones =
    floorZones.slice(-1);


  for (
    const zone of latestZones
  ) {

    if (
      zone.type === "stairs"
    ) {

      zone.startHeight +=
        floorHeight;

      zone.endHeight +=
        floorHeight;

    }

  }


  /*
    Move visible second staircase up.
    createStairs itself builds at ground,
    therefore move the generated meshes
    using a separate visual staircase.
  */

  createElevatedStairsVisual(
    scene,
    x - 2.5,
    z,
    floorHeight
  );


  createUpperWalls(
    scene,
    x,
    z,
    thirdY,
    wall
  );


  /* =====================================================
     WINDOWS
  ===================================================== */

  for (
    const level of [
      floorHeight,
      thirdY
    ]
  ) {

    createWindow(
      scene,
      x - 2.25,
      level + 1.4,
      z - 4.6,
      0,
      Math.random() > 0.3
    );


    createWindow(
      scene,
      x + 2.25,
      level + 1.4,
      z - 4.6,
      0,
      Math.random() > 0.3
    );

  }


  /* =====================================================
     BALCONIES
  ===================================================== */

  for (
    const level of [
      floorHeight,
      thirdY
    ]
  ) {

    addBox(
      scene,
      x,
      level,
      z - 5.15,
      7,
      0.15,
      1.3,
      concrete
    );


    floorZones.push({

      minX: x - 3.5,
      maxX: x + 3.5,

      minZ: z - 5.8,
      maxZ: z - 4.5,

      height: level

    });


    createRailing(
      scene,
      x,
      level,
      z - 5.8,
      7,
      "x"
    );

  }


  /* =====================================================
     BUILDING DETAILS
  ===================================================== */

  createAC(
    scene,
    x - 2.6,
    4.4,
    z + 4.75,
    Math.PI
  );


  createAC(
    scene,
    x + 2.3,
    7.1,
    z + 4.75,
    Math.PI
  );


  createPipe(
    scene,
    x + 3.6,
    4.2,
    z + 4.65,
    8
  );


  createPipe(
    scene,
    x - 3.55,
    4.2,
    z + 4.65,
    8
  );


  /*
    Interior lights
  */

  for (
    const y of [
      2.2,
      5,
      7.6
    ]
  ) {

    const light =
      new THREE.PointLight(
        0xffbd72,
        2.5,
        7,
        2
      );


    light.position.set(
      x,
      y,
      z
    );


    scene.add(light);

  }

}


/* =====================================================
   FLOOR
===================================================== */

function createFloor(
  scene,
  floorZones,
  x,
  z,
  width,
  depth,
  y,
  material
) {

  addBox(
    scene,
    x,
    y,
    z,
    width,
    0.16,
    depth,
    material
  );


  floorZones.push({

    minX: x - width / 2 + 0.2,
    maxX: x + width / 2 - 0.2,

    minZ: z - depth / 2 + 0.2,
    maxZ: z + depth / 2 - 0.2,

    height: y

  });

}


/* =====================================================
   UPPER WALLS
===================================================== */

function createUpperWalls(
  scene,
  x,
  z,
  baseY,
  material
) {

  const h = 2.7;


  addBox(
    scene,
    x,
    baseY + h / 2,
    z + 4.5,
    8,
    h,
    0.18,
    material
  );


  addBox(
    scene,
    x - 4,
    baseY + h / 2,
    z,
    0.18,
    h,
    9,
    material
  );


  addBox(
    scene,
    x + 4,
    baseY + h / 2,
    z,
    0.18,
    h,
    9,
    material
  );


  /*
    Front wall with central opening
  */

  addBox(
    scene,
    x - 3,
    baseY + h / 2,
    z - 4.5,
    2,
    h,
    0.18,
    material
  );


  addBox(
    scene,
    x + 3,
    baseY + h / 2,
    z - 4.5,
    2,
    h,
    0.18,
    material
  );

}


/* =====================================================
   ELEVATED STAIR VISUAL
===================================================== */

function createElevatedStairsVisual(
  scene,
  x,
  z,
  baseY
) {

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x77736d,
      roughness: 0.82
    });


  const steps = 14;

  const stepHeight = 0.2;

  const stepDepth = 0.3;

  const width = 1.25;

  const totalLength =
    steps * stepDepth;


  for (
    let i = 0;
    i < steps;
    i++
  ) {

    const height =
      (i + 1) *
      stepHeight;


    const step =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          width,
          height,
          stepDepth
        ),

        material

      );


    step.position.set(

      x,

      baseY +
      height / 2,

      z -
      totalLength / 2 +
      stepDepth / 2 +
      i *
      stepDepth

    );


    scene.add(step);

  }

}
