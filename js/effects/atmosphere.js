import * as THREE from "three";


let particles = null;


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
      (
        Math.random() -
        0.5
      ) *
      90;


    positions[
      i * 3 + 1
    ] =
      0.8 +
      Math.random() *
      7;


    positions[
      i * 3 + 2
    ] =
      25 -
      Math.random() *
      160;

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


  const material =
    new THREE.PointsMaterial({

      color:
        0xffe3c0,

      size:
        0.035,

      transparent:
        true,

      opacity:
        0.22,

      depthWrite:
        false

    });


  particles =
    new THREE.Points(
      geometry,
      material
    );


  scene.add(
    particles
  );


  return particles;

}


export function updateAtmosphere(
  delta,
  time
) {

  if (
    !particles
  ) {

    return;

  }


  particles.rotation.y =
    Math.sin(
      time * 0.04
    ) *
    0.015;

}
