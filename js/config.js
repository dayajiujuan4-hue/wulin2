export const CONFIG = {

  player: {
    height: 1.7,
    speed: 4.0,
    runSpeed: 7.2,
    radius: 0.32
  },

  quality: {
    low: {
      pixelRatio: 1,
      shadows: false,
      fogDensity: 0.016
    },

    medium: {
      pixelRatio: 1.25,
      shadows: true,
      fogDensity: 0.013
    },

    high: {
      pixelRatio: 1.5,
      shadows: true,
      fogDensity: 0.011
    }
  }

};


/*
  MAP DESIGN

                文創路地
                   |
          ┌─────────────┐
          |             |
  飲食横丁 ─ 中央広場 ─ ネオン広場
      |          |
      |          |
      └── メイン夜市 ──┐
              |        |
              |      裏路地
              |        |
              └────────┘
              |
            入口
*/

export const AREAS = [

  {
    id: "entrance",
    name: "武林路入口",
    x1: -8,
    x2: 8,
    z1: 8,
    z2: 28
  },

  {
    id: "main",
    name: "武林夜市",
    x1: -9,
    x2: 9,
    z1: -50,
    z2: 8
  },

  {
    id: "square",
    name: "中央広場",
    x1: -13,
    x2: 13,
    z1: -78,
    z2: -50
  },

  {
    id: "food",
    name: "饮食横丁",
    x1: -38,
    x2: -13,
    z1: -77,
    z2: -55
  },

  {
    id: "neon",
    name: "WULINネオン広場",
    x1: 13,
    x2: 39,
    z1: -78,
    z2: -52
  },

  {
    id: "creative",
    name: "文創路地",
    x1: -10,
    x2: 10,
    z1: -118,
    z2: -78
  },

  {
    id: "back",
    name: "武林裏路地",
    x1: 18,
    x2: 38,
    z1: -50,
    z2: 5
  }

];
