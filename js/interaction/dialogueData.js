export const DIALOGUES = {

  student: {

    start: {
      speaker: "小陈",
      role: "杭州の大学生",

      text:
        "你好！杭州には観光で来たの？",

      choices: [

        {
          text: "杭州について知りたい",
          next: "hangzhou"
        },

        {
          text: "西湖について教えて",
          next: "westlake"
        },

        {
          text: "おすすめの場所は？",
          next: "recommend"
        }

      ]
    },


    hangzhou: {

      speaker: "小陈",

      text:
        "杭州は浙江省の省都だよ。西湖で有名だけど、それだけじゃなくて、歴史ある街と現代的な都市の両方の顔を持っているんだ。",

      choices: [

        {
          text: "西湖について聞く",
          next: "westlake"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    westlake: {

      speaker: "小陈",

      text:
        "西湖は杭州を代表する場所だね。湖だけを見るより、周囲の山や寺院、塔、庭園まで一緒に歩くと杭州らしさがよく分かるよ。",

      choices: [

        {
          text: "おすすめの場所は？",
          next: "recommend"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    recommend: {

      speaker: "小陈",

      text:
        "定番なら西湖。でも歴史が好きなら良渚も面白いよ。杭州が南宋だけの街じゃないって分かるからね。",

      choices: [

        {
          text: "良渚？",
          next: "liangzhu"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    liangzhu: {

      speaker: "小陈",

      text:
        "良渚遺跡は杭州北西部にある新石器時代の遺跡だよ。玉器でも有名。今度、武林から少し遠出してみたら？",

      choices: [

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    }

  },


  vendor: {

    start: {

      speaker: "王师傅",

      role: "夜市の屋台店主",

      text:
        "来来来！何か食べていかない？杭州の食べ物には興味ある？",

      choices: [

        {
          text: "杭州料理を教えて",
          next: "food"
        },

        {
          text: "麺料理はありますか？",
          next: "noodles"
        },

        {
          text: "また後で",
          next: "end"
        }

      ]
    },


    food: {

      speaker: "王师傅",

      text:
        "杭州料理なら東坡肉や西湖醋魚が有名だね。でも地元の日常の味を知りたいなら、麺料理も面白いよ。",

      choices: [

        {
          text: "どんな麺？",
          next: "noodles"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    noodles: {

      speaker: "王师傅",

      text:
        "片儿川を知ってる？杭州で親しまれている麺料理だよ。観光名物だけじゃなくて、こういう普段の食文化を知るのも面白いでしょう？",

      choices: [

        {
          text: "なるほど！",
          next: "end"
        }

      ]
    }

  },


  local: {

    start: {

      speaker: "林阿姨",

      role: "杭州の地元住民",

      text:
        "晚上好。武林夜市、にぎやかでしょう？",

      choices: [

        {
          text: "武林ってどういう場所？",
          next: "wulin"
        },

        {
          text: "杭州は昔からこんな街？",
          next: "history"
        },

        {
          text: "夜市について教えて",
          next: "market"
        }

      ]
    },


    wulin: {

      speaker: "林阿姨",

      text:
        "武林一帯は杭州中心部の商業エリアの一つ。だから夜市だけじゃなく、周囲の街そのものを見ながら歩くと面白いよ。",

      choices: [

        {
          text: "夜市について聞く",
          next: "market"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    market: {

      speaker: "林阿姨",

      text:
        "ここでは食べ物だけじゃなくて、アクセサリーや手作り品、文創商品なんかも見られるよ。ぶらぶら歩くのが一番。",

      choices: [

        {
          text: "文創って？",
          next: "wenchuang"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    wenchuang: {

      speaker: "林阿姨",

      text:
        "文創は『文化創意』のこと。地域の文化やデザインを生かした雑貨や商品を指すことが多いね。",

      choices: [

        {
          text: "なるほど",
          next: "end"
        }

      ]
    },


    history: {

      speaker: "林阿姨",

      text:
        "杭州は長い歴史を持つ街だよ。特に南宋の都・臨安だった時代は、杭州の歴史を考えるうえで重要だね。",

      choices: [

        {
          text: "今の杭州との違いは？",
          next: "modern"
        },

        {
          text: "ありがとう",
          next: "end"
        }

      ]
    },


    modern: {

      speaker: "林阿姨",

      text:
        "今は大都市だけど、歩いていると古い街並みや歴史の痕跡が現代の建物の間に残っている。それが杭州の面白いところだと思うよ。",

      choices: [

        {
          text: "谢谢！",
          next: "end"
        }

      ]
    }

  }

};
