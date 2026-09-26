import * as THREE from "three";

import {
  CONFIG
} from "./config.js";


export function createPlayer(
  camera,
  domElement,
  colliders = [],
  floorZones = [],
  walkableObjects = []
) {

  const keys = {};


  let yaw = 0;

  let pitch = 0;


  let currentFloorHeight =
    0;


  const raycaster =
    new THREE.Raycaster();


  const rayOrigin =
    new THREE.Vector3();


  const rayDirection =
    new THREE.Vector3(
      0,
      -1,
      0
    );


  camera.position.set(
    0,
    CONFIG.player.height,
    22
  );


  /* =====================================================
     INPUT
  ===================================================== */

  window.addEventListener(
    "keydown",
    event => {

      keys[event.code] =
        true;

    }
  );


  window.addEventListener(
    "keyup",
    event => {

      keys[event.code] =
        false;

    }
  );


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
        THREE.MathUtils.clamp(
          pitch,
          -1.45,
          1.45
        );

    }
  );


  /* =====================================================
     COLLISION
  ===================================================== */

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
        radius * radius
      ) {

        return true;

      }

    }


    return false;

  }


  /* =====================================================
     RAYCAST GROUND
  ===================================================== */

  function getRaycastFloor(
    x,
    z
  ) {

    if (
      walkableObjects.length ===
      0
    ) {

      return null;

    }


    rayOrigin.set(

      x,

      camera.position.y +
      2,

      z

    );


    raycaster.set(
      rayOrigin,
      rayDirection
    );


    raycaster.far =
      5;


    const hits =
      raycaster.intersectObjects(
        walkableObjects,
        true
      );


    if (
      hits.length ===
      0
    ) {

      return null;

    }


    return hits[0].point.y;

  }


  /* =====================================================
     LEGACY STAIR HEIGHT
  ===================================================== */

  function getStairHeight(
    zone,
    x,
    z
  ) {

    let progress;


    if (
      zone.axis === "z"
    ) {

      progress =

        (
          z -
          zone.minZ
        )

        /

        (
          zone.maxZ -
          zone.minZ
        );

    }

    else {

      progress =

        (
          x -
          zone.minX
        )

        /

        (
          zone.maxX -
          zone.minX
        );

    }


    progress =
      THREE.MathUtils.clamp(
        progress,
        0,
        1
      );


    return THREE.MathUtils.lerp(

      zone.startHeight,

      zone.endHeight,

      progress

    );

  }


  /* =====================================================
     LEGACY FLOOR ZONES
  ===================================================== */

  function getZoneFloor(
    x,
    z
  ) {

    let result =
      null;


    for (
      const zone of
      floorZones
    ) {

      if (

        x < zone.minX ||
        x > zone.maxX ||
        z < zone.minZ ||
        z > zone.maxZ

      ) {

        continue;

      }


      if (
        zone.type ===
        "stairs"
      ) {

        return getStairHeight(
          zone,
          x,
          z
        );

      }


      if (
        typeof zone.height ===
        "number"
      ) {

        const difference =

          Math.abs(

            zone.height -
            currentFloorHeight

          );


        if (
          difference <
          0.85
        ) {

          if (
            result === null ||
            zone.height > result
          ) {

            result =
              zone.height;

          }

        }

      }

    }


    return result;

  }


  /* =====================================================
     GROUND RESOLUTION
  ===================================================== */

  function resolveFloor(
    x,
    z
  ) {

    /*
      First try actual geometry.
  */

    const rayHeight =
      getRaycastFloor(
        x,
        z
      );


    if (
      rayHeight !== null
    ) {

      return rayHeight;

    }


    /*
      Fall back to existing system.
  */

    const zoneHeight =
      getZoneFloor(
        x,
        z
      );


    if (
      zoneHeight !== null
    ) {

      return zoneHeight;

    }


    return 0;

  }


  /* =====================================================
     UPDATE
  ===================================================== */

  function update(
    delta
  ) {

    camera.rotation.order =
      "YXZ";


    camera.rotation.y =
      yaw;


    camera.rotation.x =
      pitch;


    let inputX = 0;
    let inputZ = 0;


    if (
      keys["KeyW"]
    ) {
      inputZ -= 1;
    }


    if (
      keys["KeyS"]
    ) {
      inputZ += 1;
    }


    if (
      keys["KeyA"]
    ) {
      inputX -= 1;
    }


    if (
      keys["KeyD"]
    ) {
      inputX += 1;
    }


    const inputLength =
      Math.hypot(
        inputX,
        inputZ
      );


    if (
      inputLength > 0
    ) {

      inputX /=
        inputLength;

      inputZ /=
        inputLength;

    }


    const forwardX =
      -Math.sin(yaw);


    const forwardZ =
      -Math.cos(yaw);


    const rightX =
      Math.cos(yaw);


    const rightZ =
      -Math.sin(yaw);


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


    const running =

      keys["ShiftLeft"] ||
      keys["ShiftRight"];


    const speed =

      running

        ? CONFIG.player.runSpeed
        : CONFIG.player.speed;


    const distance =
      speed *
      delta;


    /*
      X
  */

    const nextX =

      camera.position.x +

      moveX *
      distance;


    if (
      !collides(
        nextX,
        camera.position.z
      )
    ) {

      camera.position.x =
        nextX;

    }


    /*
      Z
  */

    const nextZ =

      camera.position.z +

      moveZ *
      distance;


    if (
      !collides(
        camera.position.x,
        nextZ
      )
    ) {

      camera.position.z =
        nextZ;

    }


    /*
      Ground
  */

    const targetFloor =

      resolveFloor(

        camera.position.x,

        camera.position.z

      );


    currentFloorHeight =

      THREE.MathUtils.lerp(

        currentFloorHeight,

        targetFloor,

        Math.min(
          1,
          delta * 18
        )

      );


    camera.position.y =

      CONFIG.player.height +

      currentFloorHeight;


    /*
      Walking camera
  */

    if (
      inputLength >
      0
    ) {

      const time =
        performance.now() *
        0.009;


      camera.position.y +=

        Math.sin(time) *
        0.011;

    }

  }


  return {
    update
  };

}
