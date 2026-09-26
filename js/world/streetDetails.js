import * as THREE from "three";


export function createStreetDetails(
  scene
) {

  const group =
    new THREE.Group();


  group.name =
    "StreetDetails";


  scene.add(
    group
  );


  createManholes(
    group
  );


  createDrainage(
    group
  );


  createBollards(
    group
  );


  createUtilityPoles(
    group
  );


  createWires(
    group
  );


  createTrashBags(
    group
  );


  createDeliveryBoxes(
    group
  );


  createBicycles(
    group
  );

}


/* =====================================================
   MANHOLES
===================================================== */

function createManholes(
  parent
) {

  const geometry =
    new THREE.CylinderGeometry(
      0.42,
      0.42,
      0.025,
      20
    );


  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x373b3d,

      metalness:
        0.55,

      roughness:
        0.58

    });


  const positions = [

    [-3, 0, -8],

    [2, 0, -28],

    [-2, 0, -49],

    [5, 0, -67],

    [-24, 0, -65],

    [26, 0, -35],

    [1, 0, -101]

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
    (
      position,
      index
    ) => {

      dummy.position.set(
        position[0],
        0.035,
        position[2]
      );


      dummy.updateMatrix();


      mesh.setMatrixAt(
        index,
        dummy.matrix
      );

    }
  );


  mesh.instanceMatrix.needsUpdate =
    true;


  parent.add(
    mesh
  );

}


/* =====================================================
   DRAINAGE
===================================================== */

function createDrainage(
  parent
) {

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x303336,

      metalness:
        0.5,

      roughness:
        0.65

    });


  for (
    let z = 5;
    z > -48;
    z -= 5
  ) {

    for (
      const x of [-6, 6]
    ) {

      const drain =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.7,
            0.025,
            1.1
          ),

          material

        );


      drain.position.set(
        x,
        0.032,
        z
      );


      parent.add(
        drain
      );


      /*
        Drain slots
      */

      for (
        let i = -2;
        i <= 2;
        i++
      ) {

        const slot =
          new THREE.Mesh(

            new THREE.BoxGeometry(
              0.5,
              0.01,
              0.035
            ),

            new THREE.MeshBasicMaterial({
              color: 0x090a0b
            })

          );


        slot.position.set(
          x,
          0.048,
          z + i * 0.17
        );


        parent.add(
          slot
        );

      }

    }

  }

}


/* =====================================================
   BOLLARDS
===================================================== */

function createBollards(
  parent
) {

  const geometry =
    new THREE.CylinderGeometry(
      0.09,
      0.12,
      0.75,
      8
    );


  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x3c4145,

      metalness:
        0.45,

      roughness:
        0.55

    });


  const positions = [];


  for (
    let z = 7;
    z > -48;
    z -= 7
  ) {

    positions.push(
      [-7.2, z],
      [7.2, z]
    );

  }


  const mesh =
    new THREE.InstancedMesh(
      geometry,
      material,
      positions.length
    );


  const dummy =
    new THREE.Object3D();


  positions.forEach(
    (
      position,
      index
    ) => {

      dummy.position.set(
        position[0],
        0.375,
        position[1]
      );


      dummy.updateMatrix();


      mesh.setMatrixAt(
        index,
        dummy.matrix
      );

    }
  );


  mesh.instanceMatrix.needsUpdate =
    true;


  parent.add(
    mesh
  );

}


/* =====================================================
   UTILITY POLES
===================================================== */

function createUtilityPoles(
  parent
) {

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x45484a,

      metalness:
        0.38,

      roughness:
        0.72

    });


  const positions = [

    [29, -7],

    [29, -22],

    [29, -38],

    [-11, -87],

    [-11, -106]

  ];


  for (
    const [
      x,
      z
    ] of positions
  ) {

    const pole =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          0.11,
          0.15,
          6,
          8
        ),

        material

      );


    pole.position.set(
      x,
      3,
      z
    );


    parent.add(
      pole
    );


    /*
      Cross arm
  */

    const arm =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          1.4,
          0.09,
          0.09
        ),

        material

      );


    arm.position.set(
      x,
      5.25,
      z
    );


    parent.add(
      arm
    );

  }

}


/* =====================================================
   WIRES
===================================================== */

function createWires(
  parent
) {

  const material =
    new THREE.LineBasicMaterial({

      color:
        0x111214,

      transparent:
        true,

      opacity:
        0.85

    });


  const routes = [

    [
      [29, 5.25, -7],
      [29, 4.9, -14],
      [29, 5.25, -22]
    ],

    [
      [29, 5.25, -22],
      [29, 4.8, -30],
      [29, 5.25, -38]
    ],

    [
      [-11, 5.25, -87],
      [-11, 4.8, -96],
      [-11, 5.25, -106]
    ]

  ];


  for (
    const route of routes
  ) {

    const curve =
      new THREE.CatmullRomCurve3(

        route.map(
          point =>
            new THREE.Vector3(
              ...point
            )
        )

      );


    const points =
      curve.getPoints(
        20
      );


    const geometry =
      new THREE.BufferGeometry()
        .setFromPoints(
          points
        );


    const wire =
      new THREE.Line(
        geometry,
        material
      );


    parent.add(
      wire
    );

  }

}


/* =====================================================
   TRASH
===================================================== */

function createTrashBags(
  parent
) {

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x17191a,

      roughness:
        0.92

    });


  const positions = [

    [30, -12],

    [30.4, -13],

    [-12, -90],

    [-11.7, -91],

    [12, -44]

  ];


  for (
    const [
      x,
      z
    ] of positions
  ) {

    const bag =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.28,
          7,
          6
        ),

        material

      );


    bag.scale.set(
      1,
      1.25,
      0.9
    );


    bag.position.set(
      x,
      0.3,
      z
    );


    parent.add(
      bag
    );

  }

}


/* =====================================================
   DELIVERY BOXES
===================================================== */

function createDeliveryBoxes(
  parent
) {

  const material =
    new THREE.MeshStandardMaterial({
      color: 0xa57b4f,
      roughness: 0.9
    });


  const positions = [

    [11.8, -18],

    [12.1, -18.5],

    [-12.1, -33],

    [30.1, -28]

  ];


  positions.forEach(
    (
      position,
      index
    ) => {

      const box =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.55,
            0.4 +
            index % 2 *
            0.15,
            0.5
          ),

          material

        );


      box.position.set(
        position[0],
        0.25,
        position[1]
      );


      box.rotation.y =
        index *
        0.37;


      parent.add(
        box
      );

    }
  );

}


/* =====================================================
   SIMPLE BICYCLES
===================================================== */

function createBicycles(
  parent
) {

  const positions = [

    [10.8, -10, 0.1],

    [-10.8, -24, -0.2],

    [29.7, -18, 0.15],

    [-11.2, -98, -0.1]

  ];


  for (
    const [
      x,
      z,
      rotation
    ] of positions
  ) {

    createBicycle(
      parent,
      x,
      z,
      rotation
    );

  }

}


function createBicycle(
  parent,
  x,
  z,
  rotation
) {

  const root =
    new THREE.Group();


  root.position.set(
    x,
    0,
    z
  );


  root.rotation.y =
    rotation;


  parent.add(
    root
  );


  const dark =
    new THREE.MeshStandardMaterial({
      color: 0x202326,
      metalness: 0.5
    });


  const wheelGeometry =
    new THREE.TorusGeometry(
      0.32,
      0.025,
      6,
      14
    );


  for (
    const offset of [-0.55, 0.55]
  ) {

    const wheel =
      new THREE.Mesh(
        wheelGeometry,
        dark
      );


    wheel.position.set(
      offset,
      0.34,
      0
    );


    wheel.rotation.y =
      Math.PI / 2;


    root.add(
      wheel
    );

  }


  const frameMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x7f9eb8,

      metalness:
        0.55,

      roughness:
        0.4

    });


  const frame =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.9,
        0.045,
        0.045
      ),

      frameMaterial

    );


  frame.position.y =
    0.48;


  frame.rotation.z =
    0.15;


  root.add(
    frame
  );


  const seat =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.25,
        0.06,
        0.12
      ),

      dark

    );


  seat.position.set(
    -0.1,
    0.73,
    0
  );


  root.add(
    seat
  );

}
