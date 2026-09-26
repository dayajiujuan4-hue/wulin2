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


let neonObjects = [];

let crowdSystem = null;

let vendorSystem = null;

let cityLightSystem = null;


/* =====================================================
   CREATE WORLD
===================================================== */

export function createWorld(
  scene
) {

  const colliders = [];

  const floorZones = [];

  const walkableObjects = [];


  /*
    Global lighting
  */

  createLighting(
    scene
  );


  /*
    Ground
  */

  const ground =
    createGround(
      scene
    );


  if (ground) {

    if (
      Array.isArray(ground)
    ) {

      walkableObjects.push(
        ...ground
      );

    }

    else if (
      ground.isObject3D
    ) {

      walkableObjects.push(
        ground
      );

    }

  }


  /*
    Roads / districts
  */

  createDistricts(
    scene
  );


  /*
    Existing background buildings
  */

  createBuildings(
    scene,
    colliders
  );


  /*
    Enterable buildings
  */

  createBuildingSystem(
    scene,
    colliders,
    floorZones
  );


  /*
    NEW:
    richer shopfront architecture
  */

  createFacadeSystem(
    scene,
    colliders
  );


  /*
    NEW:
    Hangzhou skyline
  */

  createCityscape(
    scene
  );


  /*
    Market stalls
  */

  createStalls(
    scene,
    colliders
  );


  /*
    Neon
  */

  neonObjects =
    createNeon(
      scene
    ) || [];


  /*
    Existing props
  */

  createProps(
    scene
  );


  /*
    NEW:
    street-level details
  */

  createStreetDetails(
    scene
  );


  /*
    Wet streets
  */

  createWetRoad(
    scene
  );


  /*
    NEW:
    distant windows and city lights
  */

  cityLightSystem =
    createCityLights(
      scene
    );


  /*
    Atmosphere
  */

  createAtmosphere(
    scene
  );


  /*
    NPCs
  */

  crowdSystem =
    createCrowd(
      scene
    );


  vendorSystem =
    createVendors(
      scene
    );


  /*
    Collect future Raycaster floors
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


  /*
    Existing neon animation
  */

  if (
    typeof updateNeon ===
    "function"
  ) {

    updateNeon(
      neonObjects,
      time
    );

  }


  /*
    City window animation
  */

  updateCityLights(
    cityLightSystem,
    time
  );


  /*
    NPCs
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
