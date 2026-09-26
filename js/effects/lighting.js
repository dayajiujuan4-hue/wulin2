import * as THREE from "three";


export function createLighting(
  scene
) {

  /*
    Blue night ambience
  */

  const hemisphere =
    new THREE.HemisphereLight(
      0x91aee2,
      0x34211d,
      2.35
    );


  scene.add(hemisphere);


  /*
    Moon / general city light
  */

  const moon =
    new THREE.DirectionalLight(
      0xc1d3ff,
      1.8
    );


  moon.position.set(
    -18,
    32,
    14
  );


  moon.castShadow =
    true;


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


  scene.add(moon);


  /*
    Main market lighting
  */

  const lightData = [

    [0, 4.2, 12, 0xffb866, 7],
    [0, 4.2, -5, 0xffcb82, 7],
    [0, 4.2, -22, 0xff9d5a, 7],
    [0, 4.2, -40, 0xffd18a, 7],

    [-18, 4, -61, 0xff7057, 7],
    [-29, 4, -67, 0xffb866, 7],

    [0, 4.5, -64, 0xffcb8b, 7],

    [19, 4.5, -62, 0xff42ad, 7],
    [30, 4.5, -66, 0x42aaff, 7],

    [0, 4, -91, 0xffa25d, 6],
    [0, 4, -108, 0xffd187, 6],

    [27, 4, -14, 0xff805b, 6],
    [27, 4, -33, 0x65adff, 6]

  ];


  for (
    const [
      x,
      y,
      z,
      color,
      intensity
    ]
    of lightData
  ) {

    const light =
      new THREE.PointLight(
        color,
        intensity,
        17,
        2
      );


    light.position.set(
      x,
      y,
      z
    );


    light.castShadow =
      false;


    scene.add(light);

  }

}
