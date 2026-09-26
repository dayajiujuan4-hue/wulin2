import * as THREE from "three";


function createTextTexture(
  text,
  color = "#ffffff",
  glow = "#ff3366"
) {

  const canvas =
    document.createElement("canvas");

  canvas.width = 1024;
  canvas.height = 256;

  const ctx =
    canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font =
    "bold 120px sans-serif";

  ctx.shadowColor = glow;
  ctx.shadowBlur = 35;

  ctx.fillStyle = color;

  ctx.fillText(
    text,
    512,
    128
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;

}


function createSign(
  scene,
  text,
  x,
  y,
  z,
  width,
  height,
  rotationY = 0,
  glow = "#ff3366"
) {

  const texture =
    createTextTexture(
      text,
      "#ffffff",
      glow
    );

  const material =
    new THREE.MeshBasicMaterial({

      map: texture,

      transparent: true,

      depthWrite: false,

      side: THREE.DoubleSide,

      toneMapped: false

    });


  const mesh =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        width,
        height
      ),

      material

    );


  mesh.position.set(
    x,
    y,
    z
  );

  mesh.rotation.y =
    rotationY;


  scene.add(
    mesh
  );


  return mesh;

}


export function createNeon(
  scene
) {

  const objects = [];


  objects.push(

    createSign(
      scene,
      "武林夜市",
      0,
      5,
      17.8,
      8,
      2
    )

  );


  objects.push(

    createSign(
      scene,
      "杭州味道",
      -12.8,
      3.8,
      -14,
      4,
      1.1,
      Math.PI / 2,
      "#ff8738"
    )

  );


  objects.push(

    createSign(
      scene,
      "夜生活",
      12.8,
      4,
      -37,
      4,
      1.1,
      -Math.PI / 2,
      "#38aaff"
    )

  );


  objects.push(

    createSign(
      scene,
      "武林美食",
      -27,
      4,
      -78,
      5,
      1.3,
      0,
      "#ff5a3d"
    )

  );


  objects.push(

    createSign(
      scene,
      "杭州文创",
      0,
      4,
      -112,
      5,
      1.3,
      0,
      "#ff61b7"
    )

  );


  /*
    WULIN wall
  */

  const wallMaterial =
    new THREE.MeshStandardMaterial({

      color: 0x171a22,

      roughness: 0.7

    });


  const wall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.35,
        7,
        12
      ),

      wallMaterial

    );


  wall.position.set(
    39,
    3.5,
    -66
  );


  scene.add(
    wall
  );


  objects.push(

    createSign(
      scene,
      "WULIN",
      38.78,
      4.5,
      -66,
      8,
      2.4,
      -Math.PI / 2,
      "#ff39c8"
    )

  );


  /*
    Decorative neon rings
  */

  const colors = [

    0xff3cac,
    0x3caaff,
    0xff9448

  ];


  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const material =
      new THREE.MeshStandardMaterial({

        color:
          colors[
            i % colors.length
          ],

        emissive:
          colors[
            i % colors.length
          ],

        emissiveIntensity:
          2.3,

        roughness:
          0.4

      });


    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          0.32,
          0.045,
          6,
          16
        ),

        material

      );


    ring.position.set(

      38.5,

      1.3 +
      (i % 6) * 0.8,

      -70 +
      Math.floor(i / 6) *
      4

    );


    ring.rotation.y =
      Math.PI / 2;


    ring.userData.base =
      2.3;


    ring.userData.speed =
      0.8 +
      (i % 5) *
      0.17;


    ring.userData.phase =
      i * 0.65;


    scene.add(
      ring
    );


    objects.push(
      ring
    );

  }


  return objects;

}


/*
  ★ 今回ここを正式に定義する。

  world.js と neon.js の
  import/export が一致する。
*/

export function updateNeon(
  objects,
  time
) {

  if (
    !Array.isArray(objects)
  ) {

    return;

  }


  for (
    const object of objects
  ) {

    if (
      !object ||
      !object.material
    ) {

      continue;

    }


    if (
      !(
        "emissiveIntensity"
        in object.material
      )
    ) {

      continue;

    }


    const base =
      object.userData.base ??
      2.2;


    const speed =
      object.userData.speed ??
      1;


    const phase =
      object.userData.phase ??
      0;


    object.material.emissiveIntensity =

      base +

      Math.sin(
        time * speed +
        phase
      ) *

      0.3;

  }

}
