import * as THREE from "three";


export function createLighting(
  scene
) {

  /* =====================================================
     NIGHT AMBIENT LIGHT

     夜空は暗いが、
     人や建物はちゃんと見える。
  ===================================================== */

  const hemisphere =
    new THREE.HemisphereLight(
      0x8ba7d5,
      0x2b1d1b,
      2.15
    );


  scene.add(
    hemisphere
  );


  /* =====================================================
     MOON / CITY LIGHT
  ===================================================== */

  const moon =
    new THREE.DirectionalLight(
      0xb7cbff,
      1.75
    );


  moon.position.set(
    -18,
    32,
    14
  );


  moon.castShadow = true;


  moon.shadow.mapSize.set(
    1024,
    1024
  );


  moon.shadow.camera.left =
    -55;

  moon.shadow.camera.right =
    55;

  moon.shadow.camera.top =
    55;

  moon.shadow.camera.bottom =
    -55;


  scene.add(
    moon
  );


  /* =====================================================
     MARKET LIGHTS

     本物のライトは増やしすぎない。
  ===================================================== */

  const lights = [

    [0, 4.2, 12, 0xffb45d],
    [0, 4.2, -5, 0xffca75],
    [0, 4.2, -22, 0xffa95c],
    [0, 4.2, -40, 0xffce82],

    [-18, 4, -61, 0xff7755],
    [-29, 4, -67, 0xffba63],

    [0, 4.5, -64, 0xffca88],

    [19, 4.5, -62, 0xff3eaa],
    [30, 4.5, -66, 0x39aaff],

    [0, 4, -91, 0xff9f5b],
    [0, 4, -108, 0xffce82],

    [27, 4, -14, 0xff7a54],
    [27, 4, -33, 0x63aaff]

  ];


  for (
    const [
      x,
      y,
      z,
      color
    ]
    of lights
  ) {

    const light =
      new THREE.PointLight(
        color,
        7,
        16,
        2
      );


    light.position.set(
      x,
      y,
      z
    );


    light.castShadow = false;


    scene.add(
      light
    );

  }

}
