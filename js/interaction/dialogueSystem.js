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
      position: "fixed",
      inset: "0",

      display: "none",

      alignItems: "flex-end",
      justifyContent: "center",

      padding:
        "0 24px 42px",

      zIndex: "20000",

      pointerEvents: "none",

      background:
        "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,.25))"
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
      position: "relative",

      width: "min(880px, 92vw)",

      padding:
        "24px 28px 22px",

      background:
        "linear-gradient(135deg, rgba(11,15,22,.94), rgba(7,10,15,.96))",

      backdropFilter:
        "blur(12px)",

      border:
        "1px solid rgba(255,255,255,.14)",

      borderRadius:
        "8px",

      boxShadow:
        "0 22px 70px rgba(0,0,0,.65)",

      color: "#fff",

      fontFamily:
        "system-ui, sans-serif",

      overflow: "hidden"
    }
  );


  overlay.appendChild(
    panel
  );


  const accent =
    document.createElement(
      "div"
    );


  Object.assign(
    accent.style,
    {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "3px",

      background:
        "linear-gradient(#ffd56a,#d49a36)"
    }
  );


  panel.appendChild(
    accent
  );


  const nameElement =
    document.createElement(
      "div"
    );


  Object.assign(
    nameElement.style,
    {
      fontSize: "20px",
      fontWeight: "750",
      letterSpacing: ".02em",
      color: "#f2cf78"
    }
  );


  panel.appendChild(
    nameElement
  );


  const roleElement =
    document.createElement(
      "div"
    );


  Object.assign(
    roleElement.style,
    {
      fontSize: "12px",
      color: "rgba(255,255,255,.48)",
      marginTop: "3px"
    }
  );


  panel.appendChild(
    roleElement
  );


  const textElement =
    document.createElement(
      "div"
    );


  Object.assign(
    textElement.style,
    {
      marginTop: "16px",

      fontSize:
        "clamp(15px, 1.5vw, 17px)",

      lineHeight: "1.9",

      letterSpacing: ".015em",

      color:
        "rgba(255,255,255,.94)"
    }
  );


  panel.appendChild(
    textElement
  );


  const choicesElement =
    document.createElement(
      "div"
    );


  Object.assign(
    choicesElement.style,
    {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      marginTop: "18px"
    }
  );


  panel.appendChild(
    choicesElement
  );


  function start(npc) {

    if (
      !npc ||
      !DIALOGUES[npc.id]
    ) {

      console.warn(
        "Dialogue not found:",
        npc?.id
      );

      return;

    }


    activeNPC =
      npc;


    currentNode =
      "start";


    overlay.style.display =
      "flex";


    overlay.style.pointerEvents =
      "auto";


    render();


    requestAnimationFrame(
      () => {

        if (
          document.pointerLockElement
        ) {

          document.exitPointerLock();

        }

      }
    );

  }


  function render() {

    if (
      !activeNPC ||
      currentNode === "end"
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

      console.warn(
        "Missing dialogue node:",
        activeNPC.id,
        currentNode
      );


      close();

      return;

    }


    nameElement.textContent =
      node.speaker ||
      activeNPC.name;


    roleElement.textContent =
      node.role ||
      activeNPC.role ||
      "";


    textElement.textContent =
      node.text || "";


    choicesElement.innerHTML =
      "";


    const choices =
      node.choices || [];


    choices.forEach(
      (choice, index) => {

        const button =
          document.createElement(
            "button"
          );


        button.innerHTML =
          `
          <span style="
            display:inline-block;
            width:24px;
            color:rgba(255,255,255,.35);
          ">${index + 1}</span>
          ${choice.text}
          `;


        Object.assign(
          button.style,
          {
            width: "100%",

            padding:
              "10px 12px",

            background:
              "transparent",

            border: "none",

            borderLeft:
              "2px solid transparent",

            color:
              "rgba(255,255,255,.78)",

            fontSize:
              "14px",

            textAlign:
              "left",

            cursor:
              "pointer",

            transition:
              "all .12s"
          }
        );


        button.addEventListener(
          "mouseenter",
          () => {

            button.style.color =
              "#fff";


            button.style.background =
              "rgba(255,255,255,.055)";


            button.style.borderLeftColor =
              "#e7c36d";


            button.style.paddingLeft =
              "17px";

          }
        );


        button.addEventListener(
          "mouseleave",
          () => {

            button.style.color =
              "rgba(255,255,255,.78)";


            button.style.background =
              "transparent";


            button.style.borderLeftColor =
              "transparent";


            button.style.paddingLeft =
              "12px";

          }
        );


        button.addEventListener(
          "click",
          () => {

            if (
              !choice.next ||
              choice.next ===
              "end"
            ) {

              close();

              return;

            }


            currentNode =
              choice.next;


            render();

          }
        );


        choicesElement.appendChild(
          button
        );

      }
    );

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
