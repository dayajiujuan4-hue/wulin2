import * as THREE from "three";

import {
  PointerLockControls
} from "three/addons/controls/PointerLockControls.js";

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

  /* =====================================================
     POINTER LOCK CONTROLS
  ===================================================== */

  const controls =
    new PointerLockControls(
      camera,
      domElement
    );


  /*
    PointerLockControlsが
    camera.rotationを管理する。

    これ以降、自前でyaw/pitchを
    cameraへ書き込まない。
  */

  camera.position.set(
    0,
    CONFIG.player.height,
    22
  );


  /* =====================================================
     INPUT
  ===================================================== */

  const keys = {};


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


  /*
    フォーカスを失ったとき
    キー押しっぱなし状態を解除
  */

  window.addEventListener(
    "blur",
    () => {

      for (
        const key in keys
      ) {

        keys[key] =
          false;

      }

    }
  );


  /* =====================================================
     FLOOR SYSTEM
  ===================================================== */

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


  function getRaycastFloor(
    x,
    z
  ) {

    if (
      !walkableObjects ||
      walkableObjects.length === 0
    ) {

      return null;

    }


    rayOrigin.set(
      x,
      camera.position.y + 2.5,
      z
    );


    raycaster.set(
      rayOrigin,
      rayDirection
    );


    raycaster.far =
      7;


    const hits =
      raycaster.intersectObjects(
        walkableObjects,
        true
      );


    if (
      hits.length === 0
    ) {

      return null;

    }


    return hits[0].point.y;

  }


  /* =====================================================
     STAIR HEIGHT
  ===================================================== */

  function getStairHeight(
    zone,
    x,
    z
  ) {

    let progress = 0;


    if (
      zone.axis === "z"
    ) {

      progress =

        (
          z -
          zone.minZ
        )

        /

        Math.max(
          0.001,
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

        Math.max(
          0.001,
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

    /*
      階段を最優先
  */

    for (
      const zone of floorZones
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
        zone.type === "stairs"
      ) {

        return getStairHeight(
          zone,
          x,
          z
        );

      }

    }


    /*
      通常床
  */

    let best =
      null;


    for (
      const zone of floorZones
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
        difference <= 1.05
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


  function resolveFloor(
    x,
    z
  ) {

    /*
      現在は階段Zoneを優先。

      Raycaster移行途中なので、
      これが一番安定する。
  */

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


    const rayFloor =
      getRaycastFloor(
        x,
        z
      );


    if (
      rayFloor !== null
    ) {

      if (
        Math.abs(
          rayFloor -
          currentFloorHeight
        ) <= 1.2
      ) {

        return rayFloor;

      }

    }


    return 0;

  }


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
      const collider of colliders
    ) {

      const nearestX =
        THREE.MathUtils.clamp(
          x,
          collider.minX,
          collider.maxX
        );


      const nearestZ =
        THREE.MathUtils.clamp(
          z,
          collider.minZ,
          collider.maxZ
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
     MOVEMENT VECTORS
  ===================================================== */

  const forward =
    new THREE.Vector3();


  const right =
    new THREE.Vector3();


  const movement =
    new THREE.Vector3();


  let bobTime =
    0;


  /* =====================================================
     UPDATE
  ===================================================== */

  function update(
    delta
  ) {

    /*
      PointerLockControlsが
      視点を自動更新してくれるので、
      ここではrotationを一切触らない。
  */


    let forwardInput = 0;
    let sideInput = 0;


    if (
      keys["KeyW"]
    ) {

      forwardInput += 1;

    }


    if (
      keys["KeyS"]
    ) {

      forwardInput -= 1;

    }


    if (
      keys["KeyD"]
    ) {

      sideInput += 1;

    }


    if (
      keys["KeyA"]
    ) {

      sideInput -= 1;

    }


    const moving =

      forwardInput !== 0 ||
      sideInput !== 0;


    const running =

      keys["ShiftLeft"] ||
      keys["ShiftRight"];


    const speed =

      running

        ? CONFIG.player.runSpeed
        : CONFIG.player.speed;


    /* =================================================
       CAMERA DIRECTION
    ================================================= */

    camera.getWorldDirection(
      forward
    );


    /*
      上下を見ると移動方向まで
      上下しないようYを消す
  */

    forward.y = 0;


    if (
      forward.lengthSq() >
      0.0001
    ) {

      forward.normalize();

    }


    right
      .crossVectors(
        forward,
        camera.up
      )
      .normalize();


    movement.set(
      0,
      0,
      0
    );


    movement.addScaledVector(
      forward,
      forwardInput
    );


    movement.addScaledVector(
      right,
      sideInput
    );


    if (
      movement.lengthSq() >
      1
    ) {

      movement.normalize();

    }


    movement.multiplyScalar(
      speed *
      delta
    );


    /* =================================================
       X COLLISION
    ================================================= */

    const nextX =

      camera.position.x +
      movement.x;


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
      movement.z;


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
       FLOOR
    ================================================= */

    const targetFloor =
      resolveFloor(
        camera.position.x,
        camera.position.z
      );


    /*
      階段はある程度素早く追従。
  */

    currentFloorHeight =
      THREE.MathUtils.lerp(
        currentFloorHeight,
        targetFloor,
        Math.min(
          1,
          delta * 22
        )
      );


    /* =================================================
       HEAD BOB
    ================================================= */

    let bob =
      0;


    if (
      moving &&
      controls.isLocked
    ) {

      bobTime +=

        delta *

        (
          running
            ? 13
            : 9
        );


      bob =

        Math.sin(
          bobTime
        )

        *

        (
          running
            ? 0.025
            : 0.012
        );

    }


    camera.position.y =

      CONFIG.player.height +
      currentFloorHeight +
      bob;

  }


  /* =====================================================
     PUBLIC
  ===================================================== */

  function lock() {

    controls.lock();

  }


  function unlock() {

    controls.unlock();

  }


  function getPosition() {

    return camera.position;

  }


  return {

    update,

    controls,

    lock,

    unlock,

    getPosition

  };

}
