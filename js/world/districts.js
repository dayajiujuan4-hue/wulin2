import * as THREE from "three";


const roadMaterial =
  new THREE.MeshStandardMaterial({

    color:
      0x34363a,

    roughness:
      .68,

    metalness:
      .06

  });


function road(
  scene,
  x,
  z,
  width,
  depth
) {

  const mesh =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        width,
        depth
      ),

      roadMaterial

    );

  mesh.rotation.x =
    -Math.PI / 2;

  mesh.position.set(
    x,
    .018,
    z
  );

  mesh.receiveShadow =
    true;

  scene.add(
    mesh
  );

}


export function createDistricts(
  scene
) {

  /*
    Main market street
  */

  road(
    scene,
    0,
    -20,
    13,
    95
  );


  /*
    Central square
  */

  road(
    scene,
    0,
    -64,
    28,
    27
  );


  /*
    Food alley - west
  */

  road(
    scene,
    -24,
    -65,
    28,
    10
  );


  /*
    Food court
  */

  road(
    scene,
    -31,
    -74,
    15,
    20
  );


  /*
    Neon plaza - east
  */

  road(
    scene,
    25,
    -65,
    32,
    19
  );


  /*
    Creative street
  */

  road(
    scene,
    0,
    -99,
    12,
    42
  );


  /*
    Back alley
  */

  road(
    scene,
    27,
    -21,
    8,
    63
  );


  /*
    Connector from main street
  */

  road(
    scene,
    16,
    -12,
    25,
    7
  );


  /*
    Connector to central square
  */

  road(
    scene,
    19,
    -47,
    22,
    7
  );


  /*
    Hidden alley
  */

  road(
    scene,
    16,
    -95,
    22,
    5
  );


  /*
    Second connector
  */

  road(
    scene,
    27,
    -84,
    6,
    25
  );

}
