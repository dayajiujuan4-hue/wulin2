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
  createAtmosphere
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


/* =====================================================
   SYSTEM REFERENCES
===================================================== */

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


  /* ===================================================
     GLOBAL LIGHTING
  =================================================== */

  createLighting(
    scene
  );


  /* ===================================================
     GROUND
  =================================================== */

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


  /* ===================================================
     DISTRICTS / ROADS
  =================================================== */

  createDistricts(
    scene
  );


  /* ===================================================
     BACKGROUND BUILDINGS
  =================================================== */

  createBuildings(
    scene,
    colliders
  );


  /* ===================================================
     ENTERABLE BUILDINGS
  =================================================== */

  createBuildingSystem(
    scene,
    colliders,
    floorZones
  );


  /* ===================================================
     DETAILED FACADES
  =================================================== */

  createFacadeSystem(
    scene,
    colliders
  );


  /* ===================================================
     HANGZHOU SKYLINE
  =================================================== */

  createCityscape(
    scene
  );


  /* ===================================================
     MARKET STALLS
  =================================================== */

  createStalls(
    scene,
    colliders
  );


  /* ===================================================
     NEON
  =================================================== */

  neonObjects =
    createNeon(
      scene
    ) || [];


  /* ===================================================
     PROPS
  =================================================== */

  createProps(
    scene
  );


  /* ===================================================
     STREET DETAILS
  =================================================== */

  createStreetDetails(
    scene
  );


  /* ===================================================
     WET ROAD
  =================================================== */

  createWetRoad(
    scene
  );


  /* ===================================================
     CITY LIGHTS
  =================================================== */

  cityLightSystem =
    createCityLights(
      scene
    );


  /* ===================================================
     ATMOSPHERE
  =================================================== */

  createAtmosphere(
    scene
  );


  /* ===================================================
     CROWD
  =================================================== */

  crowdSystem =
    createCrowd(
      scene
    );


  /* ===================================================
     VENDORS
  =================================================== */

  vendorSystem =
    createVendors(
      scene
    );


  /* ===================================================
     INTERACTIVE NPCs
  =================================================== */

  interactiveNPCs =
    createInteractiveNPCs(
      scene
    );


  /* ===================================================
     WALKABLE OBJECTS
  =================================================== */

  scene.traverse(
    object => {

      if (
        object.isMesh &&
        object.userData.walkable
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


  /* ===================================================
     RETURN WORLD
  =================================================== */

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

  /* ===================================================
     SIMPLE NEON ANIMATION

     neon.js に updateNeon が無くても
     ここで安全にアニメーションさせる
  =================================================== */

  if (
    Array.isArray(
      neonObjects
    )
  ) {

    for (
      const object of
      neonObjects
    ) {

      if (
        !object ||
        !object.material
      ) {

        continue;

      }


      /*
        EmissiveMaterialを持つものだけ
        アニメーションする
      */

      if (
        "emissiveIntensity"
        in object.material
      ) {

        const base =
          object.userData.base ??
          2.2;


        const speed =
          object.userData.speed ??
          1;


        const phase =
          object.userData.phase ??
          0;


        object.material.emissiveIntensity =

          base +

          Math.sin(
            time * speed +
            phase
          ) *

          0.3;

      }

    }

  }


  /* ===================================================
     CITY LIGHTS
  =================================================== */

  if (
    cityLightSystem
  ) {

    updateCityLights(
      cityLightSystem,
      time
    );

  }


  /* ===================================================
     CROWD
  =================================================== */

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


  /* ===================================================
     VENDORS
  =================================================== */

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
