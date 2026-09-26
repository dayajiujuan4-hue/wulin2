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

import {
  createBuildingSystem
} from "../buildings/buildingSystem.js";


let animatedObjects = [];

let crowdSystem = null;
let vendorSystem = null;


/* =====================================================
   CREATE WORLD
===================================================== */

export function createWorld(scene) {

  const colliders = [];

  const floorZones = [];


  createLighting(scene);

  createGround(scene);

  createDistricts(scene);


  /*
    Existing background buildings
  */

  createBuildings(
    scene,
    colliders
  );


  /*
    New explorable buildings
  */

  createBuildingSystem(
    scene,
    colliders,
    floorZones
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

    colliders,

    floorZones

  };

}


/* =====================================================
   UPDATE WORLD
===================================================== */

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
    Neon
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

      ) *

      0.25;

  }


  /*
    Crowd
  */

  if (
    crowdSystem
  ) {

    updateCrowd(
      crowdSystem,
      delta,
      time,
      camera
    );

  }


  /*
    Vendors
  */

  if (
    vendorSystem
  ) {

    updateVendors(
      vendorSystem,
      delta,
      time,
      camera
    );

  }

}
