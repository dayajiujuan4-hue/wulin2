import * as THREE from "three";


export function createProps(
  scene
) {

  createBoxes(
    scene
  );

  createBins(
    scene
  );

  createStools(
    scene
  );

  createTables(
    scene
  );

  createScooters(
    scene
  );

  createPlants(
    scene
  );

}


/* =====================================================
   BOXES
===================================================== */

function createBoxes(
  scene
) {

  const geometry =
    new THREE.BoxGeometry(
      .55,
      .4,
      .55
    );

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x755437,

      roughness:
        1

    });

  const count =
    45;

  const mesh =
    new THREE.InstancedMesh(
      geometry,
      material,
      count
    );

  const dummy =
    new THREE.Object3D();


  for (
    let i = 0;
    i < count;
    i++
  ) {

    let x;
    let z;


    if (
      i < 20
    ) {

      x =
        i % 2
          ? -8
          : 8;

      z =
        10 -
        i * 3;

    }

    else {

      x =
        22 +
        Math.random() *
        10;

      z =
        -5 -
        Math.random() *
        40;

    }


    dummy.position.set(
      x +
      (Math.random() - .5),
      .2,
      z
    );

    dummy.rotation.y =
      Math.random() *
      Math.PI;

    const scale =
      .7 +
      Math.random() *
      .7;

    dummy.scale.set(
      scale,
      scale,
      scale
    );

    dummy.updateMatrix();

    mesh.setMatrixAt(
      i,
      dummy.matrix
    );

  }

  mesh.instanceMatrix
    .needsUpdate = true;

  scene.add(
    mesh
  );

}


/* =====================================================
   BINS
===================================================== */

function createBins(
  scene
) {

  const geometry =
    new THREE.BoxGeometry(
      .45,
      .7,
      .42
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x30363b
    });

  const positions = [

    [-8,-12],
    [8,-40],
    [-13,-63],
    [13,-67],
    [-29,-77],
    [28,-43],
    [7,-105]

  ];

  const mesh =
    new THREE.InstancedMesh(
      geometry,
      material,
      positions.length
    );

  const dummy =
    new THREE.Object3D();

  positions.forEach(
    ([x,z],i) => {

      dummy.position.set(
        x,
        .35,
        z
      );

      dummy.updateMatrix();

      mesh.setMatrixAt(
        i,
        dummy.matrix
      );

    }
  );

  scene.add(
    mesh
  );

}


/* =====================================================
   STOOLS
===================================================== */

function createStools(
  scene
) {

  const geometry =
    new THREE.CylinderGeometry(
      .18,
      .2,
      .38,
      6
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xc63b32
    });

  const count =
    36;

  const mesh =
    new THREE.InstancedMesh(
      geometry,
      material,
      count
    );

  const dummy =
    new THREE.Object3D();

  for (
    let i = 0;
    i < count;
    i++
  ) {

    dummy.position.set(

      -36 +
      (i % 6) *
      2.1,

      .19,

      -74 +
      Math.floor(
        i / 6
      ) *
      1.7

    );

    dummy.rotation.y =
      Math.random() *
      Math.PI;

    dummy.updateMatrix();

    mesh.setMatrixAt(
      i,
      dummy.matrix
    );

  }

  scene.add(
    mesh
  );

}


/* =====================================================
   TABLES
===================================================== */

function createTables(
  scene
) {

  const topMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xc8c5bb
    });

  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const table =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .55,
          .55,
          .07,
          12
        ),

        topMaterial

      );

    table.position.set(

      -35 +
      (i % 3) *
      4,

      .72,

      -74 +
      Math.floor(
        i / 3
      ) *
      4

    );

    scene.add(
      table
    );

  }

}


/* =====================================================
   SCOOTERS
===================================================== */

function createScooters(
  scene
) {

  const locations = [

    [24,-6,.2],
    [30,-16,-.4],
    [24,-31,.1],
    [32,-42,-.2],
    [19,-92,.3]

  ];

  locations.forEach(
    ([x,z,r],index) => {

      const group =
        new THREE.Group();

      const tire =
        new THREE.MeshStandardMaterial({
          color: 0x08090a
        });

      const body =
        new THREE.MeshStandardMaterial({

          color:
            index % 2
              ? 0x28618c
              : 0x9e3230

        });


      for (
        const pz of [-.48,.48]
      ) {

        const wheel =
          new THREE.Mesh(

            new THREE.TorusGeometry(
              .22,
              .05,
              6,
              12
            ),

            tire

          );

        wheel.rotation.y =
          Math.PI / 2;

        wheel.position.set(
          0,
          .25,
          pz
        );

        group.add(
          wheel
        );

      }


      const shell =
        new THREE.Mesh(

          new THREE.CapsuleGeometry(
            .16,
            .45,
            3,
            6
          ),

          body

        );

      shell.rotation.x =
        Math.PI / 2;

      shell.position.y =
        .48;

      group.add(
        shell
      );


      group.position.set(
        x,
        0,
        z
      );

      group.rotation.y =
        r;

      scene.add(
        group
      );

    }
  );

}


/* =====================================================
   PLANTS
===================================================== */

function createPlants(
  scene
) {

  const geometry =
    new THREE.SphereGeometry(
      .25,
      6,
      5
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x355c3b
    });

  const count =
    28;

  const leaves =
    new THREE.InstancedMesh(
      geometry,
      material,
      count
    );

  const dummy =
    new THREE.Object3D();

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const side =
      i % 2
        ? 1
        : -1;

    dummy.position.set(

      side *
      (
        9 +
        Math.random() *
        2
      ),

      .6 +
      Math.random() *
      .5,

      5 -
      Math.random() *
      110

    );

    dummy.scale.set(
      .7,
      1.5,
      .7
    );

    dummy.updateMatrix();

    leaves.setMatrixAt(
      i,
      dummy.matrix
    );

  }

  scene.add(
    leaves
  );

}
