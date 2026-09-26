import * as THREE from "three";

import {
  addBox,
  addCollider,
  createWallMaterial,
  createFloorMaterial,
  createSignTexture
} from "./details.js";


export function createCreativeShop(
  scene,
  colliders,
  floorZones,
  x,
  z
) {

  const width =
    6;

  const depth =
    7;

  const height =
    3.5;


  const wall =
    createWallMaterial(
      0xd4cec4
    );


  const floor =
    createFloorMaterial(
      0x5d574f
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
    WALLS
  */

  addBox(
    scene,
    x,
    height / 2,
    z + depth / 2,
    width,
    height,
    0.16,
    wall
  );


  addCollider(
    colliders,
    x,
    z + depth / 2,
    width,
    0.16
  );


  addBox(
    scene,
    x - width / 2,
    height / 2,
    z,
    0.16,
    height,
    depth,
    wall
  );


  addCollider(
    colliders,
    x - width / 2,
    z,
    0.16,
    depth
  );


  addBox(
    scene,
    x + width / 2,
    height / 2,
    z,
    0.16,
    height,
    depth,
    wall
  );


  addCollider(
    colliders,
    x + width / 2,
    z,
    0.16,
    depth
  );


  /*
    FRONT WALL WITH DOOR
  */

  addBox(
    scene,
    x - 2.25,
    height / 2,
    z - depth / 2,
    1.5,
    height,
    0.16,
    wall
  );


  addCollider(
    colliders,
    x - 2.25,
    z - depth / 2,
    1.5,
    0.16
  );


  addBox(
    scene,
    x + 2.25,
    height / 2,
    z - depth / 2,
    1.5,
    height,
    0.16,
    wall
  );


  addCollider(
    colliders,
    x + 2.25,
    z - depth / 2,
    1.5,
    0.16
  );


  addBox(
    scene,
    x,
    3.05,
    z - depth / 2,
    3,
    0.9,
    0.16,
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
    0.14,
    depth,
    new THREE.MeshStandardMaterial({
      color: 0x454545
    })
  );


  /*
    SIGN
  */

  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        2.6,
        0.7
      ),

      new THREE.MeshBasicMaterial({

        map:
          createSignTexture(
            "杭州文创",
            "#16394b",
            "#f6e5b7"
          )

      })

    );


  sign.position.set(
    x,
    2.85,
    z - depth / 2 - 0.1
  );


  scene.add(
    sign
  );


  /*
    DISPLAY SHELVES
  */

  const shelfMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x765943,

      roughness:
        0.85

    });


  for (
    const side of [-1, 1]
  ) {

    for (
      let i = 0;
      i < 3;
      i++
    ) {

      addBox(
        scene,
        x + side * 2.25,
        0.85,
        z - 1.6 + i * 1.5,
        0.55,
        1.7,
        1.05,
        shelfMaterial
      );

    }

  }


  /*
    CENTRAL DISPLAY
  */

  addBox(
    scene,
    x,
    0.55,
    z,
    1.8,
    1.1,
    0.9,
    shelfMaterial
  );


  /*
    DISPLAY ITEMS
  */

  const itemColors = [
    0xd05b47,
    0x5d88aa,
    0xe3c76e,
    0x78a275,
    0xa36d9c
  ];


  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const item =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          0.16,
          0.24,
          0.12
        ),

        new THREE.MeshStandardMaterial({

          color:

            itemColors[
              i %
              itemColors.length
            ]

        })

      );


    item.position.set(

      x +
      (
        Math.random() -
        0.5
      ) *
      1.4,

      1.2,

      z +
      (
        Math.random() -
        0.5
      ) *
      0.55

    );


    scene.add(
      item
    );

  }


  /*
    LIGHT
  */

  const light =
    new THREE.PointLight(

      0xffe2ad,

      4,

      7,

      2

    );


  light.position.set(
    x,
    2.7,
    z
  );


  scene.add(
    light
  );

}
