import * as THREE from "three";


const SKIN_COLORS = [
  0xd9aa83,
  0xc9916b,
  0xe0b18a,
  0xb97f5e
];


const HAIR_COLORS = [
  0x171515,
  0x241b18,
  0x33241f,
  0x101010
];


export function createInteractiveNPCs(scene) {

  const npcs = [];


  const definitions = [

    {
      id: "student",
      name: "小陈",
      role: "杭州の大学生",
      x: 5,
      z: -60,
      rotation: 0.4,
      shirt: 0x547da8,
      pants: 0x242c38,
      style: "student",
      animation: "phone"
    },

    {
      id: "vendor",
      name: "王师傅",
      role: "夜市の屋台店主",
      x: -25,
      z: -66,
      rotation: -0.5,
      shirt: 0x8d4035,
      pants: 0x292525,
      style: "vendor",
      animation: "idle"
    },

    {
      id: "local",
      name: "林阿姨",
      role: "杭州の地元住民",
      x: 24,
      z: -65,
      rotation: 2.4,
      shirt: 0x755783,
      pants: 0x35303c,
      style: "local",
      animation: "bag"
    },

    {
      id: "xiaoyu",
      name: "小雨",
      role: "杭州の大学生",
      x: -4,
      z: -91,
      rotation: 1.2,
      shirt: 0xb66b87,
      pants: 0x2d3440,
      style: "studentFemale",
      animation: "phone"
    },

    {
      id: "laozhou",
      name: "老周",
      role: "武林に住む地元の人",
      x: 28,
      z: -31,
      rotation: -1.2,
      shirt: 0x5f665c,
      pants: 0x2d2d2b,
      style: "older",
      animation: "handsBack"
    },

    {
      id: "ajie",
      name: "阿杰",
      role: "武林路のショップ店員",
      x: 8,
      z: -25,
      rotation: -0.7,
      shirt: 0x293c56,
      pants: 0x1e2329,
      style: "worker",
      animation: "idle"
    },

    {
      id: "tingting",
      name: "婷婷",
      role: "上海から来た観光客",
      x: 29,
      z: -70,
      rotation: 2.1,
      shirt: 0xe0b76d,
      pants: 0x31415a,
      style: "tourist",
      animation: "photo"
    },

    {
      id: "chenboss",
      name: "陈老板",
      role: "杭州料理店の店主",
      x: -31,
      z: -61,
      rotation: 0.8,
      shirt: 0x76362e,
      pants: 0x252525,
      style: "chef",
      animation: "idle"
    },

    {
      id: "xiaolin",
      name: "小林",
      role: "文創デザイナー",
      x: 5,
      z: -103,
      rotation: -2.1,
      shirt: 0x506d62,
      pants: 0x242b2b,
      style: "designer",
      animation: "bag"
    },

    {
      id: "zjustudent",
      name: "子涵",
      role: "浙江大学の学生",
      x: -7,
      z: -55,
      rotation: 1.8,
      shirt: 0x475f91,
      pants: 0x222a36,
      style: "student",
      animation: "phone"
    },

    {
      id: "photographer",
      name: "阿凯",
      role: "街を撮影しているカメラマン",
      x: 20,
      z: -73,
      rotation: -2.5,
      shirt: 0x303030,
      pants: 0x191919,
      style: "photographer",
      animation: "photo"
    },

    {
      id: "cleaner",
      name: "刘阿姨",
      role: "夜市の清掃スタッフ",
      x: 25,
      z: -11,
      rotation: 0.2,
      shirt: 0xe38a35,
      pants: 0x33363a,
      style: "worker",
      animation: "idle"
    }

  ];


  definitions.forEach(
    (data, index) => {

      npcs.push(
        createNPC(
          scene,
          data,
          index
        )
      );

    }
  );


  return npcs;
}


function createNPC(
  scene,
  data,
  index
) {

  const root =
    new THREE.Group();


  root.position.set(
    data.x,
    0,
    data.z
  );


  root.rotation.y =
    data.rotation || 0;


  root.userData.baseRotation =
    root.rotation.y;


  scene.add(root);


  const skinColor =
    SKIN_COLORS[
      index %
      SKIN_COLORS.length
    ];


  const hairColor =
    HAIR_COLORS[
      index %
      HAIR_COLORS.length
    ];


  const skinMaterial =
    standardMaterial(
      skinColor,
      0.78
    );


  const shirtMaterial =
    standardMaterial(
      data.shirt,
      0.72
    );


  const pantsMaterial =
    standardMaterial(
      data.pants,
      0.84
    );


  const shoeMaterial =
    standardMaterial(
      0x161719,
      0.9
    );


  const hairMaterial =
    standardMaterial(
      hairColor,
      0.88
    );


  /* =====================================================
     LEGS
  ===================================================== */

  const leftLeg =
    createBox(
      root,
      0.17,
      0.62,
      0.19,
      pantsMaterial,
      -0.12,
      0.48,
      0
    );


  const rightLeg =
    createBox(
      root,
      0.17,
      0.62,
      0.19,
      pantsMaterial,
      0.12,
      0.48,
      0
    );


  /* SHOES */

  createBox(
    root,
    0.20,
    0.10,
    0.34,
    shoeMaterial,
    -0.12,
    0.12,
    0.055
  );


  createBox(
    root,
    0.20,
    0.10,
    0.34,
    shoeMaterial,
    0.12,
    0.12,
    0.055
  );


  /* =====================================================
     BODY
  ===================================================== */

  const torso =
    new THREE.Mesh(

      new THREE.CapsuleGeometry(
        0.255,
        0.44,
        5,
        10
      ),

      shirtMaterial

    );


  torso.position.y =
    1.12;


  torso.scale.z =
    0.72;


  root.add(torso);


  /* waist */

  createBox(
    root,
    0.43,
    0.18,
    0.25,
    pantsMaterial,
    0,
    0.82,
    0
  );


  /* =====================================================
     NECK
  ===================================================== */

  const neck =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.09,
        0.09,
        0.13,
        10
      ),

      skinMaterial

    );


  neck.position.y =
    1.53;


  root.add(neck);


  /* =====================================================
     HEAD
  ===================================================== */

  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.22,
        16,
        12
      ),

      skinMaterial

    );


  head.position.y =
    1.75;


  head.scale.set(
    0.9,
    1.08,
    0.92
  );


  root.add(head);


  /* =====================================================
     FACE
  ===================================================== */

  const eyeMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x151515
    });


  createSphere(
    root,
    0.018,
    eyeMaterial,
    -0.075,
    1.79,
    0.192
  );


  createSphere(
    root,
    0.018,
    eyeMaterial,
    0.075,
    1.79,
    0.192
  );


  const nose =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        0.025,
        0.07,
        6
      ),

      skinMaterial

    );


  nose.position.set(
    0,
    1.735,
    0.215
  );


  nose.rotation.x =
    Math.PI / 2;


  root.add(nose);


  const mouthMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x743e3e
    });


  createBox(
    root,
    0.075,
    0.012,
    0.012,
    mouthMaterial,
    0,
    1.67,
    0.213
  );


  /* =====================================================
     HAIR
  ===================================================== */

  createHair(
    root,
    data.style,
    hairMaterial
  );


  /* =====================================================
     ARMS
  ===================================================== */

  const leftArm =
    createArm(
      root,
      shirtMaterial,
      skinMaterial,
      -1
    );


  const rightArm =
    createArm(
      root,
      shirtMaterial,
      skinMaterial,
      1
    );


  /* =====================================================
     ACCESSORIES
  ===================================================== */

  addAccessories(
    root,
    data.style,
    data.animation
  );


  /* =====================================================
     SHADOWS
  ===================================================== */

  root.traverse(
    object => {

      if (object.isMesh) {

        object.castShadow =
          true;

        object.receiveShadow =
          true;

      }

    }
  );


  return {

    id: data.id,

    name: data.name,

    role: data.role,

    root,

    head,

    torso,

    leftArm,

    rightArm,

    leftLeg,

    rightLeg,

    animation:
      data.animation || "idle",

    phase:
      index * 0.83,

    baseRotation:
      data.rotation || 0

  };
}


function createArm(
  root,
  shirtMaterial,
  skinMaterial,
  side
) {

  const group =
    new THREE.Group();


  group.position.set(
    side * 0.31,
    1.35,
    0
  );


  root.add(group);


  const upper =
    createBox(
      group,
      0.13,
      0.36,
      0.14,
      shirtMaterial,
      0,
      -0.13,
      0
    );


  const forearm =
    createBox(
      group,
      0.115,
      0.31,
      0.12,
      skinMaterial,
      0,
      -0.44,
      0.01
    );


  createSphere(
    group,
    0.07,
    skinMaterial,
    0,
    -0.62,
    0.01
  );


  return {
    group,
    upper,
    forearm
  };
}


function createHair(
  root,
  style,
  material
) {

  const cap =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.225,
        16,
        10,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.57
      ),

      material

    );


  cap.position.y =
    1.82;


  cap.scale.set(
    0.92,
    1,
    0.94
  );


  root.add(cap);


  if (
    style === "studentFemale" ||
    style === "tourist" ||
    style === "designer"
  ) {

    const backHair =
      createBox(
        root,
        0.35,
        0.40,
        0.13,
        material,
        0,
        1.67,
        -0.16
      );


    backHair.rotation.x =
      -0.08;

  }


  if (
    style === "older"
  ) {

    cap.material =
      standardMaterial(
        0x474747,
        0.9
      );

  }
}


function addAccessories(
  root,
  style,
  animation
) {

  if (
    animation === "phone"
  ) {

    const phoneMaterial =
      standardMaterial(
        0x11151b,
        0.35
      );


    const phone =
      createBox(
        root,
        0.10,
        0.19,
        0.018,
        phoneMaterial,
        0.18,
        1.18,
        0.27
      );


    phone.rotation.z =
      -0.15;

  }


  if (
    style === "tourist" ||
    style === "designer"
  ) {

    const bag =
      createBox(
        root,
        0.28,
        0.34,
        0.14,
        standardMaterial(
          style === "designer"
            ? 0x9a7650
            : 0xb24e55,
          0.75
        ),
        -0.34,
        1.02,
        -0.04
      );


    bag.rotation.z =
      -0.12;

  }


  if (
    style === "photographer"
  ) {

    const camera =
      createBox(
        root,
        0.23,
        0.16,
        0.14,
        standardMaterial(
          0x171717,
          0.4
        ),
        0,
        1.22,
        0.30
      );


    const lens =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          0.06,
          0.075,
          0.13,
          12
        ),

        standardMaterial(
          0x101010,
          0.3
        )

      );


    lens.rotation.x =
      Math.PI / 2;


    lens.position.set(
      0,
      1.22,
      0.42
    );


    root.add(lens);

  }


  if (
    style === "chef" ||
    style === "vendor"
  ) {

    const apron =
      createBox(
        root,
        0.38,
        0.52,
        0.025,
        standardMaterial(
          0xddd5c7,
          0.9
        ),
        0,
        1.05,
        0.21
      );


    apron.rotation.x =
      -0.02;

  }


  if (
    style === "worker"
  ) {

    const stripeMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xffd65a
      });


    createBox(
      root,
      0.46,
      0.055,
      0.025,
      stripeMaterial,
      0,
      1.18,
      0.22
    );

  }
}


function standardMaterial(
  color,
  roughness = 0.8
) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.02
  });
}


function createBox(
  parent,
  width,
  height,
  depth,
  material,
  x,
  y,
  z
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


  parent.add(mesh);


  return mesh;
}


function createSphere(
  parent,
  radius,
  material,
  x,
  y,
  z
) {

  const mesh =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        radius,
        10,
        8
      ),

      material

    );


  mesh.position.set(
    x,
    y,
    z
  );


  parent.add(mesh);


  return mesh;
}
