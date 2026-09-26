import * as THREE from "three";


/*
=====================================================
SHARED GEOMETRY

全NPCでGeometryを共有することで
メモリ消費を抑える。
=====================================================
*/

const headGeometry =
  new THREE.SphereGeometry(
    .115,
    8,
    6
  );

const hairGeometry =
  new THREE.SphereGeometry(
    .12,
    8,
    5,
    0,
    Math.PI * 2,
    0,
    Math.PI * .55
  );

const torsoGeometry =
  new THREE.CapsuleGeometry(
    .15,
    .38,
    3,
    6
  );

const armGeometry =
  new THREE.CapsuleGeometry(
    .045,
    .34,
    2,
    5
  );

const legGeometry =
  new THREE.CapsuleGeometry(
    .055,
    .42,
    2,
    5
  );

const shoeGeometry =
  new THREE.BoxGeometry(
    .11,
    .07,
    .21
  );

const eyeGeometry =
  new THREE.SphereGeometry(
    .012,
    5,
    4
  );


/*
=====================================================
COLORS
=====================================================
*/

const skinColors = [
  0xf0c5a4,
  0xe8b58f,
  0xdca57f,
  0xf2cdb0,
  0xc98d68
];

const clothingColors = [
  0x20242b,
  0x374d69,
  0x9c3934,
  0xd4c9b4,
  0x55755b,
  0x715578,
  0x404040,
  0xbaa86f,
  0xeeeeea,
  0x263b55
];

const trouserColors = [
  0x15171b,
  0x242b34,
  0x383838,
  0x243247,
  0x5b5148
];

const hairColors = [
  0x15110f,
  0x211815,
  0x32231c,
  0x090909,
  0x3a2a22
];


function choose(array) {

  return array[
    Math.floor(
      Math.random() *
      array.length
    )
  ];

}


function material(color) {

  return new THREE.MeshStandardMaterial({
    color,
    roughness: .82
  });

}


/*
=====================================================
CREATE NPC
=====================================================
*/

export function createNPC(options = {}) {

  const group =
    new THREE.Group();


  const heightScale =
    options.heightScale ??
    (
      .91 +
      Math.random() *
      .18
    );


  const skinMaterial =
    material(
      choose(skinColors)
    );

  const shirtMaterial =
    material(
      choose(clothingColors)
    );

  const trouserMaterial =
    material(
      choose(trouserColors)
    );

  const hairMaterial =
    material(
      choose(hairColors)
    );

  const shoeMaterial =
    material(0x111214);


  /*
    ROOT BODY
  */

  const body =
    new THREE.Group();

  body.scale.y =
    heightScale;

  group.add(body);


  /*
    TORSO
  */

  const torso =
    new THREE.Mesh(
      torsoGeometry,
      shirtMaterial
    );

  torso.position.y =
    1.15;

  torso.castShadow =
    false;

  body.add(torso);


  /*
    NECK
  */

  const neck =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .055,
        .06,
        .1,
        6
      ),

      skinMaterial

    );

  neck.position.y =
    1.48;

  body.add(neck);


  /*
    HEAD
  */

  const head =
    new THREE.Mesh(
      headGeometry,
      skinMaterial
    );

  head.position.y =
    1.64;

  body.add(head);


  /*
    HAIR
  */

  const hair =
    new THREE.Mesh(
      hairGeometry,
      hairMaterial
    );

  hair.position.set(
    0,
    1.68,
    0
  );

  body.add(hair);


  /*
    EYES

    NPC forward = negative Z
  */

  const eyeMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x151515
    });

  for (
    const x of [-.04, .04]
  ) {

    const eye =
      new THREE.Mesh(
        eyeGeometry,
        eyeMaterial
      );

    eye.position.set(
      x,
      1.65,
      -.108
    );

    body.add(eye);

  }


  /*
    ARMS
  */

  const leftArm =
    new THREE.Mesh(
      armGeometry,
      shirtMaterial
    );

  const rightArm =
    new THREE.Mesh(
      armGeometry,
      shirtMaterial
    );

  leftArm.position.set(
    -.205,
    1.12,
    0
  );

  rightArm.position.set(
    .205,
    1.12,
    0
  );

  body.add(
    leftArm,
    rightArm
  );


  /*
    HANDS
  */

  const handGeometry =
    new THREE.SphereGeometry(
      .045,
      6,
      4
    );

  const leftHand =
    new THREE.Mesh(
      handGeometry,
      skinMaterial
    );

  const rightHand =
    new THREE.Mesh(
      handGeometry,
      skinMaterial
    );

  leftHand.position.set(
    -.205,
    .88,
    0
  );

  rightHand.position.set(
    .205,
    .88,
    0
  );

  body.add(
    leftHand,
    rightHand
  );


  /*
    LEGS
  */

  const leftLeg =
    new THREE.Mesh(
      legGeometry,
      trouserMaterial
    );

  const rightLeg =
    new THREE.Mesh(
      legGeometry,
      trouserMaterial
    );

  leftLeg.position.set(
    -.085,
    .55,
    0
  );

  rightLeg.position.set(
    .085,
    .55,
    0
  );

  body.add(
    leftLeg,
    rightLeg
  );


  /*
    SHOES
  */

  const leftShoe =
    new THREE.Mesh(
      shoeGeometry,
      shoeMaterial
    );

  const rightShoe =
    new THREE.Mesh(
      shoeGeometry,
      shoeMaterial
    );

  leftShoe.position.set(
    -.085,
    .25,
    -.035
  );

  rightShoe.position.set(
    .085,
    .25,
    -.035
  );

  body.add(
    leftShoe,
    rightShoe
  );


  /*
    BAG

    一部NPCだけバッグを持つ
  */

  if (
    Math.random() <
    .32
  ) {

    const bag =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .16,
          .2,
          .08
        ),

        material(
          choose([
            0x2c2c2c,
            0x704934,
            0xc3a77a,
            0x35475d
          ])
        )

      );

    bag.position.set(
      .2,
      .98,
      .1
    );

    body.add(bag);

  }


  /*
    PHONE

    photo NPC用
  */

  let phone = null;

  if (
    options.phone
  ) {

    phone =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .065,
          .12,
          .012
        ),

        new THREE.MeshStandardMaterial({
          color: 0x111319,
          metalness: .4
        })

      );

    phone.position.set(
      .12,
      1.42,
      -.19
    );

    body.add(phone);

  }


  /*
    LOD-ish detail control

    完全なTHREE.LODではなく、
    距離によって細かいパーツを消す。
    こちらの方が既存アニメーションと
    組み合わせやすい。
  */

  const detailParts = [
    hair,
    neck,
    leftHand,
    rightHand,
    leftShoe,
    rightShoe
  ];


  /*
    ANIMATION DATA
  */

  group.userData = {

    body,

    torso,

    head,

    leftArm,
    rightArm,

    leftLeg,
    rightLeg,

    detailParts,

    phone,

    walkPhase:
      Math.random() *
      Math.PI *
      2,

    heightScale

  };


  return group;

}


/*
=====================================================
ANIMATION
=====================================================
*/

export function animateNPC(
  npc,
  time,
  moving,
  speed = 1
) {

  const data =
    npc.userData;

  if (!data) return;


  if (moving) {

    const cycle =
      time *
      7 *
      speed +
      data.walkPhase;

    const swing =
      Math.sin(cycle) *
      .42;

    data.leftArm.rotation.x =
      swing;

    data.rightArm.rotation.x =
      -swing;

    data.leftLeg.rotation.x =
      -swing * .7;

    data.rightLeg.rotation.x =
      swing * .7;

    data.body.position.y =
      Math.abs(
        Math.sin(cycle * 2)
      ) * .015;

  }

  else {

    const idle =
      Math.sin(
        time * 1.5 +
        data.walkPhase
      );

    data.leftArm.rotation.x *=
      .9;

    data.rightArm.rotation.x *=
      .9;

    data.leftLeg.rotation.x *=
      .9;

    data.rightLeg.rotation.x *=
      .9;

    data.body.position.y =
      idle * .004;

  }

}


/*
=====================================================
DISTANCE DETAIL
=====================================================
*/

export function updateNPCDetail(
  npc,
  camera
) {

  const distance =
    npc.position.distanceTo(
      camera.position
    );

  const data =
    npc.userData;


  /*
    Very far NPC:
    entire NPC hidden.
  */

  npc.visible =
    distance < 58;

  if (!npc.visible)
    return;


  /*
    Hair/hands/shoes disappear
    in the distance.
  */

  const detailed =
    distance < 23;

  for (
    const part of
    data.detailParts
  ) {

    part.visible =
      detailed;

  }

}
