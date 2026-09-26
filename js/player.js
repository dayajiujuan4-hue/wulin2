import * as THREE from "three";

import {
  CONFIG
} from "./config.js";

export function createPlayer(
  camera,
  element,
  colliders
) {

  camera.position.set(
    0,
    CONFIG.player.height,
    22
  );

  const keys = {};

  let yaw = 0;
  let pitch = 0;
  let walkTime = 0;

  document.addEventListener(
    "keydown",
    event => {

      keys[
        event.key.toLowerCase()
      ] = true;

    }
  );

  document.addEventListener(
    "keyup",
    event => {

      keys[
        event.key.toLowerCase()
      ] = false;

    }
  );

  document.addEventListener(
    "mousemove",
    event => {

      if (
        document.pointerLockElement !==
        element
      ) return;

      yaw -=
        event.movementX *
        .002;

      pitch -=
        event.movementY *
        .002;

      pitch =
        THREE.MathUtils.clamp(
          pitch,
          -1.35,
          1.35
        );

    }
  );


  const forward =
    new THREE.Vector3();

  const right =
    new THREE.Vector3();

  const movement =
    new THREE.Vector3();


  function collides(
    x,
    z
  ) {

    const r =
      CONFIG.player.radius;

    for (
      const box of colliders
    ) {

      if (
        x + r > box.minX &&
        x - r < box.maxX &&
        z + r > box.minZ &&
        z - r < box.maxZ
      ) {

        return true;

      }

    }

    return false;

  }


  function update(
    delta
  ) {

    camera.rotation.order =
      "YXZ";

    camera.rotation.y =
      yaw;

    camera.rotation.x =
      pitch;

    camera.getWorldDirection(
      forward
    );

    forward.y = 0;
    forward.normalize();

    right.set(
      forward.z,
      0,
      -forward.x
    );

    movement.set(
      0,
      0,
      0
    );

    if (keys["w"])
      movement.add(forward);

    if (keys["s"])
      movement.sub(forward);

    if (keys["d"])
      movement.add(right);

    if (keys["a"])
      movement.sub(right);


    const moving =
      movement.lengthSq() > 0;

    if (moving) {

      movement.normalize();

      const speed =

        keys["shift"]

        ? CONFIG.player.runSpeed

        : CONFIG.player.speed;

      const amount =
        speed * delta;

      const nextX =
        camera.position.x +
        movement.x *
        amount;

      const nextZ =
        camera.position.z +
        movement.z *
        amount;


      /*
        X/Z separately.
        This lets the player slide along walls.
      */

      if (
        !collides(
          nextX,
          camera.position.z
        )
      ) {

        camera.position.x =
          nextX;

      }

      if (
        !collides(
          camera.position.x,
          nextZ
        )
      ) {

        camera.position.z =
          nextZ;

      }


      walkTime +=
        delta *
        (
          keys["shift"]
          ? 11
          : 8
        );

      camera.position.y =
        CONFIG.player.height +
        Math.sin(
          walkTime
        ) *
        .018;

    }

    else {

      camera.position.y +=

        (
          CONFIG.player.height -
          camera.position.y
        )

        * .15;

    }

  }


  return {
    update
  };

}
