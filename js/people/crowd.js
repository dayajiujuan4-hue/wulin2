import * as THREE from "three";

import {
  createNPC,
  animateNPC,
  updateNPCDetail
} from "./npc.js";

import {
  PATHS,
  SHOPPING_SPOTS,
  PHOTO_SPOTS,
  SEAT_SPOTS,
  positionOnPath,
  moveTowards
} from "./behaviors.js";


/*
=====================================================
SETTINGS
=====================================================

最初は約55人。

後で増減しやすいように
ここだけで人数を管理する。
=====================================================
*/

const POPULATION = {

  walkersMain: 14,

  walkersSquare: 8,

  walkersFood: 5,

  walkersCreative: 6,

  walkersBack: 3,

  shoppers: 8,

  photo: 4,

  seated: 7

};


/*
=====================================================
CREATE CROWD
=====================================================
*/

export function createCrowd(
  scene
) {

  const system = {

    walkers: [],

    shoppers: [],

    photoPeople: [],

    seatedPeople: []

  };


  /*
    WALKERS
  */

  createWalkers(
    scene,
    system,
    PATHS.main,
    POPULATION.walkersMain,
    "main"
  );

  createWalkers(
    scene,
    system,
    PATHS.square,
    POPULATION.walkersSquare,
    "square"
  );

  createWalkers(
    scene,
    system,
    PATHS.food,
    POPULATION.walkersFood,
    "food"
  );

  createWalkers(
    scene,
    system,
    PATHS.creative,
    POPULATION.walkersCreative,
    "creative"
  );

  createWalkers(
    scene,
    system,
    PATHS.back,
    POPULATION.walkersBack,
    "back"
  );


  /*
    SHOPPERS
  */

  for (
    let i = 0;
    i < POPULATION.shoppers;
    i++
  ) {

    createShopper(
      scene,
      system,
      i
    );

  }


  /*
    PHOTO PEOPLE
  */

  for (
    let i = 0;
    i < POPULATION.photo;
    i++
  ) {

    createPhotoPerson(
      scene,
      system,
      i
    );

  }


  /*
    SEATED
  */

  for (
    let i = 0;
    i < POPULATION.seated;
    i++
  ) {

    createSeatedPerson(
      scene,
      system,
      i
    );

  }


  return system;

}


/*
=====================================================
WALKERS
=====================================================
*/

function createWalkers(
  scene,
  system,
  path,
  count,
  area
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const npc =
      createNPC();


    const pointIndex =
      Math.floor(
        Math.random() *
        path.length
      );


    const position =
      positionOnPath(
        path,
        pointIndex
      );


    npc.position.copy(
      position
    );


    npc.userData.behavior = {

      type:
        "walking",

      area,

      path,

      targetIndex:
        (
          pointIndex + 1
        ) %
        path.length,

      direction:
        Math.random() >
        .5
          ? 1
          : -1,

      speed:
        .65 +
        Math.random() *
        .55,

      pause:
        0

    };


    scene.add(
      npc
    );


    system.walkers.push(
      npc
    );

  }

}


/*
=====================================================
SHOPPERS
=====================================================
*/

function createShopper(
  scene,
  system,
  index
) {

  const npc =
    createNPC();


  const spot =
    SHOPPING_SPOTS[
      index %
      SHOPPING_SPOTS.length
    ];


  npc.position.set(

    spot.x +
    (
      Math.random() >
      .5
        ? -2.5
        : 2.5
    ),

    0,

    spot.z +
    (
      Math.random() -
      .5
    ) * 3

  );


  npc.userData.behavior = {

    type:
      "shopping",

    state:
      "walking",

    target:
      spot.clone(),

    wait:
      0,

    speed:
      .65 +
      Math.random() *
      .3

  };


  scene.add(
    npc
  );


  system.shoppers.push(
    npc
  );

}


/*
=====================================================
PHOTO PEOPLE
=====================================================
*/

function createPhotoPerson(
  scene,
  system,
  index
) {

  const npc =
    createNPC({
      phone: true
    });


  const spot =
    PHOTO_SPOTS[
      index %
      PHOTO_SPOTS.length
    ];


  npc.position.copy(
    spot
  );


  /*
    Face WULIN wall.
  */

  npc.rotation.y =
    -Math.PI / 2;


  /*
    Raise arms a little.
  */

  npc.userData.leftArm.rotation.x =
    -1.15;

  npc.userData.rightArm.rotation.x =
    -1.15;


  npc.userData.behavior = {

    type:
      "photo",

    phase:
      Math.random() *
      10

  };


  scene.add(
    npc
  );


  system.photoPeople.push(
    npc
  );

}


/*
=====================================================
SEATED PEOPLE
=====================================================
*/

function createSeatedPerson(
  scene,
  system,
  index
) {

  const npc =
    createNPC();


  const spot =
    SEAT_SPOTS[
      index %
      SEAT_SPOTS.length
    ];


  npc.position.copy(
    spot
  );


  /*
    Fake sitting pose.
  */

  npc.position.y =
    -.28;


  npc.userData.leftLeg.rotation.x =
    -1.2;

  npc.userData.rightLeg.rotation.x =
    -1.2;


  npc.rotation.y =
    (
      index %
      4
    ) *
    Math.PI /
    2;


  npc.userData.behavior = {

    type:
      "seated",

    phase:
      Math.random() *
      10

  };


  scene.add(
    npc
  );


  system.seatedPeople.push(
    npc
  );

}


/*
=====================================================
UPDATE
=====================================================
*/

export function updateCrowd(
  system,
  delta,
  time,
  camera
) {

  /*
    WALKERS
  */

  for (
    const npc of
    system.walkers
  ) {

    updateWalker(
      npc,
      delta,
      time
    );

    updateNPCDetail(
      npc,
      camera
    );

  }


  /*
    SHOPPERS
  */

  for (
    const npc of
    system.shoppers
  ) {

    updateShopper(
      npc,
      delta,
      time
    );

    updateNPCDetail(
      npc,
      camera
    );

  }


  /*
    PHOTO
  */

  for (
    const npc of
    system.photoPeople
  ) {

    updatePhoto(
      npc,
      time
    );

    updateNPCDetail(
      npc,
      camera
    );

  }


  /*
    SEATED
  */

  for (
    const npc of
    system.seatedPeople
  ) {

    updateSeated(
      npc,
      time
    );

    updateNPCDetail(
      npc,
      camera
    );

  }

}


/*
=====================================================
WALKER UPDATE
=====================================================
*/

function updateWalker(
  npc,
  delta,
  time
) {

  const behavior =
    npc.userData.behavior;


  if (
    behavior.pause >
    0
  ) {

    behavior.pause -=
      delta;

    animateNPC(
      npc,
      time,
      false
    );

    return;

  }


  const target =
    behavior.path[
      behavior.targetIndex
    ];


  const arrived =
    moveTowards(

      npc,

      target,

      behavior.speed,

      delta

    );


  animateNPC(
    npc,
    time,
    true,
    behavior.speed
  );


  if (
    arrived
  ) {

    /*
      Occasional pause.
  */

    if (
      Math.random() <
      .3
    ) {

      behavior.pause =
        .5 +
        Math.random() *
        2.5;

    }


    behavior.targetIndex +=
      behavior.direction;


    if (
      behavior.targetIndex >=
      behavior.path.length
    ) {

      behavior.targetIndex =
        behavior.path.length - 2;

      behavior.direction =
        -1;

    }


    if (
      behavior.targetIndex <
      0
    ) {

      behavior.targetIndex =
        1;

      behavior.direction =
        1;

    }

  }

}


/*
=====================================================
SHOPPER UPDATE
=====================================================
*/

function updateShopper(
  npc,
  delta,
  time
) {

  const behavior =
    npc.userData.behavior;


  if (
    behavior.state ===
    "walking"
  ) {

    const arrived =
      moveTowards(

        npc,

        behavior.target,

        behavior.speed,

        delta

      );


    animateNPC(
      npc,
      time,
      true,
      behavior.speed
    );


    if (
      arrived
    ) {

      behavior.state =
        "looking";

      behavior.wait =
        4 +
        Math.random() *
        7;


      /*
        Face outward toward stall.
      */

      if (
        npc.position.x <
        0
      ) {

        npc.rotation.y =
          -Math.PI / 2;

      }

      else {

        npc.rotation.y =
          Math.PI / 2;

      }

    }

  }

  else {

    behavior.wait -=
      delta;


    animateNPC(
      npc,
      time,
      false
    );


    /*
      Slight looking motion
  */

    npc.userData.head.rotation.y =

      Math.sin(
        time * .7 +
        npc.userData.walkPhase
      ) * .18;


    if (
      behavior.wait <=
      0
    ) {

      const newSpot =
        SHOPPING_SPOTS[
          Math.floor(
            Math.random() *
            SHOPPING_SPOTS.length
          )
        ];


      behavior.target =
        newSpot.clone();


      behavior.state =
        "walking";


      npc.userData.head.rotation.y =
        0;

    }

  }

}


/*
=====================================================
PHOTO UPDATE
=====================================================
*/

function updatePhoto(
  npc,
  time
) {

  animateNPC(
    npc,
    time,
    false
  );


  const behavior =
    npc.userData.behavior;


  npc.userData.head.rotation.y =

    Math.sin(
      time * .35 +
      behavior.phase
    ) * .08;


  /*
    Slight phone movement
  */

  if (
    npc.userData.phone
  ) {

    npc.userData.phone.rotation.z =

      Math.sin(
        time * .7 +
        behavior.phase
      ) * .04;

  }

}


/*
=====================================================
SEATED UPDATE
=====================================================
*/

function updateSeated(
  npc,
  time
) {

  animateNPC(
    npc,
    time,
    false
  );


  const behavior =
    npc.userData.behavior;


  npc.userData.head.rotation.y =

    Math.sin(
      time * .4 +
      behavior.phase
    ) * .25;

}
