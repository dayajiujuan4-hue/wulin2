import * as THREE from "three";


export function createWetRoad(
  scene
) {

  const group =
    new THREE.Group();


  scene.add(
    group
  );


  /*
    Main wet surface
  */

  const roadMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x161a1e,

      roughness:
        0.22,

      metalness:
        0.12,

      transparent:
        true,

      opacity:
        0.62

    });


  const mainRoad =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        11.5,
        88
      ),

      roadMaterial

    );


  mainRoad.rotation.x =
    -Math.PI / 2;


  mainRoad.position.set(
    0,
    0.012,
    -21
  );


  group.add(
    mainRoad
  );


  /*
    Central plaza
  */

  const plaza =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        26,
        24
      ),

      roadMaterial.clone()

    );


  plaza.rotation.x =
    -Math.PI / 2;


  plaza.position.set(
    0,
    0.013,
    -64
  );


  group.add(
    plaza
  );


  /*
    Food alley
  */

  const food =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        27,
        9
      ),

      roadMaterial.clone()

    );


  food.rotation.x =
    -Math.PI / 2;


  food.position.set(
    -24,
    0.013,
    -65
  );


  group.add(
    food
  );


  /*
    Creative street
  */

  const creative =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        11,
        39
      ),

      roadMaterial.clone()

    );


  creative.rotation.x =
    -Math.PI / 2;


  creative.position.set(
    0,
    0.013,
    -99
  );


  group.add(
    creative
  );


  /*
    Back alley
  */

  const alley =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        7,
        58
      ),

      roadMaterial.clone()

    );


  alley.rotation.x =
    -Math.PI / 2;


  alley.position.set(
    27,
    0.013,
    -21
  );


  group.add(
    alley
  );


  /*
    Neon reflection streaks
  */

  const colors = [

    0xff285f,
    0x2aaeff,
    0xff9a32,
    0xff35c8,
    0x32e8c1

  ];


  for (
    let i = 0;
    i < 28;
    i++
  ) {

    const color =
      colors[
        i %
        colors.length
      ];


    const material =
      new THREE.MeshBasicMaterial({

        color,

        transparent:
          true,

        opacity:
          0.07 +

          Math.random() *
          0.06,

        blending:
          THREE.AdditiveBlending,

        depthWrite:
          false

      });


    const width =
      0.25 +
      Math.random() *
      1.1;


    const length =
      1.5 +
      Math.random() *
      5;


    const reflection =
      new THREE.Mesh(

        new THREE.PlaneGeometry(
          width,
          length
        ),

        material

      );


    reflection.rotation.x =
      -Math.PI / 2;


    reflection.position.set(

      -4.5 +
      Math.random() *
      9,

      0.025,

      13 -
      Math.random() *
      78

    );


    group.add(
      reflection
    );

  }


  return group;

}
