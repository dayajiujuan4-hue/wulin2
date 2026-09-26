import * as THREE from "three";


/* =====================================================
   SHARED GEOMETRIES
===================================================== */

const headGeometry =
  new THREE.SphereGeometry(
    0.13,
    10,
    8
  );

const hairGeometry =
  new THREE.SphereGeometry(
    0.135,
    9,
    6,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.55
  );

const torsoGeometry =
  new THREE.BoxGeometry(
    0.34,
    0.55,
    0.22
  );

const armGeometry =
  new THREE.CapsuleGeometry(
    0.05,
    0.35,
    3,
    6
  );

const legGeometry =
  new THREE.CapsuleGeometry(
    0.06,
    0.42,
    3,
    6
  );

const shoeGeometry =
  new THREE.BoxGeometry(
    0.12,
    0.08,
    0.22
  );

const eyeGeometry =
  new THREE.SphereGeometry(
    0.014,
    5,
    4
  );

const handGeometry =
  new THREE.SphereGeometry(
    0.047,
    6,
    4
  );


/* =====================================================
   COLORS
===================================================== */

const skinColors = [
  0xf0c5a4,
  0xe6b18d,
  0xd69b74,
  0xf2cdb0,
  0xc98d68
];

const shirtColors = [
  0xd9d9d9,
  0xc4413b,
  0x315c88,
  0x4f7654,
  0xe0b34e,
  0x6e547e,
  0x25282d,
  0xcfc4ad,
  0xeeeeea,
  0x35526e
];

const pantsColors = [
  0x17191d,
  0x263447,
  0x444444,
  0x554c44,
  0x1d2530
];

const hairColors = [
  0x080808,
  0x1b1512,
  0x30231d,
  0x141414
];

const bagColors = [
  0x2c2c2c,
  0x704934,
  0xc3a77a,
  0x35475d
];


/* =====================================================
   HELPERS
===================================================== */

function pick(array) {

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

}


function makeMaterial(color) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.8
  });

}


/* =====================================================
   CREATE NPC
===================================================== */

export function createNPC(options = {}) {

  const npc =
    new THREE.Group();


  /*
    Materials
  */

  const skinMaterial =
    makeMaterial(
      pick(skinColors)
    );

  const shirtMaterial =
    makeMaterial(
      pick(shirtColors)
    );

  const pantsMaterial =
    makeMaterial(
      pick(pantsColors)
    );

  const hairMaterial =
    makeMaterial(
      pick(hairColors)
    );

  const shoeMaterial =
    makeMaterial(
      0x111111
    );


  /* ===================================================
     TORSO
  =================================================== */

  const torso =
    new THREE.Mesh(
      torsoGeometry,
      shirtMaterial
    );

  torso.position.y =
    1.18;

  npc.add(
    torso
  );


  /* ===================================================
     NECK
  =================================================== */

  const neck =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.055,
        0.06,
        0.1,
        6
      ),

      skinMaterial

    );

  neck.position.y =
    1.47;

  npc.add(
    neck
  );


  /* ===================================================
     HEAD
  =================================================== */

  const head =
    new THREE.Mesh(
      headGeometry,
      skinMaterial
    );

  head.position.y =
    1.62;

  npc.add(
    head
  );


  /* ===================================================
     HAIR
  =================================================== */

  const hair =
    new THREE.Mesh(
      hairGeometry,
      hairMaterial
    );

  hair.position.y =
    1.67;

  npc.add(
    hair
  );


  /* ===================================================
     FACE
  =================================================== */

  const eyeMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x111111
    });


  const leftEye =
    new THREE.Mesh(
      eyeGeometry,
      eyeMaterial
    );

  leftEye.position.set(
    -0.045,
    1.63,
    -0.12
  );

  npc.add(
    leftEye
  );


  const rightEye =
    new THREE.Mesh(
      eyeGeometry,
      eyeMaterial
    );

  rightEye.position.set(
    0.045,
    1.63,
    -0.12
  );

  npc.add(
    rightEye
  );


  /* ===================================================
     LEFT ARM
  =================================================== */

  const leftArmPivot =
    new THREE.Group();

  leftArmPivot.position.set(
    -0.22,
    1.38,
    0
  );

  npc.add(
    leftArmPivot
  );


  const leftArm =
    new THREE.Mesh(
      armGeometry,
      shirtMaterial
    );

  leftArm.position.y =
    -0.22;

  leftArmPivot.add(
    leftArm
  );


  const leftHand =
    new THREE.Mesh(
      handGeometry,
      skinMaterial
    );

  leftHand.position.y =
    -0.46;

  leftArmPivot.add(
    leftHand
  );


  /* ===================================================
     RIGHT ARM
  =================================================== */

  const rightArmPivot =
    new THREE.Group();

  rightArmPivot.position.set(
    0.22,
    1.38,
    0
  );

  npc.add(
    rightArmPivot
  );


  const rightArm =
    new THREE.Mesh(
      armGeometry,
      shirtMaterial
    );

  rightArm.position.y =
    -0.22;

  rightArmPivot.add(
    rightArm
  );


  const rightHand =
    new THREE.Mesh(
      handGeometry,
      skinMaterial
    );

  rightHand.position.y =
    -0.46;

  rightArmPivot.add(
    rightHand
  );


  /* ===================================================
     LEFT LEG
  =================================================== */

  const leftLegPivot =
    new THREE.Group();

  leftLegPivot.position.set(
    -0.09,
    0.88,
    0
  );

  npc.add(
    leftLegPivot
  );


  const leftLeg =
    new THREE.Mesh(
      legGeometry,
      pantsMaterial
    );

  leftLeg.position.y =
    -0.27;

  leftLegPivot.add(
    leftLeg
  );


  /* ===================================================
     RIGHT LEG
  =================================================== */

  const rightLegPivot =
    new THREE.Group();

  rightLegPivot.position.set(
    0.09,
    0.88,
    0
  );

  npc.add(
    rightLegPivot
  );


  const rightLeg =
    new THREE.Mesh(
      legGeometry,
      pantsMaterial
    );

  rightLeg.position.y =
    -0.27;

  rightLegPivot.add(
    rightLeg
  );


  /* ===================================================
     SHOES
  =================================================== */

  const leftShoe =
    new THREE.Mesh(
      shoeGeometry,
      shoeMaterial
    );

  leftShoe.position.set(
    -0.09,
    0.29,
    -0.04
  );

  npc.add(
    leftShoe
  );


  const rightShoe =
    new THREE.Mesh(
      shoeGeometry,
      shoeMaterial
    );

  rightShoe.position.set(
    0.09,
    0.29,
    -0.04
  );

  npc.add(
    rightShoe
  );


  /* ===================================================
     BAG
  =================================================== */

  let bag = null;


  if (
    Math.random() <
    0.3
  ) {

    bag =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          0.16,
          0.21,
          0.08
        ),

        makeMaterial(
          pick(bagColors)
        )

      );


    bag.position.set(
      0.2,
      1.03,
      0.11
    );


    npc.add(
      bag
    );

  }


  /* ===================================================
     PHONE
  =================================================== */

  let phone = null;


  if (
    options.phone
  ) {

    phone =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          0.07,
          0.13,
          0.018
        ),

        new THREE.MeshStandardMaterial({
          color: 0x11151b,
          metalness: 0.5,
          roughness: 0.35
        })

      );


    phone.position.set(
      0.12,
      1.42,
      -0.2
    );


    npc.add(
      phone
    );

  }


  /* ===================================================
     RANDOM HEIGHT
  =================================================== */

  const scale =
    0.92 +
    Math.random() *
    0.16;


  npc.scale.setScalar(
    scale
  );


  /* ===================================================
     USER DATA
  =================================================== */

  npc.userData = {

    head,
    hair,

    leftEye,
    rightEye,

    leftArm:
      leftArmPivot,

    rightArm:
      rightArmPivot,

    leftLeg:
      leftLegPivot,

    rightLeg:
      rightLegPivot,

    leftHand,
    rightHand,

    leftShoe,
    rightShoe,

    bag,
    phone,

    walkPhase:
      Math.random() *
      Math.PI *
      2

  };


  return npc;

}


/* =====================================================
   WALK / IDLE ANIMATION
===================================================== */

export function animateNPC(
  npc,
  time,
  moving,
  speed = 1
) {

  const data =
    npc.userData;


  if (
    !data
  ) {

    return;

  }


  if (
    moving
  ) {

    const phase =

      time *
      6 *
      speed +

      data.walkPhase;


    const swing =

      Math.sin(
        phase
      ) *

      0.45;


    /*
      Arms
  */

    data.leftArm.rotation.x =
      swing;

    data.rightArm.rotation.x =
      -swing;


    /*
      Legs
  */

    data.leftLeg.rotation.x =
      -swing *
      0.65;

    data.rightLeg.rotation.x =
      swing *
      0.65;


    /*
      Walking bounce
  */

    npc.position.y =

      Math.abs(
        Math.sin(
          phase * 2
        )
      ) *

      0.012;

  }

  else {

    /*
      Smoothly return arms
      to idle pose.
  */

    data.leftArm.rotation.x *=
      0.9;

    data.rightArm.rotation.x *=
      0.9;


    /*
      Do NOT reset leg rotations here.
      Seated NPCs use custom leg poses.
  */

  }

}


/* =====================================================
   DETAIL CONTROL
===================================================== */

export function updateNPCDetail(
  npc,
  camera
) {

  /*
    IMPORTANT

    For this stable version,
    NPC itself is never hidden.

    This prevents the previous
    "everyone disappeared" problem.
  */

  npc.visible =
    true;


  const dx =

    npc.position.x -
    camera.position.x;


  const dz =

    npc.position.z -
    camera.position.z;


  const distanceSquared =

    dx * dx +
    dz * dz;


  /*
    Small details disappear
    only when far away.
  */

  const detailed =

    distanceSquared <
    30 * 30;


  if (
    npc.userData.hair
  ) {

    npc.userData.hair.visible =
      detailed;

  }


  if (
    npc.userData.leftEye
  ) {

    npc.userData.leftEye.visible =
      detailed;

  }


  if (
    npc.userData.rightEye
  ) {

    npc.userData.rightEye.visible =
      detailed;

  }


  if (
    npc.userData.leftHand
  ) {

    npc.userData.leftHand.visible =
      detailed;

  }


  if (
    npc.userData.rightHand
  ) {

    npc.userData.rightHand.visible =
      detailed;

  }


  if (
    npc.userData.leftShoe
  ) {

    npc.userData.leftShoe.visible =
      detailed;

  }


  if (
    npc.userData.rightShoe
  ) {

    npc.userData.rightShoe.visible =
      detailed;

  }


  if (
    npc.userData.bag
  ) {

    npc.userData.bag.visible =
      detailed;

  }

}
