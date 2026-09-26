import * as THREE from "three";


export function createRenderer() {

  const renderer =
    new THREE.WebGLRenderer({

      antialias: true,

      powerPreference:
        "high-performance"

    });


  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );


  renderer.setPixelRatio(

    Math.min(
      window.devicePixelRatio,
      1.25
    )

  );


  /*
    Color management
  */

  renderer.outputColorSpace =
    THREE.SRGBColorSpace;


  /*
    Cinematic tone mapping
  */

  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


  renderer.toneMappingExposure =
    1.28;


  /*
    Shadows
  */

  renderer.shadowMap.enabled =
    true;


  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


  document.body.appendChild(
    renderer.domElement
  );


  return renderer;

}
