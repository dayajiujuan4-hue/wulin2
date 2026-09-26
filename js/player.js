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

  /*
    FPS camera rig

    yawObject   = 左右
    pitchObject = 上下
  */

  const yawObject =
    new THREE.Object3D();

  const pitchObject =
    new THREE.Object3D();


  yawObject.add(
    pitchObject
  );


  pitchObject.add(
    camera
  );


  /*
    Camera itself stays at local origin.
  */

  camera.position.set(
    0,
    0,
    0
  );


  yawObject.position.set(
    0,
    CONFIG.player.height,
    22
  );


  let currentFloorHeight =
    0;


  let headBob =
    0;


  /*
    Mouse smoothing
  */

  let targetYaw =
    0;

  let targetPitch =
    0;


  let currentYaw =
    0;

  let currentPitch =
    0;


  /*
    Raycaster
  */

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


  /* =====================================================
     KEYBOARD
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


  /* =====================================================
     MOUSE LOOK
  ===================================================== */

  document.addEventListener(
    "mousemove",
    event => {

      if (
        document.pointerLockElement !==
        domElement
      ) {

        return;

      }


      const sensitivity =
        0.0022;


      targetYaw -=
        event.movementX *
        sensitivity;


      targetPitch -=
        event.movementY *
        sensitivity;


      targetPitch =
        THREE.MathUtils.clamp(
          targetPitch,
          -1.48,
          1.48
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
     RAYCAST FLOOR
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
      yawObject.position.y + 2.5,
      z
    );


    raycaster.set(
      rayOrigin,
      rayDirection
    );


    raycaster.far =
      6;


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
     STAIR FLOOR
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
     FLOOR ZONES
  ===================================================== */

  function getZoneFloor(
    x,
    z
  ) {

    let best =
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
        typeof zone.height !==
        "number"
      ) {

        continue;

      }


      const difference =
        Math.abs(
          zone.height -
          currentFloorHeight
        );


      if (
        difference <
        0.9
      ) {

        if (
          best === null ||
          zone.height > best
        ) {

          best =
            zone.height;

        }

      }

    }


    return best;

  }


  /* =====================================================
     RESOLVE FLOOR
  ===================================================== */

  function resolveFloor(
    x,
    z
  ) {

    const rayFloor =
      getRaycastFloor(
        x,
        z
      );


    if (
      rayFloor !== null
    ) {

      /*
        Avoid suddenly snapping to
        geometry far above/below player.
      */

      if (
        Math.abs(
          rayFloor -
          currentFloorHeight
        ) <
        1.25
      ) {

        return rayFloor;

      }

    }


    const zoneFloor =
      getZoneFloor(
        x,
        z
      );


    if (
      zoneFloor !== null
    ) {

      return zoneFloor;

    }


    return 0;

  }


  /* =====================================================
     UPDATE
  ===================================================== */

  function update(
    delta
  ) {

    /*
      Smooth mouse movement
  */

    const lookSmooth =
      1 -
      Math.exp(
        -22 *
        delta
      );


    currentYaw =
      THREE.MathUtils.lerp(
        currentYaw,
        targetYaw,
        lookSmooth
      );


    currentPitch =
      THREE.MathUtils.lerp(
        currentPitch,
        targetPitch,
        lookSmooth
      );


    yawObject.rotation.y =
      currentYaw;


    pitchObject.rotation.x =
      currentPitch;


    /* =================================================
       INPUT
    ================================================= */

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


    /* =================================================
       MOVEMENT
    ================================================= */

    const forwardX =
      -Math.sin(
        currentYaw
      );


    const forwardZ =
      -Math.cos(
        currentYaw
      );


    const rightX =
      Math.cos(
        currentYaw
      );


    const rightZ =
      -Math.sin(
        currentYaw
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
      X collision
  */

    const nextX =

      yawObject.position.x +

      moveX *
      distance;


    if (
      !collides(
        nextX,
        yawObject.position.z
      )
    ) {

      yawObject.position.x =
        nextX;

    }


    /*
      Z collision
  */

    const nextZ =

      yawObject.position.z +

      moveZ *
      distance;


    if (
      !collides(
        yawObject.position.x,
        nextZ
      )
    ) {

      yawObject.position.z =
        nextZ;

    }


    /* =================================================
       FLOOR
    ================================================= */

    const targetFloor =
      resolveFloor(
        yawObject.position.x,
        yawObject.position.z
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


    /* =================================================
       HEAD BOB
    ================================================= */

    let targetBob =
      0;


    if (
      inputLength > 0
    ) {

      const frequency =
        running
          ? 0.017
          : 0.011;


      const amplitude =
        running
          ? 0.025
          : 0.014;


      targetBob =

        Math.sin(
          performance.now() *
          frequency
        ) *

        amplitude;

    }


    headBob =
      THREE.MathUtils.lerp(
        headBob,
        targetBob,
        Math.min(
          1,
          delta * 12
        )
      );


    yawObject.position.y =

      CONFIG.player.height +

      currentFloorHeight;


    camera.position.y =
      headBob;

  }


  /* =====================================================
     POSITION ACCESS
  ===================================================== */

  function getPosition() {

    return yawObject.position;

  }


  return {

    update,

    object:
      yawObject,

    getPosition

  };

}
