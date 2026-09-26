import * as THREE from "three";


export function createWallMaterial(
  color = 0xd8d0c3
) {

  return new THREE.MeshStandardMaterial({

    color,

    roughness: 0.92

  });

}


export function createFloorMaterial(
  color = 0x4a4640
) {

  return new THREE.MeshStandardMaterial({

    color,

    roughness: 0.88

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


  if (
    parent
  ) {

    parent.add(
      mesh
    );

  }

  else {

    scene.add(
      mesh
    );

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

    minX:
      x - width / 2,

    maxX:
      x + width / 2,

    minZ:
      z - depth / 2,

    maxZ:
      z + depth / 2

  });

}


/* =====================================================
   SIGN
===================================================== */

export function createSignTexture(
  text,
  background = "#6d1d18",
  foreground = "#ffe6b0"
) {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    512;

  canvas.height =
    160;


  const ctx =
    canvas.getContext(
      "2d"
    );


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
   WINDOW
===================================================== */

export function createWindow(
  scene,
  x,
  y,
  z,
  rotationY = 0
) {

  const frame =
    new THREE.Group();


  frame.position.set(
    x,
    y,
    z
  );


  frame.rotation.y =
    rotationY;


  const glass =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        1.25,
        1.35
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x213143,

        emissive:
          0x314a65,

        emissiveIntensity:
          0.16,

        metalness:
          0.15,

        roughness:
          0.25

      })

    );


  frame.add(
    glass
  );


  const frameMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x292929
    });


  const top =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        1.4,
        0.08,
        0.08
      ),

      frameMaterial

    );


  top.position.y =
    0.7;


  frame.add(
    top
  );


  const bottom =
    top.clone();


  bottom.position.y =
    -0.7;


  frame.add(
    bottom
  );


  const left =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.08,
        1.4,
        0.08
      ),

      frameMaterial

    );


  left.position.x =
    -0.68;


  frame.add(
    left
  );


  const right =
    left.clone();


  right.position.x =
    0.68;


  frame.add(
    right
  );


  scene.add(
    frame
  );


  return frame;

}
