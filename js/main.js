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

import {
  createDialogueSystem
} from "./interaction/dialogueSystem.js";

import {
  createInteractionSystem
} from "./interaction/interactionSystem.js";


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


scene.add(
  camera
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
   SYSTEMS
===================================================== */

let world =
  null;


let player =
  null;


let dialogueSystem =
  null;


let interactionSystem =
  null;


/* =====================================================
   INITIALIZATION
===================================================== */

try {

  setLoading(
    10
  );


  world =
    createWorld(
      scene
    );


  setLoading(
    60
  );


  player =
    createPlayer(

      camera,

      renderer.domElement,

      world.colliders,

      world.floorZones,

      world.walkableObjects

    );


  setLoading(
    78
  );


  dialogueSystem =
    createDialogueSystem();


  interactionSystem =
    createInteractionSystem(

      player,

      world.interactiveNPCs,

      dialogueSystem

    );


  setLoading(
    100
  );


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
    350
  );

}

catch (error) {

  console.error(
    error
  );


  showError(
    error
  );

}


/* =====================================================
   START SCREEN
===================================================== */

const startScreen =
  document.getElementById(
    "startScreen"
  );


const startButton =
  document.getElementById(
    "startButton"
  );


if (startButton) {

  startButton.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      if (player) {

        player.lock();

      }

    }
  );

}


/* =====================================================
   POINTER LOCK
===================================================== */

if (player) {

  player.controls.addEventListener(
    "lock",
    () => {

      if (
        startScreen
      ) {

        startScreen.style.display =
          "none";

      }

    }
  );


  player.controls.addEventListener(
    "unlock",
    () => {

      /*
        NPC dialogue intentionally
        unlocks mouse.
      */

      if (
        dialogueSystem &&
        dialogueSystem.isOpen()
      ) {

        if (
          startScreen
        ) {

          startScreen.style.display =
            "none";

        }


        return;

      }


      if (
        startScreen
      ) {

        startScreen.style.display =
          "flex";

      }

    }
  );

}


/* =====================================================
   RESUME GAME
===================================================== */

renderer.domElement.addEventListener(
  "click",
  () => {

    if (
      dialogueSystem &&
      dialogueSystem.isOpen()
    ) {

      return;

    }


    if (
      player &&
      !player.controls.isLocked
    ) {

      player.lock();

    }

  }
);


/* =====================================================
   ESC
===================================================== */

window.addEventListener(
  "keydown",
  event => {

    if (
      event.code ===
      "Escape" &&
      dialogueSystem &&
      dialogueSystem.isOpen()
    ) {

      dialogueSystem.close();

    }

  }
);


/* =====================================================
   AREA
===================================================== */

let currentArea =
  "";


let popupTimer =
  null;


function detectArea() {

  if (!player) {

    return;

  }


  const position =
    player.getPosition();


  for (
    const area of AREAS
  ) {

    if (

      position.x >= area.minX &&
      position.x <= area.maxX &&

      position.z >= area.minZ &&
      position.z <= area.maxZ

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


        const settings =
          CONFIG.quality[
            quality
          ];


        if (!settings) {

          return;

        }


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


        qualityButtons.forEach(
          element =>
            element.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );

      }
    );

  }
);


/* =====================================================
   FPS
===================================================== */

let fpsFrames =
  0;


let fpsStart =
  performance.now();


function updateFPS() {

  fpsFrames++;


  const now =
    performance.now();


  if (
    now -
    fpsStart <
    500
  ) {

    return;

  }


  const fps =
    Math.round(

      fpsFrames *
      1000 /
      (
        now -
        fpsStart
      )

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


  fpsStart =
    now;

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


  if (element) {

    element.textContent =
      `${value}%`;

  }

}


/* =====================================================
   ERROR
===================================================== */

function showError(
  error
) {

  const loading =
    document.getElementById(
      "loadingScreen"
    );


  if (loading) {

    loading.style.display =
      "none";

  }


  let panel =
    document.getElementById(
      "fatalError"
    );


  if (!panel) {

    panel =
      document.createElement(
        "div"
      );


    panel.id =
      "fatalError";


    Object.assign(
      panel.style,
      {

        position:
          "fixed",

        inset:
          "20px",

        padding:
          "20px",

        zIndex:
          "99999",

        background:
          "#250909",

        color:
          "#fff",

        whiteSpace:
          "pre-wrap",

        fontFamily:
          "monospace"

      }
    );


    document.body.appendChild(
      panel
    );

  }


  panel.textContent =

    "読み込みエラー\n\n" +

    (
      error?.stack ||
      error?.message ||
      String(error)
    );

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


  if (
    player &&
    !(
      dialogueSystem &&
      dialogueSystem.isOpen()
    )
  ) {

    player.update(
      delta
    );

  }


  if (
    interactionSystem
  ) {

    interactionSystem.update(
      delta,
      time
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
