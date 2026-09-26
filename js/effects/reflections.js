import * as THREE from "three";


export function createReflections(
  scene
) {

  const reflections = [

    {
      x: -5,
      z: -4,
      width: 2,
      length: 8,
      color: 0xff4138
    },

    {
      x: 5,
      z: -14,
      width: 2,
      length: 7,
      color: 0x3eaaff
    },

    {
      x: -4,
      z: -29,
      width: 2.2,
      length: 9,
      color: 0xffa53c
    },

    {
      x: 5,
      z: -40,
      width: 2,
      length: 8,
      color: 0xff47c8
    },

    {
      x: -26,
      z: -65,
      width: 3,
      length: 7,
      color: 0xff563e
    },

    {
      x: 26,
      z: -65,
      width: 4,
      length: 8,
      color: 0x3c9cff
    },

    {
      x: 0,
      z: -94,
      width: 2,
      length: 8,
      color: 0x4fd9ff
    }

  ];


  for (
    const data of reflections
  ) {

    const geometry =
      new THREE.PlaneGeometry(
        data.width,
        data.length
      );


    const material =
      new THREE.MeshBasicMaterial({

        color:
          data.color,

        transparent:
          true,

        opacity:
          0.09,

        blending:
          THREE.AdditiveBlending,

        depthWrite:
          false

      });


    const reflection =
      new THREE.Mesh(
        geometry,
        material
      );


    reflection.rotation.x =
      -Math.PI / 2;


    reflection.position.set(
      data.x,
      0.018,
      data.z
    );


    scene.add(reflection);


    /*
      Softer secondary reflection
  */

    const glow =
      new THREE.Mesh(

        new THREE.PlaneGeometry(
          data.width * 1.8,
          data.length * 0.75
        ),

        new THREE.MeshBasicMaterial({

          color:
            data.color,

          transparent:
            true,

          opacity:
            0.035,

          blending:
            THREE.AdditiveBlending,

          depthWrite:
            false

        })

      );


    glow.rotation.x =
      -Math.PI / 2;


    glow.position.set(
      data.x,
      0.017,
      data.z
    );


    scene.add(glow);

  }

}
