import * as THREE from "three";

import {
  CONFIG
} from "./config.js";


export function createPlayer(
  camera,
  domElement,
  colliders = [],
  floorZones = []
) {

  /* ===================================================
     STATE
  =================================================== */

  const keys = {};


  let yaw =
    0;

  let pitch =
    0;


  let currentFloorHeight =
    0;


  camera.position.set(
    0,
    CONFIG.player.height,
    22
  );


  /* ===================================================
     KEYBOARD
  =================================================== */

  window.addEventListener(
    "keydown",
    event => {

      keys[
        event.code
      ] = true;

    }
  );


  window.addEventListener(
    "keyup",
    event => {

      keys[
        event.code
      ] = false;

    }
  );


  /* ===================================================
     MOUSE
  =================================================== */

  document.addEventListener(
    "mousemove",
    event => {

      if (
        document.pointerLockElement !==
        domElement
      ) {

        return;

      }


      yaw -=

        event.movementX *
        0.002;


      pitch -=

        event.movementY *
        0.002;


      pitch =
        Math.max(

          -1.45,

          Math.min(
            1.45,
            pitch
          )

        );

    }
  );


  /* ===================================================
     COLLISION
  =================================================== */

  function collides(
    x,
    z
  ) {

    const radius =
      CONFIG.player.radius;


    for (
      const collider of
      colliders
    ) {

      const nearestX =
        Math.max(

          collider.minX,

          Math.min(
            x,
            collider.maxX
          )

        );


      const nearestZ =
        Math.max(

          collider.minZ,

          Math.min(
            z,
            collider.maxZ
          )

        );


      const dx =
        x -
        nearestX;


      const dz =
        z -
        nearestZ;


      if (

        dx * dx +
        dz * dz

        <

        radius *
        radius

      ) {

        return true;

      }

    }


    return false;

  }


  /* ===================================================
     FLOOR HEIGHT
  =================================================== */

  function getFloorHeight(
    x,
    z,
    currentY
  ) {

    let bestHeight =
      0;


    let bestDifference =
      Infinity;


    for (
      const zone of
      floorZones
    ) {

      if (

        x >= zone.minX &&
        x <= zone.maxX &&

        z >= zone.minZ &&
        z <= zone.maxZ

      ) {

        const difference =

          Math.abs(

            zone.height -
            currentY

          );


        /*
          Prevent teleporting from
          ground directly to second floor.
  */

        if (

          difference <
          0.65 &&

          difference <
          bestDifference

        ) {

          bestHeight =
            zone.height;


          bestDifference =
            difference;

        }

      }

    }


    return bestHeight;

  }


  /* ===================================================
     UPDATE
  =================================================== */

  function update(
    delta
  ) {

    /*
      Camera rotation
  */

    camera.rotation.order =
      "YXZ";


    camera.rotation.y =
      yaw;


    camera.rotation.x =
      pitch;


    /* =================================================
       MOVEMENT INPUT
    ================================================= */

    let inputX =
      0;

    let inputZ =
      0;


    if (
      keys["KeyW"]
    ) {

      inputZ -=
        1;

    }


    if (
      keys["KeyS"]
    ) {

      inputZ +=
        1;

    }


    if (
      keys["KeyA"]
    ) {

      inputX -=
        1;

    }


    if (
      keys["KeyD"]
    ) {

      inputX +=
        1;

    }


    const length =
      Math.hypot(
        inputX,
        inputZ
      );


    if (
      length >
      0
    ) {

      inputX /=
        length;

      inputZ /=
        length;

    }


    /* =================================================
       DIRECTION
    ================================================= */

    const forwardX =
      -Math.sin(
        yaw
      );


    const forwardZ =
      -Math.cos(
        yaw
      );


    const rightX =
      Math.cos(
        yaw
      );


    const rightZ =
      -Math.sin(
        yaw
      );


    const moveX =

      forwardX *
      -inputZ +

      rightX *
      inputX;


    const moveZ =

      forwardZ *
      -inputZ +

      rightZ *
      inputX;


    /* =================================================
       SPEED
    ================================================= */

    const running =

      keys["ShiftLeft"] ||
      keys["ShiftRight"];


    const speed =

      running

        ? CONFIG.player.runSpeed
        : CONFIG.player.speed;


    const step =
      speed *
      delta;


    /* =================================================
       X COLLISION
    ================================================= */

    const nextX =

      camera.position.x +

      moveX *
      step;


    if (
      !collides(
        nextX,
        camera.position.z
      )
    ) {

      camera.position.x =
        nextX;

    }


    /* =================================================
       Z COLLISION
    ================================================= */

    const nextZ =

      camera.position.z +

      moveZ *
      step;


    if (
      !collides(
        camera.position.x,
        nextZ
      )
    ) {

      camera.position.z =
        nextZ;

    }


    /* =================================================
       FLOOR / STAIRS
    ================================================= */

    const targetFloor =

      getFloorHeight(

        camera.position.x,

        camera.position.z,

        currentFloorHeight

      );


    /*
      Smooth vertical movement.
  */

    currentFloorHeight =

      THREE.MathUtils.lerp(

        currentFloorHeight,

        targetFloor,

        Math.min(
          1,
          delta * 12
        )

      );


    camera.position.y =

      CONFIG.player.height +

      currentFloorHeight;


    /* =================================================
       WALK BOB
    ================================================= */

    if (
      length >
      0
    ) {

      const time =
        performance.now() *
        0.009;


      camera.position.y +=

        Math.sin(
          time
        ) *

        0.015;

    }

  }


  return {
    update
  };

}
