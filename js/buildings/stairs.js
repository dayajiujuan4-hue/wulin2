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

    reverse = false,

    baseHeight = 0,

    visual = true

  } = options;


  const material =
    new THREE.MeshStandardMaterial({
      color: 0x77736d,
      roughness: 0.82
    });


  const totalHeight =
    steps * stepHeight;


  const totalLength =
    steps * stepDepth;


  /* =====================================================
     VISUAL STEPS
  ===================================================== */

  if (visual) {

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
        level * stepHeight;


      let px = x;
      let pz = z;


      if (
        direction === "z"
      ) {

        pz =
          z -
          totalLength / 2 +
          stepDepth / 2 +
          i * stepDepth;

      } else {

        px =
          x -
          totalLength / 2 +
          stepDepth / 2 +
          i * stepDepth;

      }


      const geometry =
        direction === "z"

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
        baseHeight + height / 2,
        pz
      );


      step.receiveShadow =
        true;


      scene.add(step);

    }

  }


  /* =====================================================
     WALKABLE SLOPE
  ===================================================== */

  const lowHeight =
    baseHeight;


  const highHeight =
    baseHeight +
    totalHeight;


  if (
    direction === "z"
  ) {

    floorZones.push({

      type: "stairs",

      minX:
        x - width / 2,

      maxX:
        x + width / 2,

      minZ:
        z - totalLength / 2,

      maxZ:
        z + totalLength / 2,

      startHeight:
        reverse
          ? highHeight
          : lowHeight,

      endHeight:
        reverse
          ? lowHeight
          : highHeight,

      axis: "z"

    });

  } else {

    floorZones.push({

      type: "stairs",

      minX:
        x - totalLength / 2,

      maxX:
        x + totalLength / 2,

      minZ:
        z - width / 2,

      maxZ:
        z + width / 2,

      startHeight:
        reverse
          ? highHeight
          : lowHeight,

      endHeight:
        reverse
          ? lowHeight
          : highHeight,

      axis: "x"

    });

  }


  return totalHeight;

}
