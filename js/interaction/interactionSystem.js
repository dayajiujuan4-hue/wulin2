import {
  DIALOGUES
} from "./dialogueData.js";


export function createDialogueSystem() {

  let activeNPC =
    null;


  let currentNode =
    null;


  /*
    Overlay
  */

  const overlay =
    document.createElement(
      "div"
    );


  overlay.style.position =
    "fixed";

  overlay.style.left =
    "0";

  overlay.style.right =
    "0";

  overlay.style.bottom =
    "0";

  overlay.style.padding =
    "0 20px 28px";

  overlay.style.display =
    "none";

  overlay.style.zIndex =
    "1000";

  overlay.style.pointerEvents =
    "none";


  document.body.appendChild(
    overlay
  );


  /*
    Dialogue panel
  */

  const panel =
    document.createElement(
      "div"
    );


  panel.style.maxWidth =
    "820px";

  panel.style.margin =
    "0 auto";

  panel.style.padding =
    "22px 24px";

  panel.style.background =
    "rgba(8, 12, 18, 0.93)";

  panel.style.border =
    "1px solid rgba(255,255,255,0.18)";

  panel.style.borderRadius =
    "12px";

  panel.style.boxShadow =
    "0 15px 50px rgba(0,0,0,0.55)";

  panel.style.backdropFilter =
    "blur(10px)";


  overlay.appendChild(
    panel
  );


  const name =
    document.createElement(
      "div"
    );


  name.style.fontSize =
    "20px";

  name.style.fontWeight =
    "700";

  name.style.color =
    "#ffd66b";


  panel.appendChild(
    name
  );


  const role =
    document.createElement(
      "div"
    );


  role.style.fontSize =
    "12px";

  role.style.marginTop =
    "3px";

  role.style.opacity =
    "0.58";


  panel.appendChild(
    role
  );


  const text =
    document.createElement(
      "div"
    );


  text.style.fontSize =
    "17px";

  text.style.lineHeight =
    "1.8";

  text.style.marginTop =
    "14px";

  text.style.color =
    "#f5f5f5";


  panel.appendChild(
    text
  );


  const choices =
    document.createElement(
      "div"
    );


  choices.style.marginTop =
    "18px";

  choices.style.display =
    "flex";

  choices.style.flexDirection =
    "column";

  choices.style.gap =
    "8px";


  panel.appendChild(
    choices
  );


  /* =====================================================
     START
  ===================================================== */

  function start(
    npc
  ) {

    const dialogue =
      DIALOGUES[
        npc.id
      ];


    if (
      !dialogue
    ) {

      return;

    }


    activeNPC =
      npc;


    currentNode =
      "start";


    /*
      Pointer lock must be released
      so choices can be clicked.
  */

    if (
      document.pointerLockElement
    ) {

      document.exitPointerLock();

    }


    overlay.style.display =
      "block";


    overlay.style.pointerEvents =
      "auto";


    render();

  }


  /* =====================================================
     RENDER
  ===================================================== */

  function render() {

    if (
      !activeNPC
    ) {

      return;

    }


    if (
      currentNode ===
      "end"
    ) {

      close();

      return;

    }


    const dialogue =
      DIALOGUES[
        activeNPC.id
      ];


    const node =
      dialogue[
        currentNode
      ];


    if (
      !node
    ) {

      close();

      return;

    }


    name.textContent =
      node.speaker ||
      activeNPC.name;


    role.textContent =
      node.role ||
      activeNPC.role ||
      "";


    text.textContent =
      node.text;


    choices.innerHTML =
      "";


    const nodeChoices =
      node.choices ||
      [];


    nodeChoices.forEach(
      (
        choice,
        index
      ) => {

        const button =
          document.createElement(
            "button"
          );


        button.textContent =
          `${index + 1}. ${choice.text}`;


        button.style.padding =
          "11px 14px";

        button.style.background =
          "rgba(255,255,255,0.07)";

        button.style.border =
          "1px solid rgba(255,255,255,0.12)";

        button.style.borderRadius =
          "7px";

        button.style.color =
          "#ffffff";

        button.style.fontSize =
          "15px";

        button.style.textAlign =
          "left";

        button.style.cursor =
          "pointer";


        button.addEventListener(
          "mouseenter",
          () => {

            button.style.background =
              "rgba(255,214,107,0.18)";

          }
        );


        button.addEventListener(
          "mouseleave",
          () => {

            button.style.background =
              "rgba(255,255,255,0.07)";

          }
        );


        button.addEventListener(
          "click",
          () => {

            currentNode =
              choice.next;


            render();

          }
        );


        choices.appendChild(
          button
        );

      }
    );

  }


  /* =====================================================
     CLOSE
  ===================================================== */

  function close() {

    overlay.style.display =
      "none";


    overlay.style.pointerEvents =
      "none";


    activeNPC =
      null;


    currentNode =
      null;

  }


  function isOpen() {

    return activeNPC !==
      null;

  }


  return {

    start,

    close,

    isOpen

  };

}
