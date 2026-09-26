import * as THREE from "three";


export function createLighting(
  scene
) {

  /*
    Global night illumination
  */

  const hemisphere =
    new THREE.HemisphereLight(
      0x526d9d,
      0x171015,
      1.35
    );

  scene.add(
    hemisphere
  );


  /*
    One shadow-casting light only.
  */

  const moon =
    new THREE.DirectionalLight(
      0x9aafe0,
      1.25
    );

  moon.position.set(
    -20,
    28,
    25
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

  scene.add(
    moon
  );


  /*
    Main market lights.
    These do NOT cast shadows.
  */

  const warmPositions = [

    [0, 4, 8],
    [0, 4, -20],
    [0, 4, -48],
    [-25, 4, -64],
    [0, 4, -68],
    [0, 4, -98],
    [27, 4, -20]

  ];


  warmPositions.forEach(
    ([x,y,z]) => {

      const light =
        new THREE.PointLight(
          0xffa45d,
          8,
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

      scene.add(
        light
      );

    }
  );

}
