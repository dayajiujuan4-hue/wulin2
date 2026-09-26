import * as THREE from "three";


/* =====================================================
   TEXT TEXTURE
===================================================== */

function textTexture(
  text,
  color = "#ff4c67",
  background = "rgba(0,0,0,0)"
) {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    1024;

  canvas.height =
    300;


  const ctx =
    canvas.getContext(
      "2d"
    );


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.fillStyle =
    background;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.font =
    "bold 125px sans-serif";


  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";


  ctx.shadowColor =
    color;

  ctx.shadowBlur =
    35;


  ctx.fillStyle =
    color;


  ctx.fillText(
    text,
    canvas.width / 2,
    canvas.height / 2
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  texture.colorSpace =
    THREE.SRGBColorSpace;


  return texture;

}


/* =====================================================
   CREATE SIGN
===================================================== */

function createSign(
  scene,
  text,
  x,
  y,
  z,
  rotationY,
  width,
  height,
  color
) {

  const texture =
    textTexture(
      text,
      color
    );


  const material =
    new THREE.MeshBasicMaterial({

      map:
        texture,

      transparent:
        true,

      side:
        THREE.DoubleSide,

      depthWrite:
        false

    });


  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        width,
        height
      ),

      material

    );


  sign.position.set(
    x,
    y,
    z
  );


  sign.rotation.y =
    rotationY;


  scene.add(
    sign
  );


  return sign;

}


/* =====================================================
   CREATE NEON
===================================================== */

export function createNeon(
  scene
) {

  const animated = [];


  /* ===================================================
     WULIN WALL
  =================================================== */

  const wall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.35,
        7,
        12
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x17151b,

        roughness:
          0.8

      })

    );


  wall.position.set(
    39,
    3.5,
    -66
  );


  scene.add(
    wall
  );


  createSign(
    scene,
    "WULIN",
    38.78,
    4.5,
    -66,
    -Math.PI / 2,
    8,
    2.4,
    "#ff4e8b"
  );


  /* ===================================================
     ENTRANCE
  =================================================== */

  createSign(
    scene,
    "武林夜市",
    0,
    5,
    17.8,
    0,
    6.5,
    1.7,
    "#ffbe4f"
  );


  /* ===================================================
     MAIN STREET SIGNS
  =================================================== */

  createSign(
    scene,
    "杭州味道",
    -11.3,
    4.1,
    -4,
    Math.PI / 2,
    4,
    1.15,
    "#ff4e45"
  );


  createSign(
    scene,
    "茶",
    11.3,
    4.6,
    -13,
    -Math.PI / 2,
    1.5,
    1.5,
    "#55d7ff"
  );


  createSign(
    scene,
    "小吃",
    -11.3,
    3.8,
    -27,
    Math.PI / 2,
    3.1,
    1.1,
    "#ffb13b"
  );


  createSign(
    scene,
    "夜生活",
    11.3,
    5,
    -39,
    -Math.PI / 2,
    4,
    1.1,
    "#ff4bca"
  );


  /* ===================================================
     FOOD ALLEY
  =================================================== */

  createSign(
    scene,
    "武林美食",
    -16,
    4.5,
    -58,
    0,
    4.5,
    1.3,
    "#ff5b3f"
  );


  createSign(
    scene,
    "烧烤",
    -28,
    3.8,
    -59,
    0,
    2.5,
    1,
    "#ff9f3f"
  );


  createSign(
    scene,
    "小龙虾",
    -35,
    4.3,
    -68,
    Math.PI / 2,
    3.5,
    1.1,
    "#ff3e55"
  );


  /* ===================================================
     CREATIVE DISTRICT
  =================================================== */

  createSign(
    scene,
    "杭州文创",
    -5,
    4.4,
    -84,
    0,
    4,
    1.2,
    "#45cfff"
  );


  createSign(
    scene,
    "手作",
    8,
    4.1,
    -98,
    -Math.PI / 2,
    2.4,
    1,
    "#d576ff"
  );


  createSign(
    scene,
    "原创设计",
    -8,
    4.5,
    -108,
    Math.PI / 2,
    3.8,
    1,
    "#59f0c2"
  );


  /* ===================================================
     BACK ALLEY
  =================================================== */

  createSign(
    scene,
    "武林小馆",
    19.4,
    3.8,
    -20,
    Math.PI / 2,
    3.4,
    1,
    "#ff6a42"
  );


  createSign(
    scene,
    "面馆",
    31,
    3.6,
    -10,
    -Math.PI / 2,
    2.3,
    1,
    "#ffbd55"
  );


  createSign(
    scene,
    "便利店",
    31,
    4,
    -36,
    -Math.PI / 2,
    3.2,
    1,
    "#4ccfff"
  );


  /* ===================================================
     DECORATIVE NEON RINGS
  =================================================== */

  const neonColors = [
    0xff3c84,
    0x35bfff,
    0xffa53c,
    0x6affd0
  ];


  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const color =
      neonColors[
        i %
        neonColors.length
      ];


    const material =
      new THREE.MeshStandardMaterial({

        color,

        emissive:
          color,

        emissiveIntensity:
          2.2,

        roughness:
          0.35

      });


    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          0.25 +
          Math.random() * 0.22,
          0.035,
          6,
          16
        ),

        material

      );


    ring.position.set(

      37.8,

      1.5 +
      Math.random() * 4,

      -71 +
      Math.random() * 10

    );


    ring.rotation.y =
      Math.PI / 2;


    ring.userData.base =
      2.2;


    ring.userData.speed =
      1 +
      Math.random() * 2;


    ring.userData.phase =
      Math.random() *
      Math.PI * 2;


    scene.add(
      ring
    );


    animated.push(
      ring
    );

  }


  /* ===================================================
     PLAZA REAL LIGHTS
  =================================================== */

  const pink =
    new THREE.PointLight(
      0xff3f91,
      9,
      18,
      2
    );


  pink.position.set(
    33,
    4,
    -62
  );


  scene.add(
    pink
  );


  const blue =
    new THREE.PointLight(
      0x36aaff,
      8,
      18,
      2
    );


  blue.position.set(
    25,
    4,
    -69
  );


  scene.add(
    blue
  );


  return animated;

}
