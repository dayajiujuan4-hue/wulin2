import {
  createGround
} from "./ground.js";

import {
  createDistricts
} from "./districts.js";

import {
  createBuildings
} from "./buildings.js";

import {
  createStalls
} from "./stalls.js";

import {
  createNeon
} from "./neon.js";

import {
  createProps
} from "./props.js";

import {
  createLighting
} from "../effects/lighting.js";

import {
  createAtmosphere,
  updateAtmosphere
} from "../effects/atmosphere.js";

import {
  createCrowd,
  updateCrowd
} from "../people/crowd.js";

import {
  createVendors,
  updateVendors
} from "../people/vendors.js";


let animatedObjects = [];

let crowdSystem = null;
let vendorSystem = null;


export function createWorld(scene) {

  const colliders = [];

  createLighting(scene);

  createGround(scene);

  createDistricts(scene);

  createBuildings(
    scene,
    colliders
  );

  createStalls(
    scene,
    colliders
  );

  animatedObjects =
    createNeon(scene);

  createProps(scene);

  createAtmosphere(scene);


  /*
    PEOPLE
  */

  crowdSystem =
    createCrowd(scene);

  vendorSystem =
    createVendors(scene);


  return {
    colliders
  };

}


export function updateWorld(
  delta,
  time,
  camera
) {

  updateAtmosphere(
    delta,
    time,
    camera
  );


  /*
    NEON
  */

  for (
    const object of
    animatedObjects
  ) {

    object.material.emissiveIntensity =

      object.userData.base +

      Math.sin(
        time *
        object.userData.speed +
        object.userData.phase
      ) * .25;

  }


  /*
    CROWD
  */

  if (crowdSystem) {

    updateCrowd(
      crowdSystem,
      delta,
      time,
      camera
    );

  }


  /*
    VENDORS
  */

  if (vendorSystem) {

    updateVendors(
      vendorSystem,
      delta,
      time,
      camera
    );

  }

}
