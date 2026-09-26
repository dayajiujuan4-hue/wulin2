import * as THREE from "three";


export function createCityLights(
  scene
) {

  const group =
    new THREE.Group();


  group.name =
    "CityLights";


  scene.add(
    group
  );


  const warmMaterial =
    new THREE.MeshBasicMaterial({

      color:
        0xffc16c,

      transparent:
        true,

      opacity:
        0.8,

      toneMapped:
        false

    });


  const coolMaterial =
    new THREE.MeshBasicMaterial({

      color:
        0x73bfff,

      transparent:
        true,

      opacity:
        0.65,

      toneMapped:
        false

    });


  const geometry =
    new THREE.PlaneGeometry(
      0.65,
      0.9
    );


  const count =
    220;


  const warm =
    new THREE.InstancedMesh(
      geometry,
      warmMaterial,
      count
    );


  const cool =
    new THREE.InstancedMesh(
      geometry,
      coolMaterial,
      count
    );


  warm.frustumCulled =
    true;


  cool.frustumCulled =
    true;


  group.add(
    warm,
    cool
  );


  const dummy =
    new THREE.Object3D();


  let warmCount =
    0;


  let coolCount =
    0;


  let seed =
    42371;


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


  /*
    Left skyline
  */

  for (
    let building = 0;
    building < 9;
    building++
  ) {

    const x =
      -72 -
      building *
      4.8;


    const z =
      15 -
      random() *
      145;


    const floors =
      6 +
      Math.floor(
        random() *
        14
      );


    for (
      let floor = 0;
      floor < floors;
      floor++
    ) {

      for (
        let windowIndex = 0;
        windowIndex < 3;
        windowIndex++
      ) {

        if (
          random() <
          0.42
        ) {

          continue;

        }


        dummy.position.set(

          x,

          2.5 +
          floor *
          2.15,

          z +
          (
            windowIndex -
            1
          ) *
          1.35

        );


        /*
          Face toward market
  */

        dummy.rotation.y =
          Math.PI / 2;


        dummy.updateMatrix();


        if (
          random() >
          0.35
        ) {

          if (
            warmCount <
            count
          ) {

            warm.setMatrixAt(
              warmCount++,
              dummy.matrix
            );

          }

        }

        else {

          if (
            coolCount <
            count
          ) {

            cool.setMatrixAt(
              coolCount++,
              dummy.matrix
            );

          }

        }

      }

    }

  }


  /*
    Right skyline
  */

  for (
    let building = 0;
    building < 9;
    building++
  ) {

    const x =
      72 +
      building *
      4.8;


    const z =
      20 -
      random() *
      150;


    const floors =
      7 +
      Math.floor(
        random() *
        13
      );


    for (
      let floor = 0;
      floor < floors;
      floor++
    ) {

      for (
        let windowIndex = 0;
        windowIndex < 3;
        windowIndex++
      ) {

        if (
          random() <
          0.45
        ) {

          continue;

        }


        dummy.position.set(

          x,

          2.5 +
          floor *
          2.15,

          z +
          (
            windowIndex -
            1
          ) *
          1.35

        );


        dummy.rotation.y =
          -Math.PI / 2;


        dummy.updateMatrix();


        if (
          random() >
          0.35
        ) {

          if (
            warmCount <
            count
          ) {

            warm.setMatrixAt(
              warmCount++,
              dummy.matrix
            );

          }

        }

        else {

          if (
            coolCount <
            count
          ) {

            cool.setMatrixAt(
              coolCount++,
              dummy.matrix
            );

          }

        }

      }

    }

  }


  warm.count =
    warmCount;


  cool.count =
    coolCount;


  warm.instanceMatrix.needsUpdate =
    true;


  cool.instanceMatrix.needsUpdate =
    true;


  return {

    group,

    warmMaterial,

    coolMaterial

  };

}


/* =====================================================
   ANIMATION
===================================================== */

export function updateCityLights(
  system,
  time
) {

  if (
    !system
  ) {

    return;

  }


  /*
    Extremely subtle city flicker.
    Not "neon flashing".
  */

  system.warmMaterial.opacity =

    0.77 +

    Math.sin(
      time *
      0.37
    ) *
    0.025;


  system.coolMaterial.opacity =

    0.62 +

    Math.sin(
      time *
      0.29 +
      1.7
    ) *
    0.02;

}
