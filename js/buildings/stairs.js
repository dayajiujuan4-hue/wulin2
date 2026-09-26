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
      color: 0x77736d,
      roughness: 0.82
    });


  const totalHeight =
    steps * stepHeight;

  const totalLength =
    steps * stepDepth;


  /* =====================================================
     VISIBLE STEPS
  ===================================================== */

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

    }

    else {

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
      height / 2,
      pz
    );


    step.receiveShadow = true;

    scene.add(step);

  }


  /* =====================================================
     WALKABLE STAIR ZONE

     見た目は階段。
     プレイヤー判定は滑らかな坂道として扱う。
  ===================================================== */

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
          ? totalHeight
          : 0,

      endHeight:
        reverse
          ? 0
          : totalHeight,

      axis:
        "z"

    });

  }

  else {

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
          ? totalHeight
          : 0,

      endHeight:
        reverse
          ? 0
          : totalHeight,

      axis:
        "x"

    });

  }


  return totalHeight;

}
