import * as THREE from "three";


const FOOD_NAMES = [

  "烧烤",
  "小龙虾",
  "臭豆腐",
  "奶茶",
  "炸串",
  "冰粉",
  "烤冷面",
  "水果杯"

];


const CRAFT_NAMES = [

  "杭州文创",
  "手绘扇",
  "原创设计",
  "手作饰品",
  "草编",
  "陶艺",
  "创意百货"

];


const frameMaterial =
  new THREE.MeshStandardMaterial({

    color:
      0x555b61,

    metalness:
      .6,

    roughness:
      .38

  });


const counterMaterial =
  new THREE.MeshStandardMaterial({

    color:
      0x46413c,

    roughness:
      .75

  });


const canopyMaterials = [

  new THREE.MeshStandardMaterial({
    color: 0x2862a2
  }),

  new THREE.MeshStandardMaterial({
    color: 0xb43c38
  }),

  new THREE.MeshStandardMaterial({
    color: 0xe4e2dc
  }),

  new THREE.MeshStandardMaterial({
    color: 0x334f83
  })

];


const box =
  new THREE.BoxGeometry(
    1,
    1,
    1
  );


const poleGeometry =
  new THREE.CylinderGeometry(
    .025,
    .025,
    2.6,
    5
  );


function makeTextTexture(
  text,
  food
) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    512;

  canvas.height =
    128;

  const ctx =
    canvas.getContext(
      "2d"
    );

  ctx.fillStyle =
    food
      ? "#bc302b"
      : "#275a89";

  ctx.fillRect(
    0,
    0,
    512,
    128
  );

  ctx.fillStyle =
    "#fff";

  ctx.font =
    "bold 58px Microsoft YaHei";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    text,
    256,
    68
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;

}


function collider(
  colliders,
  x,
  z,
  w,
  d
) {

  colliders.push({

    minX: x - w / 2,
    maxX: x + w / 2,

    minZ: z - d / 2,
    maxZ: z + d / 2

  });

}


function createStall(
  scene,
  colliders,
  x,
  z,
  rotation,
  name,
  food,
  index
) {

  const group =
    new THREE.Group();


  /*
    Counter
  */

  const counter =
    new THREE.Mesh(
      box,
      counterMaterial
    );

  counter.scale.set(
    2.7,
    .75,
    1.35
  );

  counter.position.y =
    .38;

  group.add(
    counter
  );


  /*
    Four frame poles
  */

  for (
    const px of [-1.25, 1.25]
  ) {

    for (
      const pz of [-.58, .58]
    ) {

      const pole =
        new THREE.Mesh(
          poleGeometry,
          frameMaterial
        );

      pole.position.set(
        px,
        1.55,
        pz
      );

      group.add(
        pole
      );

    }

  }


  /*
    Canopy
  */

  const canopy =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        2,
        .62,
        4
      ),

      canopyMaterials[
        index %
        canopyMaterials.length
      ]

    );

  canopy.rotation.y =
    Math.PI / 4;

  canopy.scale.z =
    .65;

  canopy.position.y =
    2.95;

  group.add(
    canopy
  );


  /*
    LED
  */

  const led =
    new THREE.Mesh(

      box,

      new THREE.MeshStandardMaterial({

        color:
          0xffffff,

        emissive:
          food
            ? 0xffbd82
            : 0xb8ddff,

        emissiveIntensity:
          3.5

      })

    );

  led.scale.set(
    2.3,
    .025,
    .025
  );

  led.position.set(
    0,
    2.35,
    -.66
  );

  group.add(
    led
  );


  /*
    Sign
  */

  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        2.5,
        .6
      ),

      new THREE.MeshStandardMaterial({

        map:
          makeTextTexture(
            name,
            food
          ),

        emissive:
          food
            ? 0x53110e
            : 0x0d2948,

        emissiveIntensity:
          .8

      })

    );

  sign.position.set(
    0,
    2,
    -.69
  );

  group.add(
    sign
  );


  /*
    Food/craft impression.
    Keep it intentionally cheap.
  */

  const itemMaterial =
    new THREE.MeshStandardMaterial({

      color:
        food
          ? 0xd27a38
          : 0x74a8cf,

      roughness:
        .5

    });


  for (
    let i = 0;
    i < 6;
    i++
  ) {

    const item =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          .06,
          5,
          4
        ),

        itemMaterial

      );

    item.position.set(

      -.85 +
      i * .34,

      .82,

      -.1 +
      (i % 2) *
      .25

    );

    group.add(
      item
    );

  }


  group.position.set(
    x,
    0,
    z
  );

  group.rotation.y =
    rotation;

  scene.add(
    group
  );


  collider(
    colliders,
    x,
    z,
    rotation === 0
      ? 2.9
      : 1.7,

    rotation === 0
      ? 1.7
      : 2.9
  );

}


export function createStalls(
  scene,
  colliders
) {

  let index = 0;


  /*
    MAIN STREET
  */

  for (
    let z = 12;
    z > -47;
    z -= 6.3
  ) {

    createStall(
      scene,
      colliders,
      -6.8,
      z,
      Math.PI / 2,
      FOOD_NAMES[
        index %
        FOOD_NAMES.length
      ],
      true,
      index++
    );

    createStall(
      scene,
      colliders,
      6.8,
      z - 2.7,
      -Math.PI / 2,
      index % 3 === 0
        ? CRAFT_NAMES[
            index %
            CRAFT_NAMES.length
          ]
        : FOOD_NAMES[
            index %
            FOOD_NAMES.length
          ],
      index % 3 !== 0,
      index++
    );

  }


  /*
    FOOD ALLEY
  */

  for (
    let x = -17;
    x >= -37;
    x -= 5
  ) {

    createStall(
      scene,
      colliders,
      x,
      -60,
      0,
      FOOD_NAMES[
        index %
        FOOD_NAMES.length
      ],
      true,
      index++
    );

    createStall(
      scene,
      colliders,
      x - 2,
      -70,
      Math.PI,
      FOOD_NAMES[
        index %
        FOOD_NAMES.length
      ],
      true,
      index++
    );

  }


  /*
    NEON PLAZA
  */

  for (
    let x = 17;
    x <= 34;
    x += 5
  ) {

    createStall(
      scene,
      colliders,
      x,
      -56,
      Math.PI,
      CRAFT_NAMES[
        index %
        CRAFT_NAMES.length
      ],
      false,
      index++
    );

  }


  /*
    CREATIVE STREET
  */

  for (
    let z = -83;
    z >= -115;
    z -= 7
  ) {

    createStall(
      scene,
      colliders,
      -6.5,
      z,
      Math.PI / 2,
      CRAFT_NAMES[
        index %
        CRAFT_NAMES.length
      ],
      false,
      index++
    );

    createStall(
      scene,
      colliders,
      6.5,
      z - 3,
      -Math.PI / 2,
      CRAFT_NAMES[
        index %
        CRAFT_NAMES.length
      ],
      false,
      index++
    );

  }

}
