import * as THREE from "three";


export function createStairs(
  scene,
  floorZones,
  options = {}
) {

  const {

    x = 0,

    z = 0,

    width = 1.4,

    steps = 14,

    stepHeight = 0.2,

    stepDepth = 0.32,

    direction = "z",

    reverse = false

  } = options;


  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x77736d,

      roughness:
        0.9

    });


  const totalHeight =
    steps *
    stepHeight;


  for (
    let i = 0;
    i < steps;
    i++
  ) {

    const level =

      reverse

        ? steps - i
        : i + 1;


    const height =
      level *
      stepHeight;


    let px =
      x;

    let pz =
      z;


    if (
      direction ===
      "z"
    ) {

      pz +=

        (
          i -
          steps / 2
        ) *

        stepDepth;

    }

    else {

      px +=

        (
          i -
          steps / 2
        ) *

        stepDepth;

    }


    const geometry =

      direction ===
      "z"

        ? new THREE.BoxGeometry(
            width,
            height,
            stepDepth
          )

        : new THREE.BoxGeometry(
            stepDepth,
            height,
            width
          );


    const step =
      new THREE.Mesh(
        geometry,
        material
      );


    step.position.set(
      px,
      height / 2,
      pz
    );


    step.receiveShadow =
      true;


    scene.add(
      step
    );


    /*
      Floor height zone
  */

    floorZones.push({

      minX:

        px -
        (
          direction === "z"
            ? width / 2
            : stepDepth / 2
        ),

      maxX:

        px +
        (
          direction === "z"
            ? width / 2
            : stepDepth / 2
        ),

      minZ:

        pz -
        (
          direction === "z"
            ? stepDepth / 2
            : width / 2
        ),

      maxZ:

        pz +
        (
          direction === "z"
            ? stepDepth / 2
            : width / 2
        ),

      height

    });

  }


  return totalHeight;

}
