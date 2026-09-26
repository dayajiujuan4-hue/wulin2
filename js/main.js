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
    0x07101c
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

    68,

    window.innerWidth /
    window.innerHeight,

    0.1,

    220

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

let world;

let player;


try {

  setLoading(15);


  world =
    createWorld(
      scene
    );


  setLoading(72);


  player =
    createPlayer(

      camera,

      renderer.domElement,

      world.colliders,

      world.floorZones,

      world.walkableObjects

    );


  setLoading(100);


  setTimeout(
    () => {

      const loading =
        document.getElementById(
          "loadingScreen"
        );


      if (loading) {

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

  console.error(error);

  showError();

}


/* =====================================================
   START
===================================================== */

const startScreen =
  document.getElementById(
    "startScreen"
  );


const startButton =
  document.getElementById(
    "startButton"
  );


startButton.addEventListener(
  "click",
  () => {

    renderer.domElement
      .requestPointerLock();


    startScreen.style.display =
      "none";

  }
);


/* =====================================================
   POINTER LOCK
===================================================== */

document.addEventListener(
  "pointerlockchange",
  () => {

    if (
      document.pointerLockElement !==
      renderer.domElement
    ) {

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

  const x =
    camera.position.x;


  const z =
    camera.position.z;


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


        if (zone) {

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

let fpsFrames =
  0;

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
    elapsed >=
    500
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


    if (element) {

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
   ERROR
===================================================== */

window.addEventListener(
  "error",
  event => {

    console.error(
      event.error ||
      event.message
    );

  }
);


function showError() {

  const loading =
    document.getElementById(
      "loadingScreen"
    );


  const error =
    document.getElementById(
      "errorScreen"
    );


  if (loading) {

    loading.style.display =
      "none";

  }


  if (error) {

    error.style.display =
      "flex";

  }

}


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


  if (element) {

    element.textContent =
      `${value}%`;

  }

}


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


  if (player) {

    player.update(
      delta
    );

  }


  if (world) {

    updateWorld(
      delta,
      time,
      camera
    );

  }


  detectArea();

  updateFPS();


  /*
    IMPORTANT

    Do not call renderer.render()
    anymore.

    EffectComposer now renders
    the scene.
  */

  post.composer.render();

}


animate();
