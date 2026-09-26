import * as THREE from "three";


export function createFacadeSystem(
  scene,
  colliders
) {

  const group =
    new THREE.Group();


  group.name =
    "DetailedFacades";


  scene.add(
    group
  );


  /*
    Main street shopfronts
  */

  createShopFacade(
    group,
    -13.9,
    -5,
    Math.PI / 2,
    "杭州小吃",
    0xff7048
  );


  createShopFacade(
    group,
    -13.9,
    -19,
    Math.PI / 2,
    "武林茶馆",
    0x48d9b0
  );


  createShopFacade(
    group,
    -13.9,
    -34,
    Math.PI / 2,
    "饰品",
    0xff55a8
  );


  createShopFacade(
    group,
    13.9,
    -4,
    -Math.PI / 2,
    "杭州味道",
    0xffa03b
  );


  createShopFacade(
    group,
    13.9,
    -31,
    -Math.PI / 2,
    "潮流服饰",
    0x4fa8ff
  );


  /*
    Back alley
  */

  createOldFacade(
    group,
    31.8,
    -7,
    -Math.PI / 2
  );


  createOldFacade(
    group,
    31.8,
    -41,
    -Math.PI / 2
  );


  /*
    Rooftop equipment on
    nearby buildings
  */

  createRoofEquipment(
    group,
    -15,
    -20,
    7
  );


  createRoofEquipment(
    group,
    15,
    -34,
    8
  );


  createRoofEquipment(
    group,
    -14,
    -101,
    6.5
  );


  /*
    Hanging signs
  */

  createBladeSign(
    group,
    -13,
    2.7,
    -11,
    "面"
  );


  createBladeSign(
    group,
    13,
    3.1,
    -24,
    "茶"
  );


  createBladeSign(
    group,
    -13,
    3,
    -39,
    "酒"
  );

}


/* =====================================================
   MODERN SHOP FACADE
===================================================== */

function createShopFacade(
  parent,
  x,
  z,
  rotation,
  text,
  neonColor
) {

  const root =
    new THREE.Group();


  root.position.set(
    x,
    0,
    z
  );


  root.rotation.y =
    rotation;


  parent.add(
    root
  );


  /*
    Dark structural frame
  */

  const frameMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x202225,

      metalness:
        0.42,

      roughness:
        0.55

    });


  box(
    root,
    -2.65,
    1.65,
    0,
    0.16,
    3.3,
    0.22,
    frameMaterial
  );


  box(
    root,
    2.65,
    1.65,
    0,
    0.16,
    3.3,
    0.22,
    frameMaterial
  );


  box(
    root,
    0,
    3.15,
    0,
    5.4,
    0.18,
    0.22,
    frameMaterial
  );


  /*
    Glass
  */

  const glassMaterial =
    new THREE.MeshPhysicalMaterial({

      color:
        0x5f7d8e,

      roughness:
        0.12,

      metalness:
        0.05,

      transmission:
        0.12,

      transparent:
        true,

      opacity:
        0.55

    });


  box(
    root,
    -1.55,
    1.5,
    0.05,
    1.8,
    2.5,
    0.06,
    glassMaterial
  );


  box(
    root,
    1.55,
    1.5,
    0.05,
    1.8,
    2.5,
    0.06,
    glassMaterial
  );


  /*
    Door
  */

  box(
    root,
    0,
    1.3,
    0.02,
    1.05,
    2.6,
    0.08,
    glassMaterial
  );


  /*
    Door handles
  */

  const metal =
    new THREE.MeshStandardMaterial({

      color:
        0xb7b7b7,

      metalness:
        0.8,

      roughness:
        0.25

    });


  box(
    root,
    -0.13,
    1.35,
    -0.05,
    0.04,
    0.65,
    0.04,
    metal
  );


  box(
    root,
    0.13,
    1.35,
    -0.05,
    0.04,
    0.65,
    0.04,
    metal
  );


  /*
    Awning
  */

  const awning =
    box(
      root,
      0,
      2.75,
      -0.65,
      5.2,
      0.12,
      1.35,
      new THREE.MeshStandardMaterial({
        color: 0x35383c,
        roughness: 0.7
      })
    );


  awning.rotation.x =
    -0.12;


  /*
    Neon sign
  */

  const sign =
    createTextSign(
      text,
      neonColor
    );


  sign.position.set(
    0,
    3.65,
    -0.18
  );


  root.add(
    sign
  );


  /*
    Interior warm wall
  */

  box(
    root,
    0,
    1.5,
    1.25,
    5,
    2.8,
    0.08,
    new THREE.MeshStandardMaterial({

      color:
        0x6d5748,

      emissive:
        0xff8c42,

      emissiveIntensity:
        0.25

    })
  );


  /*
    Display shelves
  */

  for (
    let i = -2;
    i <= 2;
    i++
  ) {

    box(
      root,
      i * 0.7,
      0.65,
      0.72,
      0.5,
      1.1,
      0.35,
      new THREE.MeshStandardMaterial({
        color:
          i % 2 === 0
            ? 0xb98755
            : 0x6d7781
      })
    );

  }


  /*
    Exterior AC unit
  */

  createAC(
    root,
    2.1,
    4.8,
    0
  );


  /*
    Drain pipe
  */

  const pipe =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.045,
        0.045,
        5,
        6
      ),

      new THREE.MeshStandardMaterial({
        color: 0x72777a
      })

    );


  pipe.position.set(
    -2.45,
    2.5,
    0.12
  );


  root.add(
    pipe
  );

}


/* =====================================================
   OLD ALLEY FACADE
===================================================== */

function createOldFacade(
  parent,
  x,
  z,
  rotation
) {

  const root =
    new THREE.Group();


  root.position.set(
    x,
    0,
    z
  );


  root.rotation.y =
    rotation;


  parent.add(
    root
  );


  const wall =
    new THREE.MeshStandardMaterial({

      color:
        0x69645c,

      roughness:
        0.95

    });


  box(
    root,
    0,
    2.4,
    0,
    5.5,
    4.8,
    0.22,
    wall
  );


  /*
    Old metal door
  */

  box(
    root,
    -1.4,
    1.2,
    -0.15,
    1.5,
    2.4,
    0.1,
    new THREE.MeshStandardMaterial({
      color: 0x3d4646,
      metalness: 0.45,
      roughness: 0.75
    })
  );


  /*
    Lit window
  */

  box(
    root,
    1.25,
    2.55,
    -0.14,
    1.55,
    1.4,
    0.06,
    new THREE.MeshStandardMaterial({

      color:
        0xffc97d,

      emissive:
        0xff8a32,

      emissiveIntensity:
        1.2

    })
  );


  /*
    Window bars
  */

  const barMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x242628
    });


  for (
    let i = -1;
    i <= 1;
    i++
  ) {

    box(
      root,
      1.25 + i * 0.45,
      2.55,
      -0.22,
      0.035,
      1.5,
      0.035,
      barMaterial
    );

  }


  /*
    AC
  */

  createAC(
    root,
    1.8,
    4,
    -0.2
  );


  /*
    Utility boxes
  */

  box(
    root,
    -2.2,
    1,
    -0.18,
    0.42,
    0.7,
    0.18,
    new THREE.MeshStandardMaterial({
      color: 0x77766f
    })
  );

}


/* =====================================================
   ROOFTOP EQUIPMENT
===================================================== */

function createRoofEquipment(
  parent,
  x,
  z,
  y
) {

  const material =
    new THREE.MeshStandardMaterial({

      color:
        0x6f7477,

      metalness:
        0.35,

      roughness:
        0.65

    });


  /*
    Water tank
  */

  const tank =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.75,
        0.75,
        1.3,
        14
      ),

      material

    );


  tank.position.set(
    x,
    y + 0.65,
    z
  );


  parent.add(
    tank
  );


  /*
    Ventilation boxes
  */

  for (
    let i = 0;
    i < 3;
    i++
  ) {

    box(
      parent,
      x - 1.5 + i * 1.1,
      y + 0.35,
      z + 1.4,
      0.7,
      0.7,
      0.8,
      material
    );

  }

}


/* =====================================================
   BLADE SIGN
===================================================== */

function createBladeSign(
  parent,
  x,
  y,
  z,
  text
) {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    256;


  canvas.height =
    512;


  const ctx =
    canvas.getContext(
      "2d"
    );


  ctx.fillStyle =
    "#231419";


  ctx.fillRect(
    0,
    0,
    256,
    512
  );


  ctx.strokeStyle =
    "#ff315f";


  ctx.lineWidth =
    12;


  ctx.strokeRect(
    8,
    8,
    240,
    496
  );


  ctx.fillStyle =
    "#ffd7df";


  ctx.shadowColor =
    "#ff315f";


  ctx.shadowBlur =
    35;


  ctx.font =
    "bold 170px sans-serif";


  ctx.textAlign =
    "center";


  ctx.textBaseline =
    "middle";


  ctx.fillText(
    text,
    128,
    256
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  texture.colorSpace =
    THREE.SRGBColorSpace;


  const sign =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.7,
        1.5,
        0.09
      ),

      [
        new THREE.MeshBasicMaterial({
          color: 0xff315f
        }),

        new THREE.MeshBasicMaterial({
          color: 0xff315f
        }),

        new THREE.MeshBasicMaterial({
          color: 0xff315f
        }),

        new THREE.MeshBasicMaterial({
          color: 0xff315f
        }),

        new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false
        }),

        new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false
        })
      ]

    );


  sign.position.set(
    x,
    y,
    z
  );


  parent.add(
    sign
  );

}


/* =====================================================
   AC
===================================================== */

function createAC(
  parent,
  x,
  y,
  z
) {

  const root =
    new THREE.Group();


  root.position.set(
    x,
    y,
    z
  );


  parent.add(
    root
  );


  box(
    root,
    0,
    0,
    0,
    0.9,
    0.58,
    0.36,
    new THREE.MeshStandardMaterial({
      color: 0xb6b8b5,
      roughness: 0.75
    })
  );


  const fan =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.19,
        0.19,
        0.03,
        16
      ),

      new THREE.MeshStandardMaterial({
        color: 0x44484b
      })

    );


  fan.rotation.x =
    Math.PI / 2;


  fan.position.z =
    -0.2;


  root.add(
    fan
  );

}


/* =====================================================
   TEXT SIGN
===================================================== */

function createTextSign(
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
    256;


  const ctx =
    canvas.getContext(
      "2d"
    );


  ctx.clearRect(
    0,
    0,
    1024,
    256
  );


  const cssColor =
    "#" +
    color
      .toString(16)
      .padStart(
        6,
        "0"
      );


  ctx.font =
    "bold 128px sans-serif";


  ctx.textAlign =
    "center";


  ctx.textBaseline =
    "middle";


  ctx.shadowColor =
    cssColor;


  ctx.shadowBlur =
    45;


  ctx.fillStyle =
    "#ffffff";


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


  return new THREE.Mesh(

    new THREE.PlaneGeometry(
      4.6,
      1.15
    ),

    new THREE.MeshBasicMaterial({

      map:
        texture,

      transparent:
        true,

      depthWrite:
        false,

      toneMapped:
        false

    })

  );

}


/* =====================================================
   BOX
===================================================== */

function box(
  parent,
  x,
  y,
  z,
  width,
  height,
  depth,
  material
) {

  const mesh =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),

      material

    );


  mesh.position.set(
    x,
    y,
    z
  );


  mesh.receiveShadow =
    true;


  parent.add(
    mesh
  );


  return mesh;

}
