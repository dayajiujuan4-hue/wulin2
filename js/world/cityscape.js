import * as THREE from "three";


export function createCityscape(
  scene
) {

  const group =
    new THREE.Group();


  group.name =
    "HangzhouCityscape";


  scene.add(
    group
  );


  /* =====================================================
     MATERIALS
  ===================================================== */

  const materials = [

    new THREE.MeshStandardMaterial({
      color: 0x17202c,
      roughness: 0.86
    }),

    new THREE.MeshStandardMaterial({
      color: 0x202735,
      roughness: 0.82
    }),

    new THREE.MeshStandardMaterial({
      color: 0x252a32,
      roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
      color: 0x182633,
      roughness: 0.8
    })

  ];


  /* =====================================================
     DISTANT BUILDINGS
  ===================================================== */

  const buildingGeometry =
    new THREE.BoxGeometry(
      1,
      1,
      1
    );


  const buildingCount =
    72;


  const meshes = [];


  for (
    let materialIndex = 0;
    materialIndex < materials.length;
    materialIndex++
  ) {

    const mesh =
      new THREE.InstancedMesh(

        buildingGeometry,

        materials[
          materialIndex
        ],

        Math.ceil(
          buildingCount /
          materials.length
        )

      );


    mesh.castShadow =
      false;


    mesh.receiveShadow =
      false;


    mesh.frustumCulled =
      true;


    group.add(
      mesh
    );


    meshes.push(
      mesh
    );

  }


  const dummy =
    new THREE.Object3D();


  const counters =
    new Array(
      materials.length
    ).fill(0);


  /*
    Seeded pseudo-random.

    This prevents skyline layout
    changing every reload.
  */

  let seed =
    91827;


  function random() {

    seed =
      (
        seed *
        16807
      ) %
      2147483647;


    return (
      seed -
      1
    ) /
    2147483646;

  }


  for (
    let i = 0;
    i < buildingCount;
    i++
  ) {

    const side =
      i % 4;


    let x;
    let z;


    /*
      Buildings surround market,
      but stay away from playable area.
    */

    if (
      side === 0
    ) {

      x =
        -70 -
        random() *
        50;

      z =
        20 -
        random() *
        170;

    }

    else if (
      side === 1
    ) {

      x =
        70 +
        random() *
        50;

      z =
        20 -
        random() *
        170;

    }

    else if (
      side === 2
    ) {

      x =
        -90 +
        random() *
        180;

      z =
        -145 -
        random() *
        45;

    }

    else {

      x =
        -90 +
        random() *
        180;

      z =
        55 +
        random() *
        35;

    }


    const width =
      5 +
      random() *
      10;


    const depth =
      5 +
      random() *
      10;


    /*
      Some much taller buildings
      make the skyline less uniform.
    */

    let height =
      15 +
      random() *
      30;


    if (
      random() >
      0.82
    ) {

      height +=
        18 +
        random() *
        25;

    }


    dummy.position.set(
      x,
      height / 2,
      z
    );


    dummy.scale.set(
      width,
      height,
      depth
    );


    dummy.rotation.y =
      (
        random() -
        0.5
      ) *
      0.15;


    dummy.updateMatrix();


    const materialIndex =
      i %
      materials.length;


    const mesh =
      meshes[
        materialIndex
      ];


    mesh.setMatrixAt(
      counters[
        materialIndex
      ],
      dummy.matrix
    );


    counters[
      materialIndex
    ]++;

  }


  for (
    let i = 0;
    i < meshes.length;
    i++
  ) {

    meshes[
      i
    ].count =
      counters[
        i
      ];


    meshes[
      i
    ].instanceMatrix.needsUpdate =
      true;

  }


  /* =====================================================
     LANDMARK TOWERS
  ===================================================== */

  createTower(
    group,
    -72,
    -92,
    13,
    66
  );


  createTower(
    group,
    78,
    -105,
    11,
    58
  );


  createTower(
    group,
    58,
    42,
    9,
    48
  );


  /* =====================================================
     ROOFTOP RED LIGHTS
  ===================================================== */

  const warningMaterial =
    new THREE.MeshBasicMaterial({

      color:
        0xff3030,

      toneMapped:
        false

    });


  const warningGeometry =
    new THREE.SphereGeometry(
      0.18,
      8,
      6
    );


  const warningPositions = [

    [-72, 67, -92],

    [78, 59, -105],

    [58, 49, 42],

    [-91, 48, -45],

    [92, 42, -20]

  ];


  for (
    const position of
    warningPositions
  ) {

    const light =
      new THREE.Mesh(
        warningGeometry,
        warningMaterial
      );


    light.position.set(
      ...position
    );


    light.userData.cityWarningLight =
      true;


    group.add(
      light
    );

  }


  return group;

}


/* =====================================================
   TOWER
===================================================== */

function createTower(
  parent,
  x,
  z,
  width,
  height
) {

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x1b2633,

      metalness:
        0.2,

      roughness:
        0.55

    });


  const tower =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        width * 0.72
      ),

      material

    );


  tower.position.set(
    x,
    height / 2,
    z
  );


  parent.add(
    tower
  );


  /*
    illuminated crown
  */

  const crown =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width * 0.82,
        1.1,
        width * 0.8
      ),

      new THREE.MeshBasicMaterial({

        color:
          0x50bfff,

        toneMapped:
          false

      })

    );


  crown.position.set(
    x,
    height - 2,
    z
  );


  parent.add(
    crown
  );


  /*
    antenna
  */

  const antenna =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.09,
        0.09,
        7,
        6
      ),

      new THREE.MeshStandardMaterial({
        color: 0x777777
      })

    );


  antenna.position.set(
    x,
    height + 3.5,
    z
  );


  parent.add(
    antenna
  );

}
