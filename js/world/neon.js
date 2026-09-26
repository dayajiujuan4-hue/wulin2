import * as THREE from "three";


const animated = [];


function textTexture(
  text,
  color
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
    1024,
    300
  );

  ctx.font =
    "bold 190px Arial";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.shadowBlur =
    35;

  ctx.shadowColor =
    color;

  ctx.fillStyle =
    color;

  ctx.fillText(
    text,
    512,
    160
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;

}


export function createNeon(
  scene
) {

  /*
    WULIN PLAZA WALL
  */

  const wall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .45,
        7,
        13
      ),

      new THREE.MeshStandardMaterial({
        color: 0x11141b
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


  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        9,
        2.4
      ),

      new THREE.MeshBasicMaterial({

        map:
          textTexture(
            "WULIN",
            "#ff397b"
          ),

        transparent:
          true,

        depthWrite:
          false

      })

    );

  sign.rotation.y =
    -Math.PI / 2;

  sign.position.set(
    38.75,
    4.4,
    -66
  );

  scene.add(
    sign
  );


  /*
    Neon geometry decorations
  */

  const colors = [

    0xff3b7b,
    0x2de5ff,
    0xffd547,
    0x55ff8b,
    0xb866ff

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
            i %
            colors.length
          ],

        emissive:
          colors[
            i %
            colors.length
          ],

        emissiveIntensity:
          2.2

      });


    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          .18 +
          Math.random() *
          .15,
          .025,
          5,
          12
        ),

        material

      );

    ring.rotation.y =
      Math.PI / 2;

    ring.position.set(

      38.7,

      .8 +
      Math.random() *
      2.5,

      -71 +
      Math.random() *
      10

    );

    ring.userData = {

      base:
        2.1,

      speed:
        1 +
        Math.random() *
        2,

      phase:
        Math.random() *
        10

    };

    scene.add(
      ring
    );

    animated.push(
      ring
    );

  }


  /*
    Only TWO actual lights.
  */

  const pink =
    new THREE.PointLight(
      0xff246f,
      20,
      13,
      2
    );

  pink.position.set(
    34,
    3,
    -63
  );

  scene.add(
    pink
  );


  const blue =
    new THREE.PointLight(
      0x26d8ff,
      15,
      12,
      2
    );

  blue.position.set(
    32,
    2.5,
    -70
  );

  scene.add(
    blue
  );


  /*
    Entrance sign
  */

  const entrance =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        7,
        1.5
      ),

      new THREE.MeshBasicMaterial({

        map:
          textTexture(
            "武林夜市",
            "#f4c66f"
          ),

        transparent:
          true

      })

    );

  entrance.position.set(
    0,
    4.5,
    18
  );

  scene.add(
    entrance
  );


  return animated;

}
