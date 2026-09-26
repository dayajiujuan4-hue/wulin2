import * as THREE from "three";


const boxGeometry =
  new THREE.BoxGeometry(
    1,
    1,
    1
  );


const buildingMaterials = [

  new THREE.MeshStandardMaterial({
    color: 0x32363d,
    roughness: .9
  }),

  new THREE.MeshStandardMaterial({
    color: 0x403a39,
    roughness: .92
  }),

  new THREE.MeshStandardMaterial({
    color: 0x292e36,
    roughness: .88
  }),

  new THREE.MeshStandardMaterial({
    color: 0x3c3e42,
    roughness: .9
  })

];


const windowDark =
  new THREE.MeshStandardMaterial({

    color:
      0x111720,

    roughness:
      .35

  });


const windowLight =
  new THREE.MeshStandardMaterial({

    color:
      0xd9974d,

    emissive:
      0xff792d,

    emissiveIntensity:
      .75,

    roughness:
      .4

  });


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

  const group =
    new THREE.Group();


  const body =
    new THREE.Mesh(

      boxGeometry,

      buildingMaterials[
        index %
        buildingMaterials.length
      ]

    );

  body.scale.set(
    width,
    height,
    depth
  );

  body.position.y =
    height / 2;

  body.receiveShadow =
    true;

  group.add(
    body
  );


  /*
    Ground-floor commercial glow.
  */

  const shopGlow =
    new THREE.Mesh(

      boxGeometry,

      new THREE.MeshStandardMaterial({

        color:
          0x4a2c20,

        emissive:
          0x7c3514,

        emissiveIntensity:
          .55,

        roughness:
          .5

      })

    );

  shopGlow.scale.set(
    width + .08,
    2.4,
    depth + .08
  );

  shopGlow.position.y =
    1.2;

  group.add(
    shopGlow
  );


  /*
    Windows only on the street-facing
    surfaces. Shared geometries/materials.
  */

  const windowGeometry =
    new THREE.PlaneGeometry(
      .72,
      .85
    );

  const rows =
    Math.max(
      1,
      Math.floor(
        (height - 3) /
        1.7
      )
    );

  const columns =
    Math.max(
      2,
      Math.floor(
        width /
        1.5
      )
    );


  for (
    let row = 0;
    row < rows;
    row++
  ) {

    for (
      let column = 0;
      column < columns;
      column++
    ) {

      if (
        (row + column + index) %
        2 !== 0
      ) continue;

      const window =
        new THREE.Mesh(

          windowGeometry,

          Math.random() > .5
            ? windowLight
            : windowDark

        );

      window.position.set(

        -width / 2 +
        1 +
        column *
        (
          (width - 2) /
          Math.max(
            1,
            columns - 1
          )
        ),

        3.5 +
        row * 1.7,

        depth / 2 +
        .01

      );

      group.add(
        window
      );

    }

  }


  /*
    Roof details
  */

  const roof =
    new THREE.Mesh(

      boxGeometry,

      new THREE.MeshStandardMaterial({
        color: 0x171a20
      })

    );

  roof.scale.set(
    width * .45,
    .35,
    depth * .35
  );

  roof.position.set(
    0,
    height + .18,
    0
  );

  group.add(
    roof
  );


  group.position.set(
    x,
    0,
    z
  );

  scene.add(
    group
  );


  addCollider(
    colliders,
    x,
    z,
    width,
    depth
  );

}


export function createBuildings(
  scene,
  colliders
) {

  let index = 0;


  /*
    Main street west/east
  */

  for (
    let z = 17;
    z > -48;
    z -= 11
  ) {

    createBuilding(
      scene,
      colliders,
      -12,
      z,
      8,
      9,
      7 + index % 4 * 1.5,
      index++
    );

    createBuilding(
      scene,
      colliders,
      12,
      z - 3,
      8,
      9,
      8 + index % 3 * 1.6,
      index++
    );

  }


  /*
    Food district
  */

  for (
    let x = -40;
    x <= -18;
    x += 8
  ) {

    createBuilding(
      scene,
      colliders,
      x,
      -84,
      7,
      8,
      6 + index % 3,
      index++
    );

  }


  /*
    Neon plaza edge
  */

  for (
    let x = 17;
    x <= 38;
    x += 8
  ) {

    createBuilding(
      scene,
      colliders,
      x,
      -80,
      7,
      8,
      9 + index % 4,
      index++
    );

  }


  /*
    Creative street
  */

  for (
    let z = -84;
    z >= -120;
    z -= 10
  ) {

    createBuilding(
      scene,
      colliders,
      -11,
      z,
      7,
      8,
      7 + index % 3,
      index++
    );

    createBuilding(
      scene,
      colliders,
      11,
      z - 3,
      7,
      8,
      8 + index % 4,
      index++
    );

  }


  /*
    Back alley
  */

  for (
    let z = 0;
    z > -45;
    z -= 10
  ) {

    createBuilding(
      scene,
      colliders,
      22,
      z,
      6,
      7,
      8 + index % 4,
      index++
    );

    createBuilding(
      scene,
      colliders,
      33,
      z - 4,
      7,
      8,
      7 + index % 3,
      index++
    );

  }

}
