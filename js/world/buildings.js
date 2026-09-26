import * as THREE from "three";


const unitBox =
  new THREE.BoxGeometry(
    1,
    1,
    1
  );


const buildingMaterials = [

  new THREE.MeshStandardMaterial({
    color: 0x5d6268,
    roughness: 0.95
  }),

  new THREE.MeshStandardMaterial({
    color: 0x77726b,
    roughness: 0.95
  }),

  new THREE.MeshStandardMaterial({
    color: 0x51575d,
    roughness: 0.95
  }),

  new THREE.MeshStandardMaterial({
    color: 0x6e6862,
    roughness: 0.95
  })

];


const windowDark =
  new THREE.MeshStandardMaterial({
    color: 0x151b22,
    roughness: 0.4
  });


const windowLight =
  new THREE.MeshStandardMaterial({

    color: 0xffd59a,

    emissive: 0xff9c42,

    emissiveIntensity: 0.5,

    roughness: 0.45

  });


const windowGeometry =
  new THREE.BoxGeometry(
    0.65,
    0.75,
    0.06
  );


function addCollider(
  colliders,
  x,
  z,
  width,
  depth
) {

  colliders.push({

    minX:
      x - width / 2,

    maxX:
      x + width / 2,

    minZ:
      z - depth / 2,

    maxZ:
      z + depth / 2

  });

}


/* =====================================================
   BACKGROUND BUILDING
===================================================== */

function createBuilding(
  scene,
  colliders,
  x,
  z,
  width,
  depth,
  height,
  index
) {

  const material =

    buildingMaterials[
      index %
      buildingMaterials.length
    ];


  const body =
    new THREE.Mesh(
      unitBox,
      material
    );


  body.scale.set(
    width,
    height,
    depth
  );


  body.position.set(
    x,
    height / 2,
    z
  );


  body.receiveShadow =
    true;


  scene.add(
    body
  );


  /*
    Windows
  */

  const floors =
    Math.max(
      2,
      Math.floor(
        height / 2.5
      )
    );


  const columns =
    Math.max(
      2,
      Math.floor(
        width / 2
      )
    );


  for (
    let floor = 1;
    floor < floors;
    floor++
  ) {

    for (
      let column = 0;
      column < columns;
      column++
    ) {

      const windowMesh =
        new THREE.Mesh(

          windowGeometry,

          Math.random() >
          0.72

            ? windowLight
            : windowDark

        );


      const spacing =
        width /
        columns;


      windowMesh.position.set(

        x -
        width / 2 +

        spacing / 2 +

        column *
        spacing,

        1.4 +
        floor *
        2.1,

        z -
        depth / 2 -
        0.035

      );


      scene.add(
        windowMesh
      );

    }

  }


  /*
    Roof detail
  */

  const roof =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width * 0.28,
        0.45,
        depth * 0.28
      ),

      new THREE.MeshStandardMaterial({
        color: 0x34383d
      })

    );


  roof.position.set(
    x,
    height + 0.22,
    z
  );


  scene.add(
    roof
  );


  addCollider(
    colliders,
    x,
    z,
    width,
    depth
  );

}


/* =====================================================
   CREATE BACKGROUND BUILDINGS
===================================================== */

export function createBuildings(
  scene,
  colliders
) {

  let index = 0;


  /*
    Main street
  */

  for (
    let z = 12;
    z >= -46;
    z -= 13
  ) {

    createBuilding(
      scene,
      colliders,
      -14.5,
      z,
      6,
      10,
      9 + Math.random() * 5,
      index++
    );


    createBuilding(
      scene,
      colliders,
      14.5,
      z,
      6,
      10,
      9 + Math.random() * 5,
      index++
    );

  }


  /*
    Food district background

    West side is kept mostly intact.
  */

  for (
    let x = -37;
    x <= -17;
    x += 10
  ) {

    createBuilding(
      scene,
      colliders,
      x,
      -88,
      8,
      8,
      9 + Math.random() * 4,
      index++
    );

  }


  /*
    Neon plaza background
  */

  for (
    let x = 16;
    x <= 34;
    x += 9
  ) {

    createBuilding(
      scene,
      colliders,
      x,
      -84,
      7,
      7,
      11 + Math.random() * 4,
      index++
    );

  }


  /*
    Creative district

    Leave several gaps for
    explorable buildings.
  */

  createBuilding(
    scene,
    colliders,
    -13,
    -113,
    5,
    8,
    10,
    index++
  );


  createBuilding(
    scene,
    colliders,
    13,
    -113,
    5,
    8,
    11,
    index++
  );


  /*
    Back alley

    IMPORTANT:
    Old fake buildings are reduced.

    New apartment / restaurant
    will occupy this district.
  */

  createBuilding(
    scene,
    colliders,
    34,
    -5,
    7,
    10,
    11,
    index++
  );


  createBuilding(
    scene,
    colliders,
    34,
    -39,
    7,
    9,
    12,
    index++
  );


  createBuilding(
    scene,
    colliders,
    22,
    -43,
    7,
    7,
    9,
    index++
  );

}
