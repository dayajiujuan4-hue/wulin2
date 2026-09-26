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


/* =====================================================
   POPULATION
===================================================== */

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


/* =====================================================
   CREATE CROWD
===================================================== */

export function createCrowd(
  scene
) {

  console.log(
    "武林夜市：群衆システム起動"
  );


  const system = {

    walkers: [],

    shoppers: [],

    photoPeople: [],

    seatedPeople: []

  };


  /* ===================================================
     WALKERS
  =================================================== */

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


  /* ===================================================
     SHOPPERS
  =================================================== */

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


  /* ===================================================
     PHOTO PEOPLE
  =================================================== */

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


  /* ===================================================
     SEATED PEOPLE
  =================================================== */

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


  const total =

    system.walkers.length +

    system.shoppers.length +

    system.photoPeople.length +

    system.seatedPeople.length;


  console.log(
    "一般客生成数:",
    total
  );


  return system;

}


/* =====================================================
   CREATE WALKERS
===================================================== */

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
        0.5

          ? 1
          : -1,

      speed:

        0.65 +

        Math.random() *
        0.55,

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


/* =====================================================
   CREATE SHOPPER
===================================================== */

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
      0.5

        ? -2.5
        : 2.5
    ),

    0,

    spot.z +

    (
      Math.random() -
      0.5
    ) *

    3

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

      0.65 +

      Math.random() *
      0.3

  };


  scene.add(
    npc
  );


  system.shoppers.push(
    npc
  );

}


/* =====================================================
   CREATE PHOTO PERSON
===================================================== */

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
    WULIN wall direction
  */

  npc.rotation.y =
    -Math.PI / 2;


  /*
    Raise arms
  */

  npc.userData.leftArm.rotation.x =
    -1.05;

  npc.userData.rightArm.rotation.x =
    -1.05;


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


/* =====================================================
   CREATE SEATED PERSON
===================================================== */

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
    Lower body for sitting pose
  */

  npc.position.y =
    -0.25;


  npc.userData.leftLeg.rotation.x =
    -1.15;

  npc.userData.rightLeg.rotation.x =
    -1.15;


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


/* =====================================================
   UPDATE CROWD
===================================================== */

export function updateCrowd(
  system,
  delta,
  time,
  camera
) {

  /* ===================================================
     WALKERS
  =================================================== */

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


  /* ===================================================
     SHOPPERS
  =================================================== */

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


  /* ===================================================
     PHOTO
  =================================================== */

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


  /* ===================================================
     SEATED
  =================================================== */

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


/* =====================================================
   UPDATE WALKER
===================================================== */

function updateWalker(
  npc,
  delta,
  time
) {

  const behavior =
    npc.userData.behavior;


  /*
    PAUSE
  */

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


  /*
    TARGET
  */

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


  /*
    ARRIVED
  */

  if (
    arrived
  ) {

    /*
      Sometimes stop
  */

    if (
      Math.random() <
      0.3
    ) {

      behavior.pause =

        0.5 +

        Math.random() *
        2.5;

    }


    /*
      Next point
  */

    behavior.targetIndex +=
      behavior.direction;


    /*
      End of path
  */

    if (

      behavior.targetIndex >=
      behavior.path.length

    ) {

      behavior.targetIndex =
        behavior.path.length - 2;


      behavior.direction =
        -1;

    }


    /*
      Beginning of path
  */

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


/* =====================================================
   UPDATE SHOPPER
===================================================== */

function updateShopper(
  npc,
  delta,
  time
) {

  const behavior =
    npc.userData.behavior;


  /* ===================================================
     WALKING TO SHOP
  =================================================== */

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
        Face nearby stall
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


  /* ===================================================
     LOOKING AT SHOP
  =================================================== */

  else {

    behavior.wait -=
      delta;


    animateNPC(
      npc,
      time,
      false
    );


    /*
      Look around
  */

    npc.userData.head.rotation.y =

      Math.sin(

        time *
        0.7 +

        npc.userData.walkPhase

      ) *

      0.18;


    /*
      Move to another shop
  */

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


/* =====================================================
   UPDATE PHOTO PERSON
===================================================== */

function updatePhoto(
  npc,
  time
) {

  const behavior =
    npc.userData.behavior;


  /*
    Keep photo pose
  */

  npc.userData.leftArm.rotation.x =

    -1.05 +

    Math.sin(

      time *
      0.7 +

      behavior.phase

    ) *

    0.035;


  npc.userData.rightArm.rotation.x =

    -1.05 +

    Math.sin(

      time *
      0.7 +

      behavior.phase

    ) *

    0.035;


  /*
    Head movement
  */

  npc.userData.head.rotation.y =

    Math.sin(

      time *
      0.35 +

      behavior.phase

    ) *

    0.08;


  /*
    Phone movement
  */

  if (
    npc.userData.phone
  ) {

    npc.userData.phone.rotation.z =

      Math.sin(

        time *
        0.7 +

        behavior.phase

      ) *

      0.04;

  }

}


/* =====================================================
   UPDATE SEATED PERSON
===================================================== */

function updateSeated(
  npc,
  time
) {

  const behavior =
    npc.userData.behavior;


  /*
    Keep seated legs
  */

  npc.userData.leftLeg.rotation.x =
    -1.15;

  npc.userData.rightLeg.rotation.x =
    -1.15;


  /*
    Small arm movement
  */

  npc.userData.leftArm.rotation.x =

    -0.2 +

    Math.sin(

      time *
      0.5 +

      behavior.phase

    ) *

    0.08;


  npc.userData.rightArm.rotation.x =

    -0.15 +

    Math.sin(

      time *
      0.45 +

      behavior.phase

    ) *

    0.08;


  /*
    Looking around
  */

  npc.userData.head.rotation.y =

    Math.sin(

      time *
      0.4 +

      behavior.phase

    ) *

    0.25;

}
