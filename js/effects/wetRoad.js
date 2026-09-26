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
    Wet asphalt material
  */

  const wetMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x11171d,

      roughness:
        0.28,

      metalness:
        0.18,

      transparent:
        true,

      opacity:
        0.58

    });


  function createSurface(
    x,
    z,
    width,
    length
  ) {

    const surface =
      new THREE.Mesh(

        new THREE.PlaneGeometry(
          width,
          length
        ),

        wetMaterial.clone()

      );


    surface.rotation.x =
      -Math.PI / 2;


    surface.position.set(
      x,
      0.014,
      z
    );


    surface.receiveShadow =
      true;


    group.add(
      surface
    );


    return surface;

  }


  /*
    Roads
  */

  createSurface(
    0,
    -21,
    11.4,
    88
  );


  createSurface(
    0,
    -64,
    27,
    24
  );


  createSurface(
    -24,
    -65,
    27,
    9
  );


  createSurface(
    -31,
    -74,
    14,
    18
  );


  createSurface(
    25,
    -65,
    30,
    18
  );


  createSurface(
    0,
    -99,
    11,
    39
  );


  createSurface(
    27,
    -21,
    7,
    58
  );


  /*
    PUDDLES
  */

  const puddleMaterial =
    new THREE.MeshPhysicalMaterial({

      color:
        0x17202a,

      roughness:
        0.08,

      metalness:
        0.15,

      clearcoat:
        1,

      clearcoatRoughness:
        0.08,

      transparent:
        true,

      opacity:
        0.48

    });


  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const puddle =
      new THREE.Mesh(

        new THREE.CircleGeometry(
          0.4 +
          Math.random() *
          1.2,
          20
        ),

        puddleMaterial

      );


    puddle.scale.x =
      0.5 +
      Math.random() *
      1.8;


    puddle.rotation.x =
      -Math.PI / 2;


    puddle.rotation.z =
      Math.random() *
      Math.PI;


    puddle.position.set(

      -4.5 +
      Math.random() *
      9,

      0.027,

      12 -
      Math.random() *
      78

    );


    group.add(
      puddle
    );

  }


  /*
    NEON REFLECTIONS
  */

  const neonColors = [

    0xff234f,

    0x20a8ff,

    0xff8a25,

    0xff29c6,

    0x25e4bb

  ];


  for (
    let i = 0;
    i < 38;
    i++
  ) {

    const color =
      neonColors[
        i %
        neonColors.length
      ];


    const width =
      0.18 +
      Math.random() *
      0.85;


    const length =
      1.2 +
      Math.random() *
      5.5;


    const material =
      new THREE.MeshBasicMaterial({

        color,

        transparent:
          true,

        opacity:
          0.045 +
          Math.random() *
          0.07,

        blending:
          THREE.AdditiveBlending,

        depthWrite:
          false

      });


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

      0.031,

      12 -
      Math.random() *
      78

    );


    group.add(
      reflection
    );

  }


  /*
    Tiny reflected fragments

    Makes reflections less like
    perfect rectangles.
  */

  for (
    let i = 0;
    i < 55;
    i++
  ) {

    const color =
      neonColors[
        Math.floor(
          Math.random() *
          neonColors.length
        )
      ];


    const fragment =
      new THREE.Mesh(

        new THREE.PlaneGeometry(

          0.08 +
          Math.random() *
          0.35,

          0.15 +
          Math.random() *
          0.8

        ),

        new THREE.MeshBasicMaterial({

          color,

          transparent:
            true,

          opacity:
            0.04,

          blending:
            THREE.AdditiveBlending,

          depthWrite:
            false

        })

      );


    fragment.rotation.x =
      -Math.PI / 2;


    fragment.position.set(

      -5 +
      Math.random() *
      10,

      0.033,

      14 -
      Math.random() *
      82

    );


    group.add(
      fragment
    );

  }


  return group;

}
