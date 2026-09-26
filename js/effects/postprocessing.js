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
    BASE
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
    BLOOM

    thresholdを高めにして、
    暗い物体まで光らないようにする。
  */

  const bloomPass =
    new UnrealBloomPass(

      new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      ),

      0.72,
      0.52,
      0.64

    );


  bloomPass.threshold =
    0.62;


  bloomPass.strength =
    0.72;


  bloomPass.radius =
    0.52;


  composer.addPass(
    bloomPass
  );


  /*
    OUTPUT
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

  }


  function setQuality(
    quality
  ) {

    if (
      quality === "low"
    ) {

      bloomPass.strength =
        0.35;

      bloomPass.radius =
        0.32;

      bloomPass.threshold =
        0.7;

    }


    else if (
      quality === "high"
    ) {

      bloomPass.strength =
        0.9;

      bloomPass.radius =
        0.62;

      bloomPass.threshold =
        0.55;

    }


    else {

      bloomPass.strength =
        0.72;

      bloomPass.radius =
        0.52;

      bloomPass.threshold =
        0.62;

    }

  }


  return {

    composer,

    bloomPass,

    resize,

    setQuality

  };

}
