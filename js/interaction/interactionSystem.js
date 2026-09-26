export function createInteractionSystem(
  player,
  npcs = [],
  dialogueSystem
) {

  let nearestNPC =
    null;


  let interactionPressed =
    false;


  let prompt =
    document.getElementById(
      "interaction"
    );


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
        position: "fixed",
        left: "50%",
        bottom: "95px",

        transform:
          "translateX(-50%) translateY(8px)",

        padding:
          "9px 15px",

        background:
          "rgba(8, 11, 16, 0.78)",

        backdropFilter:
          "blur(8px)",

        border:
          "1px solid rgba(255,255,255,.16)",

        borderRadius:
          "7px",

        color:
          "#fff",

        fontFamily:
          "sans-serif",

        fontSize:
          "14px",

        zIndex:
          "9998",

        display:
          "none",

        opacity:
          "0",

        transition:
          "opacity .18s, transform .18s",

        pointerEvents:
          "none",

        boxShadow:
          "0 8px 30px rgba(0,0,0,.35)"
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
        event.code !== "KeyE" ||
        event.repeat
      ) {

        return;

      }


      if (
        dialogueSystem &&
        dialogueSystem.isOpen()
      ) {

        return;

      }


      interactionPressed =
        true;

    }
  );


  function update(
    delta,
    time
  ) {

    if (
      dialogueSystem &&
      dialogueSystem.isOpen()
    ) {

      hidePrompt();

      interactionPressed =
        false;

      return;

    }


    if (
      !player ||
      !Array.isArray(npcs)
    ) {

      return;

    }


    const playerPosition =
      player.getPosition();


    nearestNPC =
      null;


    let nearestDistance =
      Infinity;


    for (
      const npc of npcs
    ) {

      if (
        !npc ||
        !npc.root
      ) {

        continue;

      }


      animateNPC(
        npc,
        delta,
        time
      );


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


      if (
        distance <
        nearestDistance
      ) {

        nearestDistance =
          distance;


        nearestNPC =
          npc;

      }

    }


    if (
      nearestNPC &&
      nearestDistance <= 3.0
    ) {

      showPrompt(
        nearestNPC
      );


      if (
        nearestDistance <= 2.2
      ) {

        gentlyFacePlayer(
          nearestNPC,
          playerPosition,
          delta
        );

      }


      if (
        interactionPressed
      ) {

        dialogueSystem.start(
          nearestNPC
        );

      }

    }

    else {

      hidePrompt();

    }


    interactionPressed =
      false;

  }


  function animateNPC(
    npc,
    delta,
    time
  ) {

    const t =
      time +
      npc.phase;


    /*
      Small breathing motion.
    */

    if (npc.torso) {

      npc.torso.position.y =

        1.12 +

        Math.sin(
          t * 1.8
        ) *
        0.006;

    }


    if (npc.head) {

      npc.head.rotation.y =

        Math.sin(
          t * 0.55
        ) *
        0.08;

    }


    switch (
      npc.animation
    ) {

      case "phone":

        npc.leftArm.group.rotation.x =
          -0.65;

        npc.leftArm.group.rotation.z =
          -0.25;

        npc.rightArm.group.rotation.x =
          -0.8;

        npc.rightArm.group.rotation.z =
          0.32;

        npc.head.rotation.x =
          0.15;

        break;


      case "photo":

        npc.leftArm.group.rotation.x =
          -1.05;

        npc.rightArm.group.rotation.x =
          -1.05;

        npc.leftArm.group.rotation.z =
          -0.15;

        npc.rightArm.group.rotation.z =
          0.15;

        npc.head.rotation.x =
          -0.03;

        break;


      case "handsBack":

        npc.leftArm.group.rotation.x =
          0.32;

        npc.rightArm.group.rotation.x =
          0.32;

        npc.leftArm.group.rotation.z =
          0.23;

        npc.rightArm.group.rotation.z =
          -0.23;

        break;


      case "bag":

        npc.leftArm.group.rotation.x =
          Math.sin(
            t * 0.7
          ) * 0.04;

        npc.rightArm.group.rotation.x =
          -0.08;

        break;


      default:

        npc.leftArm.group.rotation.x =

          Math.sin(
            t * 0.8
          ) *
          0.025;


        npc.rightArm.group.rotation.x =

          Math.sin(
            t * 0.8 +
            Math.PI
          ) *
          0.025;

        break;

    }

  }


  function gentlyFacePlayer(
    npc,
    playerPosition,
    delta
  ) {

    const dx =

      playerPosition.x -
      npc.root.position.x;


    const dz =

      playerPosition.z -
      npc.root.position.z;


    const target =
      Math.atan2(
        dx,
        dz
      );


    npc.root.rotation.y =
      lerpAngle(
        npc.root.rotation.y,
        target,
        Math.min(
          1,
          delta * 3
        )
      );

  }


  function lerpAngle(
    from,
    to,
    amount
  ) {

    let difference =
      to -
      from;


    while (
      difference >
      Math.PI
    ) {

      difference -=
        Math.PI * 2;

    }


    while (
      difference <
      -Math.PI
    ) {

      difference +=
        Math.PI * 2;

    }


    return from +
      difference *
      amount;

  }


  function showPrompt(
    npc
  ) {

    prompt.innerHTML =
      `
      <span style="
        display:inline-flex;
        width:25px;
        height:25px;
        align-items:center;
        justify-content:center;
        margin-right:9px;
        border:1px solid rgba(255,255,255,.55);
        border-radius:5px;
        background:rgba(255,255,255,.12);
        font-size:12px;
        font-weight:700;
      ">E</span>
      <span>${npc.name}と話す</span>
      `;


    prompt.style.display =
      "flex";


    requestAnimationFrame(
      () => {

        prompt.style.opacity =
          "1";


        prompt.style.transform =
          "translateX(-50%) translateY(0)";

      }
    );

  }


  function hidePrompt() {

    prompt.style.opacity =
      "0";


    prompt.style.transform =
      "translateX(-50%) translateY(8px)";


    setTimeout(
      () => {

        if (
          prompt.style.opacity ===
          "0"
        ) {

          prompt.style.display =
            "none";

        }

      },
      180
    );

  }


  return {
    update
  };
}
