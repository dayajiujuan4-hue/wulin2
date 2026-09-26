import {
  createRestaurant
} from "./restaurant.js";

import {
  createCreativeShop
} from "./creativeShop.js";

import {
  createApartment
} from "./apartment.js";


/* =====================================================
   EXPLORABLE BUILDING SYSTEM
===================================================== */

export function createBuildingSystem(
  scene,
  colliders,
  floorZones
) {

  /*
    Back alley restaurant
  */

  createRestaurant(
    scene,
    colliders,
    floorZones,
    23,
    -20
  );


  /*
    Creative shop
  */

  createCreativeShop(
    scene,
    colliders,
    floorZones,
    -14,
    -95
  );


  /*
    Apartment with second floor
  */

  createApartment(
    scene,
    colliders,
    floorZones,
    34,
    -25
  );

}
