export const DIALOGUES = {

  student: {

    start: {

      speaker:
        "小陈",

      role:
        "杭州の大学生",

      text:
        "你好！杭州には観光で来たの？",

      choices: [

        {
          text:
            "杭州について知りたい",
          next:
            "hangzhou"
        },

        {
          text:
            "西湖について教えて",
          next:
            "westlake"
        },

        {
          text:
            "おすすめの場所は？",
          next:
            "recommend"
        }

      ]

    },


    hangzhou: {

      speaker:
        "小陈",

      text:
        "杭州は浙江省の省都だよ。西湖で有名だけど、歴史都市としての顔と現代的な大都市としての顔を両方持っているんだ。",

      choices: [

        {
          text:
            "西湖について聞く",
          next:
            "westlake"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    westlake: {

      speaker:
        "小陈",

      text:
        "西湖は杭州を代表する場所だね。湖だけじゃなく、周囲の山や寺院、塔、庭園まで一緒に歩くと杭州らしさが見えてくるよ。",

      choices: [

        {
          text:
            "おすすめの場所は？",
          next:
            "recommend"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    recommend: {

      speaker:
        "小陈",

      text:
        "歴史が好きなら良渚も面白いよ。杭州には南宋よりずっと前から続く歴史があることが分かる。",

      choices: [

        {
          text:
            "良渚って？",
          next:
            "liangzhu"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    liangzhu: {

      speaker:
        "小陈",

      text:
        "良渚遺跡は杭州周辺にある新石器時代の遺跡だよ。特に玉器でも知られているね。",

      choices: [

        {
          text:
            "谢谢！",
          next:
            "end"
        }

      ]

    }

  },


  vendor: {

    start: {

      speaker:
        "王师傅",

      role:
        "夜市の屋台店主",

      text:
        "来来来！杭州の食べ物には興味ある？",

      choices: [

        {
          text:
            "杭州料理を教えて",
          next:
            "food"
        },

        {
          text:
            "杭州の麺料理は？",
          next:
            "noodles"
        },

        {
          text:
            "また後で",
          next:
            "end"
        }

      ]

    },


    food: {

      speaker:
        "王师傅",

      text:
        "杭州料理では東坡肉などがよく知られているね。でも地元の日常の味を知るなら麺料理も面白いよ。",

      choices: [

        {
          text:
            "どんな麺？",
          next:
            "noodles"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    noodles: {

      speaker:
        "王师傅",

      text:
        "片儿川を知ってる？杭州で親しまれている麺料理だよ。観光名物だけじゃなく、普段の食文化を見るのも面白いでしょう？",

      choices: [

        {
          text:
            "なるほど！",
          next:
            "end"
        }

      ]

    }

  },


  local: {

    start: {

      speaker:
        "林阿姨",

      role:
        "杭州の地元住民",

      text:
        "晚上好。武林夜市、にぎやかでしょう？",

      choices: [

        {
          text:
            "武林ってどんな場所？",
          next:
            "wulin"
        },

        {
          text:
            "杭州の歴史を知りたい",
          next:
            "history"
        },

        {
          text:
            "夜市について教えて",
          next:
            "market"
        }

      ]

    },


    wulin: {

      speaker:
        "林阿姨",

      text:
        "武林一帯は杭州中心部の商業エリアの一つ。夜市だけじゃなくて、周囲の街も見ながら歩くと面白いよ。",

      choices: [

        {
          text:
            "夜市について聞く",
          next:
            "market"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    market: {

      speaker:
        "林阿姨",

      text:
        "ここでは食べ物だけじゃなく、アクセサリーや手作り品、文創商品なんかも見られるよ。",

      choices: [

        {
          text:
            "文創って？",
          next:
            "wenchuang"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    wenchuang: {

      speaker:
        "林阿姨",

      text:
        "文創は文化創意のこと。地域の文化やデザインを生かした商品や雑貨を指すことが多いね。",

      choices: [

        {
          text:
            "なるほど",
          next:
            "end"
        }

      ]

    },


    history: {

      speaker:
        "林阿姨",

      text:
        "杭州の歴史を考えるなら、南宋の都・臨安だった時代は重要だね。",

      choices: [

        {
          text:
            "今の杭州とは違う？",
          next:
            "modern"
        },

        {
          text:
            "ありがとう",
          next:
            "end"
        }

      ]

    },


    modern: {

      speaker:
        "林阿姨",

      text:
        "今は現代的な大都市だけど、古い歴史の痕跡が現代の街の中に残っている。それも杭州の面白さだと思うよ。",

      choices: [

        {
          text:
            "谢谢！",
          next:
            "end"
        }

      ]

    }

  }

};
