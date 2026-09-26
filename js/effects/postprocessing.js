import * as THREE from "three";

import {
  EffectComposer
} from "three/addons/postprocessing/EffectComposer.js";

import {
  RenderPass
} from "three/addons/postprocessing/RenderPass.js";

import {
  UnrealBloomPass
} from "three/addons/postprocessing/UnrealBloomPass.js";

import {
  OutputPass
} from "three/addons/postprocessing/OutputPass.js";


export function createPostProcessing(
  renderer,
  scene,
  camera
) {

  const composer =
    new EffectComposer(
      renderer
    );


  /*
    Base scene
  */

  const renderPass =
    new RenderPass(
      scene,
      camera
    );


  composer.addPass(
    renderPass
  );


  /*
    Neon bloom
  */

  const bloomPass =
    new UnrealBloomPass(

      new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      ),

      0.62,

      0.55,

      0.72

    );


  composer.addPass(
    bloomPass
  );


  /*
    Final output
  */

  const outputPass =
    new OutputPass();


  composer.addPass(
    outputPass
  );


  function resize() {

    composer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    bloomPass.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }


  function setQuality(
    quality
  ) {

    if (
      quality === "low"
    ) {

      bloomPass.strength =
        0.25;


      bloomPass.radius =
        0.3;

    }


    else if (
      quality === "high"
    ) {

      bloomPass.strength =
        0.82;


      bloomPass.radius =
        0.62;

    }


    else {

      bloomPass.strength =
        0.62;


      bloomPass.radius =
        0.5;

    }

  }


  return {

    composer,

    bloomPass,

    resize,

    setQuality

  };

}
