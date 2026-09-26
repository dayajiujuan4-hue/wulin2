import * as THREE from "three";


export function createInteractiveNPCs(scene) {

  const npcs = [];


  createNPC(
    scene,
    npcs,
    {
      id: "student",
      name: "小陈",
      role: "杭州の大学生",
      x: 5,
      z: -60,
      shirt: 0x547da8
    }
  );


  createNPC(
    scene,
    npcs,
    {
      id: "vendor",
      name: "王师傅",
      role: "夜市の屋台店主",
      x: -25,
      z: -66,
      shirt: 0x8d4035
    }
  );


  createNPC(
    scene,
    npcs,
    {
      id: "local",
      name: "林阿姨",
      role: "杭州の地元住民",
      x: 24,
      z: -65,
      shirt: 0x755783
    }
  );


  return npcs;

}


function createNPC(
  scene,
  npcs,
  data
) {

  const root =
    new THREE.Group();


  root.position.set(
    data.x,
    0,
    data.z
  );


  root.userData.interactiveNPC =
    true;


  root.userData.npcId =
    data.id;


  root.userData.name =
    data.name;


  root.userData.role =
    data.role;


  scene.add(root);


  /*
    Legs
  */

  const pants =
    new THREE.MeshStandardMaterial({
      color: 0x252a30,
      roughness: 0.85
    });


  for (const x of [-0.14, 0.14]) {

    const leg =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          0.09,
          0.58,
          4,
          8
        ),

        pants

      );


    leg.position.set(
      x,
      0.48,
      0
    );


    root.add(leg);

  }


  /*
    Body
  */

  const body =
    new THREE.Mesh(

      new THREE.CapsuleGeometry(
        0.28,
        0.55,
        5,
        10
      ),

      new THREE.MeshStandardMaterial({
        color: data.shirt,
        roughness: 0.75
      })

    );


  body.position.y =
    1.15;


  root.add(body);


  /*
    Head
  */

  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.23,
        16,
        12
      ),

      new THREE.MeshStandardMaterial({
        color: 0xd7a47d,
        roughness: 0.8
      })

    );


  head.position.y =
    1.78;


  root.add(head);


  /*
    Hair
  */

  const hair =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.235,
        16,
        8,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),

      new THREE.MeshStandardMaterial({
        color: 0x171515
      })

    );


  hair.position.y =
    1.83;


  root.add(hair);


  /*
    Floating interaction marker
  */

  const marker =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.065,
        10,
        8
      ),

      new THREE.MeshBasicMaterial({
        color: 0xffd35a,
        toneMapped: false
      })

    );


  marker.position.y =
    2.28;


  marker.userData.marker =
    true;


  root.add(marker);


  npcs.push({
    root,
    marker,
    id: data.id,
    name: data.name,
    role: data.role
  });

}
