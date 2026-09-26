import {
  createRestaurant
} from "./restaurant.js";

import {
  createCreativeShop
} from "./creativeShop.js";

import {
  createApartment
} from "./apartment.js";

import {
  createTeaShop
} from "./teaShop.js";

import {
  createConvenienceStore
} from "./convenienceStore.js";

import {
  createRooftop
} from "./rooftop.js";

import {
  createReflections
} from "../effects/reflections.js";


export function createBuildingSystem(
  scene,
  colliders,
  floorZones
) {

  createRestaurant(
    scene,
    colliders,
    floorZones,
    23,
    -20
  );


  createCreativeShop(
    scene,
    colliders,
    floorZones,
    -14,
    -95
  );


  /*
    裏路地3階建て
  */

  createApartment(
    scene,
    colliders,
    floorZones,
    34,
    -25
  );


  /*
    奶茶店
  */

  createTeaShop(
    scene,
    colliders,
    floorZones,
    -14,
    -72
  );


  /*
    コンビニ風店舗
  */

  createConvenienceStore(
    scene,
    colliders,
    floorZones,
    14,
    -43
  );


  /*
    屋上設備
  */

  createRooftop(
    scene,
    colliders,
    floorZones,
    34,
    -25
  );


  /*
    ネオン反射
  */

  createReflections(
    scene
  );

}
