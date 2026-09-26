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


/* =====================================================
   SCENE
===================================================== */

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x07101c);

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
    innerWidth / innerHeight,
    .1,
    180
  );


/* =====================================================
   RENDERER
===================================================== */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(
  Math.min(
    devicePixelRatio,
    CONFIG.quality.medium.pixelRatio
  )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.12;

document.body.appendChild(
  renderer.domElement
);


/* =====================================================
   ERROR HANDLING
===================================================== */

window.addEventListener(
  "error",
  event => {

    const errorScreen =
      document.querySelector("#errorScreen");

    const errorText =
      document.querySelector("#errorText");

    errorText.textContent =
      event.message || "不明なエラー";

    errorScreen.style.display =
      "flex";

  }
);


/* =====================================================
   LOADING
===================================================== */

const loadingBar =
  document.querySelector("#loadingBar");

function loading(percent) {

  loadingBar.style.width =
    `${percent}%`;

}

loading(15);


/* =====================================================
   WORLD
===================================================== */

const world =
  createWorld(scene);

loading(75);


/* =====================================================
   PLAYER
===================================================== */

const player =
  createPlayer(
    camera,
    renderer.domElement,
    world.colliders
  );

loading(100);


/* =====================================================
   START
===================================================== */

setTimeout(
  () => {

    const screen =
      document.querySelector(
        "#loadingScreen"
      );

    screen.style.opacity = 0;

    setTimeout(
      () => {

        screen.style.display =
          "none";

        document
          .querySelector(
            "#startScreen"
          )
          .style.display =
          "flex";

      },
      800
    );

  },
  500
);


/* =====================================================
   POINTER LOCK
===================================================== */

const startScreen =
  document.querySelector(
    "#startScreen"
  );

document
  .querySelector(
    "#startButton"
  )
  .addEventListener(
    "click",
    () => {

      renderer.domElement
        .requestPointerLock();

    }
  );

renderer.domElement
  .addEventListener(
    "click",
    () => {

      if (
        document.pointerLockElement !==
        renderer.domElement
      ) {

        renderer.domElement
          .requestPointerLock();

      }

    }
  );

document.addEventListener(
  "pointerlockchange",
  () => {

    startScreen.style.display =

      document.pointerLockElement ===
      renderer.domElement

      ? "none"

      : "flex";

  }
);


/* =====================================================
   AREA SYSTEM
===================================================== */

const zoneName =
  document.querySelector(
    "#zoneName"
  );

const areaPopup =
  document.querySelector(
    "#areaPopup"
  );

const areaPopupName =
  document.querySelector(
    "#areaPopupName"
  );

let currentArea = "";

let popupTimer = null;

function detectArea() {

  const x =
    camera.position.x;

  const z =
    camera.position.z;

  let found =
    "武林街区";

  let foundID =
    "city";

  for (
    const area of AREAS
  ) {

    if (
      x >= area.x1 &&
      x <= area.x2 &&
      z >= area.z1 &&
      z <= area.z2
    ) {

      found =
        area.name;

      foundID =
        area.id;

      break;

    }

  }

  zoneName.textContent =
    found;

  if (
    foundID !== currentArea
  ) {

    currentArea =
      foundID;

    showAreaPopup(
      found
    );

  }

}

function showAreaPopup(
  name
) {

  areaPopupName.textContent =
    name;

  areaPopup.classList.add(
    "visible"
  );

  clearTimeout(
    popupTimer
  );

  popupTimer =
    setTimeout(
      () => {

        areaPopup.classList.remove(
          "visible"
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

function setQuality(
  qualityName
) {

  const q =
    CONFIG.quality[
      qualityName
    ];

  renderer.setPixelRatio(

    Math.min(
      devicePixelRatio,
      q.pixelRatio
    )

  );

  renderer.shadowMap.enabled =
    q.shadows;

  scene.fog.density =
    q.fogDensity;

  qualityButtons.forEach(
    button => {

      button.classList.toggle(

        "active",

        button.dataset.quality ===
        qualityName

      );

    }
  );

}

qualityButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        setQuality(
          button.dataset.quality
        );

      }
    );

  }
);


/* =====================================================
   FPS
===================================================== */

const fpsElement =
  document.querySelector(
    "#fps"
  );

let fpsFrames = 0;
let fpsTime = 0;


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera
      .updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);


/* =====================================================
   LOOP
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
      .05
    );

  const time =
    clock.elapsedTime;

  player.update(
    delta
  );

  updateWorld(
    delta,
    time,
    camera
  );

  detectArea();

  fpsFrames++;
  fpsTime += delta;

  if (
    fpsTime >= .5
  ) {

    fpsElement.textContent =
      Math.round(
        fpsFrames /
        fpsTime
      );

    fpsFrames = 0;
    fpsTime = 0;

  }

  renderer.render(
    scene,
    camera
  );

}

animate();
