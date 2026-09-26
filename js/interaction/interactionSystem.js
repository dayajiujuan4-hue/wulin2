export function createInteractionSystem(
  player,
  npcs,
  dialogueSystem
) {

  let interactionPressed =
    false;


  let prompt =
    document.getElementById(
      "interaction"
    );


  /*
    index.htmlに無くても
    自動生成する。
  */

  if (!prompt) {

    prompt =
      document.createElement(
        "div"
      );


    prompt.id =
      "interaction";


    Object.assign(
      prompt.style,
      {

        position:
          "fixed",

        left:
          "50%",

        bottom:
          "110px",

        transform:
          "translateX(-50%)",

        padding:
          "10px 16px",

        borderRadius:
          "7px",

        background:
          "rgba(5,8,12,.86)",

        border:
          "1px solid rgba(255,255,255,.18)",

        color:
          "#fff",

        fontSize:
          "14px",

        zIndex:
          "5000",

        display:
          "none",

        pointerEvents:
          "none"

      }
    );


    document.body.appendChild(
      prompt
    );

  }


  window.addEventListener(
    "keydown",
    event => {

      if (
        event.code ===
        "KeyE" &&
        !event.repeat
      ) {

        interactionPressed =
          true;

      }

    }
  );


  function update(
    delta,
    time
  ) {

    if (
      dialogueSystem.isOpen()
    ) {

      prompt.style.display =
        "none";


      interactionPressed =
        false;


      return;

    }


    const playerPosition =
      player.getPosition();


    let nearest =
      null;


    let nearestDistance =
      Infinity;


    for (
      const npc of npcs
    ) {

      const dx =
        npc.root.position.x -
        playerPosition.x;


      const dz =
        npc.root.position.z -
        playerPosition.z;


      const distance =
        Math.hypot(
          dx,
          dz
        );


      npc.marker.position.y =

        2.3 +

        Math.sin(
          time * 3 +
          npc.root.position.x
        ) *

        0.08;


      npc.marker.rotation.y +=
        delta * 1.5;


      if (
        distance <
        nearestDistance
      ) {

        nearestDistance =
          distance;


        nearest =
          npc;

      }

    }


    if (
      nearest &&
      nearestDistance <= 2.5
    ) {

      prompt.style.display =
        "block";


      prompt.innerHTML =
        `<strong>E</strong>　${nearest.name}と話す`;


      const dx =
        playerPosition.x -
        nearest.root.position.x;


      const dz =
        playerPosition.z -
        nearest.root.position.z;


      nearest.root.rotation.y =
        Math.atan2(
          dx,
          dz
        );


      if (
        interactionPressed
      ) {

        dialogueSystem.start(
          nearest
        );

      }

    }

    else {

      prompt.style.display =
        "none";

    }


    interactionPressed =
      false;

  }


  return {
    update
  };

}
