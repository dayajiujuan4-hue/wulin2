import * as THREE from "three";


function createGroundTexture() {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    1024;

  canvas.height =
    1024;

  const ctx =
    canvas.getContext(
      "2d"
    );

  ctx.fillStyle =
    "#292b30";

  ctx.fillRect(
    0,
    0,
    1024,
    1024
  );


  const size = 64;

  for (
    let y = 0;
    y < 1024;
    y += size
  ) {

    for (
      let x = 0;
      x < 1024;
      x += size
    ) {

      const b =
        39 +
        Math.floor(
          Math.random() *
          12
        );

      ctx.fillStyle =
        `rgb(${b},${b},${b + 3})`;

      ctx.fillRect(
        x + 2,
        y + 2,
        size - 4,
        size - 4
      );

    }

  }


  /*
    Tiny stains
  */

  for (
    let i = 0;
    i < 180;
    i++
  ) {

    ctx.fillStyle =
      `rgba(10,12,15,${
        .04 +
        Math.random() *
        .09
      })`;

    ctx.beginPath();

    ctx.arc(
      Math.random() * 1024,
      Math.random() * 1024,
      5 + Math.random() * 25,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }


  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  texture.wrapS =
    THREE.RepeatWrapping;

  texture.wrapT =
    THREE.RepeatWrapping;

  texture.repeat.set(
    12,
    24
  );

  return texture;

}


export function createGround(
  scene
) {

  const texture =
    createGroundTexture();

  const material =
    new THREE.MeshStandardMaterial({

      map: texture,

      color:
        0xb7bac0,

      roughness:
        .7,

      metalness:
        .08

    });


  const ground =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        110,
        170
      ),

      material

    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.position.set(
    0,
    0,
    -45
  );

  ground.receiveShadow =
    true;

  scene.add(
    ground
  );


  /*
    Wet surfaces.
    Only a few large meshes.
  */

  const wetMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x101820,

      roughness:
        .18,

      metalness:
        .3,

      transparent:
        true,

      opacity:
        .45

    });


  const wetPositions = [

    [-2, -20, 5, 11],
    [18, -64, 8, 6],
    [-23, -65, 7, 5],
    [3, -92, 6, 10]

  ];


  wetPositions.forEach(
    data => {

      const [
        x,
        z,
        width,
        depth
      ] = data;

      const wet =
        new THREE.Mesh(

          new THREE.PlaneGeometry(
            width,
            depth
          ),

          wetMaterial

        );

      wet.rotation.x =
        -Math.PI / 2;

      wet.position.set(
        x,
        .012,
        z
      );

      scene.add(
        wet
      );

    }
  );

}
