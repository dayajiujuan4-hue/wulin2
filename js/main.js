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
   GLOBAL ERROR DISPLAY
===================================================== */

function showFatalError(error) {

  console.error(
    "WULIN NIGHT MARKET ERROR:",
    error
  );


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
      "fatalErrorPanel"
    );


  if (!panel) {

    panel =
      document.createElement(
        "div"
      );


    panel.id =
      "fatalErrorPanel";


    panel.style.position =
      "fixed";

    panel.style.left =
      "20px";

    panel.style.right =
      "20px";

    panel.style.top =
      "20px";

    panel.style.zIndex =
      "999999";

    panel.style.padding =
      "20px";

    panel.style.background =
      "rgba(30, 0, 0, 0.96)";

    panel.style.border =
      "1px solid #ff5555";

    panel.style.borderRadius =
      "10px";

    panel.style.color =
      "#ffffff";

    panel.style.fontFamily =
      "monospace";

    panel.style.whiteSpace =
      "pre-wrap";

    panel.style.overflowWrap =
      "anywhere";


    document.body.appendChild(
      panel
    );

  }


  const message =

    error?.stack ||
    error?.message ||
    String(error);


  panel.textContent =

    "武林夜市の読み込み中にエラーが発生しました。\n\n" +
    message;

}


/* =====================================================
   GLOBAL BROWSER ERRORS
===================================================== */

window.addEventListener(
  "error",
  event => {

    showFatalError(

      event.error ||
      event.message ||
      "Unknown JavaScript error"

    );

  }
);


window.addEventListener(
  "unhandledrejection",
  event => {

    showFatalError(
      event.reason ||
      "Unhandled Promise rejection"
    );

  }
);


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

let renderer = null;

let post = null;

let world = null;

let player = null;

let dialogueSystem = null;

let interactionSystem = null;


/* =====================================================
   INITIALIZE
===================================================== */

try {

  setLoading(
    5,
    "レンダラーを準備しています..."
  );


  renderer =
    createRenderer();


  setLoading(
    15,
    "光と映像処理を準備しています..."
  );


  post =
    createPostProcessing(
      renderer,
      scene,
      camera
    );


  setLoading(
    25,
    "武林夜市を作っています..."
  );


  world =
    createWorld(
      scene
    );


  setLoading(
    70,
    "プレイヤーを準備しています..."
  );


  player =
    createPlayer(

      camera,

      renderer.domElement,

      world.colliders || [],

      world.floorZones || [],

      world.walkableObjects || []

    );


  setLoading(
    82,
    "会話システムを準備しています..."
  );


  dialogueSystem =
    createDialogueSystem();


  setLoading(
    90,
    "NPCを準備しています..."
  );


  interactionSystem =
    createInteractionSystem(

      player,

      world.interactiveNPCs || [],

      dialogueSystem

    );


  setLoading(
    100,
    "完成"
  );


  setTimeout(
    finishLoading,
    350
  );

}

catch (error) {

  showFatalError(
    error
  );

}


/* =====================================================
   FINISH LOADING
===================================================== */

function finishLoading() {

  const loading =
    document.getElementById(
      "loadingScreen"
    );


  if (loading) {

    loading.style.display =
      "none";

  }

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
   POINTER LOCK EVENTS
===================================================== */

if (player) {

  player.controls.addEventListener(
    "lock",
    () => {

      if (

        dialogueSystem &&
        dialogueSystem.isOpen()

      ) {

        return;

      }


      if (startScreen) {

        startScreen.style.display =
          "none";

      }

    }
  );


  player.controls.addEventListener(
    "unlock",
    () => {

      if (

        dialogueSystem &&
        dialogueSystem.isOpen()

      ) {

        if (startScreen) {

          startScreen.style.display =
            "none";

        }


        return;

      }


      if (startScreen) {

        startScreen.style.display =
          "flex";

      }

    }
  );

}


/* =====================================================
   CANVAS CLICK
===================================================== */

if (renderer) {

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

}


/* =====================================================
   ESC DIALOGUE
===================================================== */

window.addEventListener(
  "keydown",
  event => {

    if (
      event.code !==
      "Escape"
    ) {

      return;

    }


    if (

      dialogueSystem &&
      dialogueSystem.isOpen()

    ) {

      dialogueSystem.close();

    }

  }
);


/* =====================================================
   AREA SYSTEM
===================================================== */

let currentArea =
  "";


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


/* =====================================================
   AREA POPUP
===================================================== */

let popupTimer = null;


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

  if (
    !renderer ||
    !post
  ) {

    return;

  }


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
    elapsed < 500
  ) {

    return;

  }


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


    if (renderer) {

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

    }


    if (post) {

      post.resize();

    }

  }
);


/* =====================================================
   LOADING
===================================================== */

function setLoading(
  value,
  message = ""
) {

  const percent =
    document.getElementById(
      "loadingPercent"
    );


  if (percent) {

    percent.textContent =
      `${value}%`;

  }


  /*
    Existing loading title/text.

    Works even if one of these
    elements does not exist.
  */

  const textCandidates = [

    document.getElementById(
      "loadingText"
    ),

    document.querySelector(
      "#loadingScreen .loading-text"
    ),

    document.querySelector(
      "#loadingScreen p"
    )

  ];


  for (
    const element of textCandidates
  ) {

    if (element) {

      element.textContent =
        message;


      break;

    }

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


  if (
    !renderer ||
    !post
  ) {

    return;

  }


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


  if (interactionSystem) {

    interactionSystem.update(
      delta,
      time
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


  post.composer.render();

}


animate();
