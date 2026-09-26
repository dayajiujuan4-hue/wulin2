import {
  DIALOGUES
} from "./dialogueData.js";


export function createDialogueSystem() {

  let activeNPC =
    null;

  let currentNode =
    null;


  const overlay =
    document.createElement(
      "div"
    );


  Object.assign(
    overlay.style,
    {

      position:
        "fixed",

      left:
        "0",

      right:
        "0",

      bottom:
        "0",

      padding:
        "0 20px 28px",

      display:
        "none",

      zIndex:
        "10000",

      pointerEvents:
        "none"

    }
  );


  document.body.appendChild(
    overlay
  );


  const panel =
    document.createElement(
      "div"
    );


  Object.assign(
    panel.style,
    {

      maxWidth:
        "820px",

      margin:
        "0 auto",

      padding:
        "22px 24px",

      background:
        "rgba(8,12,18,.95)",

      border:
        "1px solid rgba(255,255,255,.18)",

      borderRadius:
        "12px",

      boxShadow:
        "0 15px 50px rgba(0,0,0,.6)",

      color:
        "#fff"

    }
  );


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

  role.style.opacity =
    ".6";

  role.style.marginTop =
    "3px";


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


  panel.appendChild(
    text
  );


  const choices =
    document.createElement(
      "div"
    );


  choices.style.display =
    "flex";

  choices.style.flexDirection =
    "column";

  choices.style.gap =
    "8px";

  choices.style.marginTop =
    "18px";


  panel.appendChild(
    choices
  );


  function start(
    npc
  ) {

    if (
      !DIALOGUES[npc.id]
    ) {

      return;

    }


    activeNPC =
      npc;


    currentNode =
      "start";


    overlay.style.display =
      "block";


    overlay.style.pointerEvents =
      "auto";


    render();


    /*
      Important:
      render first, then unlock.

      main.js can now see
      isOpen() === true.
    */

    if (
      document.pointerLockElement
    ) {

      document.exitPointerLock();

    }

  }


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


    if (!node) {

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
      node.text ||
      "";


    choices.innerHTML =
      "";


    for (
      const choice of
      node.choices || []
    ) {

      const button =
        document.createElement(
          "button"
        );


      button.textContent =
        choice.text;


      Object.assign(
        button.style,
        {

          padding:
            "12px 14px",

          background:
            "rgba(255,255,255,.07)",

          border:
            "1px solid rgba(255,255,255,.13)",

          borderRadius:
            "7px",

          color:
            "#fff",

          textAlign:
            "left",

          cursor:
            "pointer",

          fontSize:
            "15px"

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

  }


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
