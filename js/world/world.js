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
  createNeon,
  updateNeon
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

import {
  createCityscape
} from "./cityscape.js";

import {
  createStreetDetails
} from "./streetDetails.js";

import {
  createFacadeSystem
} from "../buildings/facadeSystem.js";

import {
  createCityLights,
  updateCityLights
} from "../effects/cityLights.js";

import {
  createInteractiveNPCs
} from "../people/interactiveNPCs.js";


let neonObjects = [];

let crowdSystem = null;

let vendorSystem = null;

let cityLightSystem = null;

let interactiveNPCs = [];


/* =====================================================
   CREATE WORLD
===================================================== */

export function createWorld(
  scene
) {

  const colliders = [];

  const floorZones = [];

  const walkableObjects = [];


  /* LIGHT */

  createLighting(
    scene
  );


  /* GROUND */

  const ground =
    createGround(
      scene
    );


  if (ground) {

    if (
      Array.isArray(ground)
    ) {

      for (
        const object of ground
      ) {

        if (
          object &&
          !walkableObjects.includes(
            object
          )
        ) {

          walkableObjects.push(
            object
          );

        }

      }

    }

    else if (
      ground.isObject3D
    ) {

      walkableObjects.push(
        ground
      );

    }

  }


  /* ROADS */

  createDistricts(
    scene
  );


  /* BUILDINGS */

  createBuildings(
    scene,
    colliders
  );


  /* ENTERABLE BUILDINGS */

  createBuildingSystem(
    scene,
    colliders,
    floorZones
  );


  /* DETAILED FACADES */

  createFacadeSystem(
    scene,
    colliders
  );


  /* DISTANT CITY */

  createCityscape(
    scene
  );


  /* MARKET */

  createStalls(
    scene,
    colliders
  );


  /* NEON */

  neonObjects =
    createNeon(
      scene
    ) || [];


  /* STREET OBJECTS */

  createProps(
    scene
  );


  createStreetDetails(
    scene
  );


  /* ROAD REFLECTION */

  createWetRoad(
    scene
  );


  /* DISTANT LIGHTS */

  cityLightSystem =
    createCityLights(
      scene
    );


  /* PARTICLES */

  createAtmosphere(
    scene
  );


  /* PEOPLE */

  crowdSystem =
    createCrowd(
      scene
    );


  vendorSystem =
    createVendors(
      scene
    );


  interactiveNPCs =
    createInteractiveNPCs(
      scene
    );


  /* WALKABLE FLOORS */

  scene.traverse(
    object => {

      if (
        object.isMesh &&
        object.userData.walkable ===
        true
      ) {

        if (
          !walkableObjects.includes(
            object
          )
        ) {

          walkableObjects.push(
            object
          );

        }

      }

    }
  );


  return {

    colliders,

    floorZones,

    walkableObjects,

    interactiveNPCs

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

  updateNeon(
    neonObjects,
    time
  );


  updateAtmosphere(
    delta,
    time,
    camera
  );


  if (
    cityLightSystem
  ) {

    updateCityLights(
      cityLightSystem,
      time
    );

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
