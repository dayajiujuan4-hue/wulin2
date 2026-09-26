import * as THREE from "three";

import {
  CONFIG,
  AREAS
} from "./config.js";

import {
  createWorld,
  updateWorld
} from "./world/world.js";

import {
  createPlayer
} from "./player.js";

import {
  createRenderer
} from "./core/renderer.js";

import {
  createPostProcessing
} from "./effects/postprocessing.js";


/* =====================================================
   SCENE
===================================================== */

const scene =
  new THREE.Scene();


scene.background =
  new THREE.Color(
    0x050a14
  );


scene.fog =
  new THREE.FogExp2(
    0x07101c,
    CONFIG.quality.medium.fogDensity
  );


/* =====================================================
   CAMERA
===================================================== */

const camera =
  new THREE.PerspectiveCamera(
    70,
    window.innerWidth /
    window.innerHeight,
    0.08,
    240
  );


/* =====================================================
   RENDERER
===================================================== */

const renderer =
  createRenderer();


/* =====================================================
   POST PROCESSING
===================================================== */

const post =
  createPostProcessing(
    renderer,
    scene,
    camera
  );


/* =====================================================
   WORLD
===================================================== */

let world = null;

let player = null;


try {

  setLoading(10);


  world =
    createWorld(
      scene
    );


  setLoading(65);


  player =
    createPlayer(
      camera,
      renderer.domElement,
      world.colliders,
      world.floorZones,
      world.walkableObjects
    );


  /*
    IMPORTANT

    Camera is inside the
    player camera rig.
  */

  scene.add(
    player.object
  );


  setLoading(100);


  setTimeout(
    () => {

      const loading =
        document.getElementById(
          "loadingScreen"
        );


      if (
        loading
      ) {

        loading.style.display =
          "none";

      }

    },
    450
  );

}

catch (
  error
) {

  console.error(
    error
  );

  showError();

}


/* =====================================================
   POINTER LOCK
===================================================== */

const startScreen =
  document.getElementById(
    "startScreen"
  );


const startButton =
  document.getElementById(
    "startButton"
  );


function lockPointer() {

  if (
    document.pointerLockElement ===
    renderer.domElement
  ) {

    return;

  }


  renderer.domElement
    .requestPointerLock();

}


startButton.addEventListener(
  "click",
  () => {

    lockPointer();

  }
);


/*
  Also allow canvas click
  to resume the game.
*/

renderer.domElement.addEventListener(
  "click",
  () => {

    if (
      document.pointerLockElement !==
      renderer.domElement
    ) {

      lockPointer();

    }

  }
);


document.addEventListener(
  "pointerlockchange",
  () => {

    const locked =

      document.pointerLockElement ===
      renderer.domElement;


    if (
      locked
    ) {

      startScreen.style.display =
        "none";

    }

    else {

      startScreen.style.display =
        "flex";

    }

  }
);


/* =====================================================
   AREA SYSTEM
===================================================== */

let currentArea =
  "";


function detectArea() {

  if (
    !player
  ) {

    return;

  }


  const position =
    player.getPosition();


  const x =
    position.x;


  const z =
    position.z;


  for (
    const area of
    AREAS
  ) {

    if (
      x >= area.minX &&
      x <= area.maxX &&
      z >= area.minZ &&
      z <= area.maxZ
    ) {

      if (
        currentArea !==
        area.name
      ) {

        currentArea =
          area.name;


        const zone =
          document.getElementById(
            "zoneName"
          );


        if (
          zone
        ) {

          zone.textContent =
            area.name;

        }


        showAreaPopup(
          area.name
        );

      }


      return;

    }

  }

}


/* =====================================================
   AREA POPUP
===================================================== */

let popupTimer;


function showAreaPopup(
  name
) {

  const popup =
    document.getElementById(
      "areaPopup"
    );


  const label =
    document.getElementById(
      "areaPopupName"
    );


  if (
    !popup ||
    !label
  ) {

    return;

  }


  label.textContent =
    name;


  popup.classList.add(
    "show"
  );


  clearTimeout(
    popupTimer
  );


  popupTimer =
    setTimeout(
      () => {

        popup.classList.remove(
          "show"
        );

      },
      2200
    );

}


/* =====================================================
   QUALITY
===================================================== */

const qualityButtons =
  document.querySelectorAll(
    "[data-quality]"
  );


qualityButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const quality =
          button.dataset.quality;


        qualityButtons.forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        applyQuality(
          quality
        );

      }
    );

  }
);


function applyQuality(
  quality
) {

  const settings =
    CONFIG.quality[
      quality
    ];


  renderer.setPixelRatio(

    Math.min(
      window.devicePixelRatio,
      settings.pixelRatio
    )

  );


  renderer.shadowMap.enabled =
    settings.shadows;


  scene.fog.density =
    settings.fogDensity;


  post.setQuality(
    quality
  );


  post.resize();

}


/* =====================================================
   FPS
===================================================== */

let fpsFrames = 0;

let fpsTime =
  performance.now();


function updateFPS() {

  fpsFrames++;


  const now =
    performance.now();


  const elapsed =
    now -
    fpsTime;


  if (
    elapsed >= 500
  ) {

    const fps =
      Math.round(
        fpsFrames *
        1000 /
        elapsed
      );


    const element =
      document.getElementById(
        "fps"
      );


    if (
      element
    ) {

      element.textContent =
        `FPS ${fps}`;

    }


    fpsFrames =
      0;


    fpsTime =
      now;

  }

}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =

      window.innerWidth /
      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    post.resize();

  }
);


/* =====================================================
   LOADING
===================================================== */

function setLoading(
  value
) {

  const element =
    document.getElementById(
      "loadingPercent"
    );


  if (
    element
  ) {

    element.textContent =
      `${value}%`;

  }

}


/* =====================================================
   ERROR
===================================================== */

function showError() {

  const loading =
    document.getElementById(
      "loadingScreen"
    );


  const error =
    document.getElementById(
      "errorScreen"
    );


  if (
    loading
  ) {

    loading.style.display =
      "none";

  }


  if (
    error
  ) {

    error.style.display =
      "flex";

  }

}


window.addEventListener(
  "error",
  event => {

    console.error(
      event.error ||
      event.message
    );

  }
);


/* =====================================================
   GAME LOOP
===================================================== */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const delta =
    Math.min(
      clock.getDelta(),
      0.05
    );


  const time =
    clock.elapsedTime;


  if (
    player
  ) {

    player.update(
      delta
    );

  }


  if (
    world
  ) {

    updateWorld(
      delta,
      time,
      camera
    );

  }


  detectArea();

  updateFPS();


  post.composer.render();

}


animate();
