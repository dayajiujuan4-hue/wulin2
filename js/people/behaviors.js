import * as THREE from "three";


/*
=====================================================
PATHS

一本道ではなく、街区を回るルートを複数用意。
=====================================================
*/

export const PATHS = {


  /*
    メインストリート往復
  */

  main: [

    new THREE.Vector3(
      -2,
      0,
      12
    ),

    new THREE.Vector3(
      2,
      0,
      -8
    ),

    new THREE.Vector3(
      -1,
      0,
      -28
    ),

    new THREE.Vector3(
      2,
      0,
      -47
    ),

    new THREE.Vector3(
      0,
      0,
      -63
    )

  ],


  /*
    中央広場周回
  */

  square: [

    new THREE.Vector3(
      -8,
      0,
      -55
    ),

    new THREE.Vector3(
      8,
      0,
      -55
    ),

    new THREE.Vector3(
      10,
      0,
      -69
    ),

    new THREE.Vector3(
      -9,
      0,
      -71
    )

  ],


  /*
    飲食横丁
  */

  food: [

    new THREE.Vector3(
      -12,
      0,
      -63
    ),

    new THREE.Vector3(
      -20,
      0,
      -63
    ),

    new THREE.Vector3(
      -29,
      0,
      -65
    ),

    new THREE.Vector3(
      -37,
      0,
      -67
    ),

    new THREE.Vector3(
      -31,
      0,
      -75
    )

  ],


  /*
    ネオン広場
  */

  neon: [

    new THREE.Vector3(
      11,
      0,
      -62
    ),

    new THREE.Vector3(
      20,
      0,
      -63
    ),

    new THREE.Vector3(
      29,
      0,
      -68
    ),

    new THREE.Vector3(
      35,
      0,
      -64
    )

  ],


  /*
    文創路地
  */

  creative: [

    new THREE.Vector3(
      2,
      0,
      -76
    ),

    new THREE.Vector3(
      -2,
      0,
      -89
    ),

    new THREE.Vector3(
      2,
      0,
      -104
    ),

    new THREE.Vector3(
      -1,
      0,
      -116
    )

  ],


  /*
    裏路地
  */

  back: [

    new THREE.Vector3(
      8,
      0,
      -12
    ),

    new THREE.Vector3(
      18,
      0,
      -12
    ),

    new THREE.Vector3(
      27,
      0,
      -17
    ),

    new THREE.Vector3(
      28,
      0,
      -34
    ),

    new THREE.Vector3(
      20,
      0,
      -47
    ),

    new THREE.Vector3(
      10,
      0,
      -48
    )

  ]

};


/*
=====================================================
RANDOM POSITION NEAR PATH
=====================================================
*/

export function positionOnPath(
  path,
  index
) {

  const point =
    path[
      index %
      path.length
    ];

  return new THREE.Vector3(

    point.x +
    (
      Math.random() -
      .5
    ) * 2.2,

    0,

    point.z +
    (
      Math.random() -
      .5
    ) * 1.8

  );

}


/*
=====================================================
MOVE TOWARD TARGET
=====================================================
*/

export function moveTowards(
  npc,
  target,
  speed,
  delta
) {

  const dx =
    target.x -
    npc.position.x;

  const dz =
    target.z -
    npc.position.z;

  const distance =
    Math.sqrt(
      dx * dx +
      dz * dz
    );


  if (
    distance <
    .18
  ) {

    return true;

  }


  const nx =
    dx / distance;

  const nz =
    dz / distance;


  npc.position.x +=
    nx *
    speed *
    delta;

  npc.position.z +=
    nz *
    speed *
    delta;


  /*
    Model forward = -Z
  */

  npc.rotation.y =
    Math.atan2(
      -nx,
      -nz
    );


  return false;

}


/*
=====================================================
STALL STOP LOCATIONS

買い物客が立ち止まる場所。
=====================================================
*/

export const SHOPPING_SPOTS = [

  [-4.7, 6],
  [4.7, 1],

  [-4.7, -8],
  [4.7, -14],

  [-4.7, -25],
  [4.7, -31],

  [-4.7, -40],
  [4.7, -44],

  [-18, -63],
  [-25, -63],
  [-32, -63],

  [-4.5, -87],
  [4.5, -93],

  [-4.5, -105],
  [4.5, -111]

].map(
  ([x,z]) =>
    new THREE.Vector3(
      x,
      0,
      z
    )
);


/*
=====================================================
NEON PHOTO SPOTS
=====================================================
*/

export const PHOTO_SPOTS = [

  new THREE.Vector3(
    31,
    0,
    -63
  ),

  new THREE.Vector3(
    30,
    0,
    -67
  ),

  new THREE.Vector3(
    32,
    0,
    -70
  )

];


/*
=====================================================
FOOD SEATS
=====================================================
*/

export const SEAT_SPOTS = [

  [-35, -74],
  [-31, -74],
  [-27, -74],

  [-35, -70],
  [-31, -70],
  [-27, -70],

  [-35, -66],
  [-31, -66]

].map(
  ([x,z]) =>
    new THREE.Vector3(
      x,
      0,
      z
    )
);
