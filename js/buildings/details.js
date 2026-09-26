import * as THREE from "three";


const BOX =
  new THREE.BoxGeometry(1, 1, 1);


export function createWallMaterial(
  color = 0xd8d0c3
) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9
  });

}


export function createFloorMaterial(
  color = 0x4a4640
) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.82
  });

}


export function addBox(
  scene,
  x,
  y,
  z,
  width,
  height,
  depth,
  material,
  parent = null
) {

  const mesh =
    new THREE.Mesh(
      BOX,
      material
    );


  mesh.scale.set(
    width,
    height,
    depth
  );


  mesh.position.set(
    x,
    y,
    z
  );


  mesh.receiveShadow = true;


  if (parent) {

    parent.add(mesh);

  } else {

    scene.add(mesh);

  }


  return mesh;

}


export function addCollider(
  colliders,
  x,
  z,
  width,
  depth
) {

  colliders.push({

    minX: x - width / 2,
    maxX: x + width / 2,

    minZ: z - depth / 2,
    maxZ: z + depth / 2

  });

}


/* =====================================================
   SIGN TEXTURE
===================================================== */

export function createSignTexture(
  text,
  background = "#6d1d18",
  foreground = "#ffe6b0"
) {

  const canvas =
    document.createElement("canvas");


  canvas.width = 512;
  canvas.height = 160;


  const ctx =
    canvas.getContext("2d");


  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.fillStyle =
    foreground;

  ctx.font =
    "bold 74px sans-serif";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";


  ctx.shadowColor =
    foreground;

  ctx.shadowBlur =
    16;


  ctx.fillText(
    text,
    canvas.width / 2,
    canvas.height / 2
  );


  const texture =
    new THREE.CanvasTexture(canvas);


  texture.colorSpace =
    THREE.SRGBColorSpace;


  return texture;

}


/* =====================================================
   WINDOW
===================================================== */

export function createWindow(
  scene,
  x,
  y,
  z,
  rotationY = 0,
  lit = true
) {

  const group =
    new THREE.Group();


  group.position.set(
    x,
    y,
    z
  );


  group.rotation.y =
    rotationY;


  const glassMaterial =
    new THREE.MeshStandardMaterial({

      color:
        lit
          ? 0x6e6652
          : 0x17202a,

      emissive:
        lit
          ? 0xffb85f
          : 0x101820,

      emissiveIntensity:
        lit
          ? 0.45
          : 0.08,

      metalness: 0.25,

      roughness: 0.28

    });


  const glass =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        1.25,
        1.35
      ),

      glassMaterial

    );


  group.add(glass);


  const frameMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x222426,
      roughness: 0.7
    });


  const horizontalGeometry =
    new THREE.BoxGeometry(
      1.4,
      0.07,
      0.07
    );


  const verticalGeometry =
    new THREE.BoxGeometry(
      0.07,
      1.4,
      0.07
    );


  const top =
    new THREE.Mesh(
      horizontalGeometry,
      frameMaterial
    );

  top.position.y = 0.7;


  const bottom =
    top.clone();

  bottom.position.y = -0.7;


  const left =
    new THREE.Mesh(
      verticalGeometry,
      frameMaterial
    );

  left.position.x = -0.68;


  const right =
    left.clone();

  right.position.x = 0.68;


  const center =
    left.clone();

  center.position.x = 0;


  group.add(
    top,
    bottom,
    left,
    right,
    center
  );


  scene.add(group);


  return group;

}


/* =====================================================
   AIR CONDITIONER
===================================================== */

export function createAC(
  scene,
  x,
  y,
  z,
  rotationY = 0
) {

  const group =
    new THREE.Group();


  group.position.set(
    x,
    y,
    z
  );


  group.rotation.y =
    rotationY;


  const bodyMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xc3c1ba,
      roughness: 0.82
    });


  const body =
    new THREE.Mesh(
      BOX,
      bodyMaterial
    );


  body.scale.set(
    0.9,
    0.58,
    0.38
  );


  group.add(body);


  const fan =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.2,
        0.2,
        0.025,
        16
      ),

      new THREE.MeshStandardMaterial({
        color: 0x55585a
      })

    );


  fan.rotation.x =
    Math.PI / 2;


  fan.position.z =
    -0.205;


  group.add(fan);


  scene.add(group);

}


/* =====================================================
   PIPE
===================================================== */

export function createPipe(
  scene,
  x,
  y,
  z,
  height
) {

  const pipe =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.045,
        0.045,
        height,
        7
      ),

      new THREE.MeshStandardMaterial({
        color: 0x777b79,
        roughness: 0.8
      })

    );


  pipe.position.set(
    x,
    y,
    z
  );


  scene.add(pipe);

}


/* =====================================================
   RAILING
===================================================== */

export function createRailing(
  scene,
  x,
  y,
  z,
  length,
  axis = "x"
) {

  const material =
    new THREE.MeshStandardMaterial({

      color: 0x25282a,

      metalness: 0.45,

      roughness: 0.5

    });


  if (axis === "x") {

    addBox(
      scene,
      x,
      y + 0.55,
      z,
      length,
      0.07,
      0.07,
      material
    );


    for (
      let offset = -length / 2;
      offset <= length / 2;
      offset += 0.75
    ) {

      addBox(
        scene,
        x + offset,
        y + 0.28,
        z,
        0.05,
        0.56,
        0.05,
        material
      );

    }

  } else {

    addBox(
      scene,
      x,
      y + 0.55,
      z,
      0.07,
      0.07,
      length,
      material
    );


    for (
      let offset = -length / 2;
      offset <= length / 2;
      offset += 0.75
    ) {

      addBox(
        scene,
        x,
        y + 0.28,
        z + offset,
        0.05,
        0.56,
        0.05,
        material
      );

    }

  }

}
