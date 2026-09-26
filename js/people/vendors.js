import {
  createNPC,
  animateNPC,
  updateNPCDetail
} from "./npc.js";


const VENDOR_LOCATIONS = [

  /*
    Main street
  */

  [-7.1, 8,  Math.PI / 2],
  [ 7.1, 2, -Math.PI / 2],

  [-7.1,-7,  Math.PI / 2],
  [ 7.1,-13,-Math.PI / 2],

  [-7.1,-21, Math.PI / 2],
  [ 7.1,-28,-Math.PI / 2],

  [-7.1,-36, Math.PI / 2],
  [ 7.1,-42,-Math.PI / 2],


  /*
    Food alley
  */

  [-20,-59,0],
  [-26,-59,0],
  [-32,-59,0],


  /*
    Creative street
  */

  [-6.8,-88, Math.PI / 2],
  [ 6.8,-95,-Math.PI / 2],

  [-6.8,-104,Math.PI / 2],
  [ 6.8,-111,-Math.PI / 2]

];


export function createVendors(
  scene
) {

  const vendors = [];


  VENDOR_LOCATIONS.forEach(
    (
      [
        x,
        z,
        rotation
      ],
      index
    ) => {

      const npc =
        createNPC();


      npc.position.set(
        x,
        0,
        z
      );


      npc.rotation.y =
        rotation;


      npc.userData.vendor = {

        type:

          index % 3 === 0

          ? "cooking"

          : "idle",

        phase:
          Math.random() *
          10

      };


      /*
        Cooking pose
      */

      if (
        npc.userData.vendor.type ===
        "cooking"
      ) {

        npc.userData.leftArm.rotation.x =
          -.65;

        npc.userData.rightArm.rotation.x =
          -.9;

      }


      scene.add(
        npc
      );


      vendors.push(
        npc
      );

    }
  );


  return {
    vendors
  };

}


export function updateVendors(
  system,
  delta,
  time,
  camera
) {

  for (
    const npc of
    system.vendors
  ) {

    const vendor =
      npc.userData.vendor;


    updateNPCDetail(
      npc,
      camera
    );


    if (
      !npc.visible
    ) continue;


    if (
      vendor.type ===
      "cooking"
    ) {

      /*
        Repeated cooking motion.
      */

      npc.userData.rightArm.rotation.x =

        -.8 +

        Math.sin(
          time * 3 +
          vendor.phase
        ) * .25;


      npc.userData.leftArm.rotation.x =

        -.55 +

        Math.sin(
          time * 2.4 +
          vendor.phase
        ) * .12;


      npc.userData.head.rotation.y =

        Math.sin(
          time * .5 +
          vendor.phase
        ) * .12;

    }

    else {

      animateNPC(
        npc,
        time,
        false
      );


      npc.userData.head.rotation.y =

        Math.sin(
          time * .35 +
          vendor.phase
        ) * .18;

    }

  }

}
