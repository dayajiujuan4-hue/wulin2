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

import {
  createWetRoad
} from "../effects/wetRoad.js";


let animatedObjects = [];

let crowdSystem = null;

let vendorSystem = null;


/*
  Objects that can physically
  support the player.
*/

const walkableObjects = [];


/* =====================================================
   CREATE WORLD
===================================================== */

export function createWorld(
  scene
) {

  const colliders = [];

  const floorZones = [];


  createLighting(
    scene
  );


  const ground =
    createGround(
      scene
    );


  /*
    If ground.js returns a mesh,
    automatically register it.

    Old ground.js versions that
    return nothing still work.
  */

  if (ground) {

    if (
      Array.isArray(ground)
    ) {

      walkableObjects.push(
        ...ground
      );

    }

    else {

      walkableObjects.push(
        ground
      );

    }

  }


  createDistricts(
    scene
  );


  createBuildings(
    scene,
    colliders
  );


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
    createNeon(
      scene
    );


  createProps(
    scene
  );


  createWetRoad(
    scene
  );


  createAtmosphere(
    scene
  );


  crowdSystem =
    createCrowd(
      scene
    );


  vendorSystem =
    createVendors(
      scene
    );


  /*
    Find explicitly marked
    walkable meshes.

    This lets future buildings
    opt into Raycaster movement
    simply with:

    mesh.userData.walkable = true;
  */

  scene.traverse(
    object => {

      if (
        object.isMesh &&
        object.userData.walkable
      ) {

        walkableObjects.push(
          object
        );

      }

    }
  );


  return {

    colliders,

    floorZones,

    walkableObjects

  };

}


/* =====================================================
   UPDATE
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
