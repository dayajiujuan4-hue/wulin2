import * as THREE from "three";


let particles;


export function createAtmosphere(
  scene
) {

  const count =
    160;

  const positions =
    new Float32Array(
      count * 3
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    positions[
      i * 3
    ] =
      -40 +
      Math.random() *
      80;

    positions[
      i * 3 + 1
    ] =
      .5 +
      Math.random() *
      5;

    positions[
      i * 3 + 2
    ] =
      20 -
      Math.random() *
      145;

  }


  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
      positions,
      3
    )

  );


  particles =
    new THREE.Points(

      geometry,

      new THREE.PointsMaterial({

        color:
          0xffd7a4,

        size:
          .025,

        transparent:
          true,

        opacity:
          .16,

        depthWrite:
          false

      })

    );


  scene.add(
    particles
  );

}


export function updateAtmosphere(
  delta,
  time,
  camera
) {

  if (
    !particles
  ) return;


  particles.rotation.y =
    Math.sin(
      time * .04
    ) *
    .002;


  /*
    Don't animate hundreds of
    individual objects.
    One particle object only.
  */

  particles.material.opacity =
    .14 +
    Math.sin(
      time * .3
    ) *
    .015;

}
