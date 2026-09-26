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
        "杭州は浙江省の省都。西湖のイメージが強いけど、歴史都市でもあり、現代的な大都市でもあるよ。",
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
        "西湖は湖だけを見るより、周囲の山や寺院、塔、庭園まで歩いてみると杭州らしさが分かると思う。",
      choices: [
        {
          text: "ほかには？",
          next: "recommend"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    recommend: {
      speaker: "小陈",
      text:
        "歴史が好きなら良渚もおすすめ。杭州の歴史が南宋よりずっと前まで続いていることが実感できるよ。",
      choices: [
        {
          text: "良渚って？",
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
        "新石器時代の遺跡だよ。特に精巧な玉器でも知られている。杭州中心部とは全然違う景色なのも面白いね。",
      choices: [
        {
          text: "行ってみたい",
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
        "来来来！何か食べていかない？",
      choices: [
        {
          text: "杭州らしい食べ物は？",
          next: "food"
        },
        {
          text: "夜市は忙しい？",
          next: "work"
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
        "有名な料理もいいけど、杭州の日常を知りたいなら麺や小吃も食べてみるといいよ。",
      choices: [
        {
          text: "麺なら？",
          next: "noodle"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    noodle: {
      speaker: "王师傅",
      text:
        "片儿川かな。杭州で親しまれている麺料理だよ。",
      choices: [
        {
          text: "覚えておきます",
          next: "end"
        }
      ]
    },

    work: {
      speaker: "王师傅",
      text:
        "夜になると人が増えるからね。忙しいけど、通りが賑やかになるのは悪くないよ。",
      choices: [
        {
          text: "加油！",
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
        "晚上好。武林夜市、初めて？",
      choices: [
        {
          text: "武林ってどんな場所？",
          next: "wulin"
        },
        {
          text: "夜市について教えて",
          next: "market"
        },
        {
          text: "杭州の歴史について",
          next: "history"
        }
      ]
    },

    wulin: {
      speaker: "林阿姨",
      text:
        "武林は杭州中心部の商業エリアの一つ。夜市だけじゃなくて、周りの街も歩いてみるといいよ。",
      choices: [
        {
          text: "夜市について聞く",
          next: "market"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    market: {
      speaker: "林阿姨",
      text:
        "食べ物だけじゃなく、アクセサリーや手作り品、文創の商品を見るのも楽しいよ。",
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
        "文化やデザインを生かした商品ね。杭州らしいモチーフを現代風にした雑貨なんかもあるよ。",
      choices: [
        {
          text: "見てみます",
          next: "end"
        }
      ]
    },

    history: {
      speaker: "林阿姨",
      text:
        "杭州の歴史なら、南宋の都・臨安だった時代は外せないね。今の街の下にも長い歴史があるのよ。",
      choices: [
        {
          text: "なるほど",
          next: "end"
        }
      ]
    }

  },


  xiaoyu: {

    start: {
      speaker: "小雨",
      role: "杭州の大学生",
      text:
        "你也是来逛夜市的吗？ 私は友達を待ってるところ。",
      choices: [
        {
          text: "杭州の若者はどこで遊ぶ？",
          next: "young"
        },
        {
          text: "文創エリアが気になる",
          next: "creative"
        },
        {
          text: "またね",
          next: "end"
        }
      ]
    },

    young: {
      speaker: "小雨",
      text:
        "ショッピングもするし、カフェに行ったり、写真を撮ったり。杭州は新しい店がどんどんできるから面白いよ。",
      choices: [
        {
          text: "文創は人気？",
          next: "creative"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    creative: {
      speaker: "小雨",
      text:
        "うん。伝統的なものをそのまま売るんじゃなくて、若い人向けにデザインし直した商品も多いね。",
      choices: [
        {
          text: "なるほど",
          next: "end"
        }
      ]
    }

  },


  laozhou: {

    start: {
      speaker: "老周",
      role: "武林に住む地元の人",
      text:
        "この辺もずいぶん賑やかになったなあ。",
      choices: [
        {
          text: "昔とは違いますか？",
          next: "past"
        },
        {
          text: "杭州は好きですか？",
          next: "hangzhou"
        },
        {
          text: "失礼します",
          next: "end"
        }
      ]
    },

    past: {
      speaker: "老周",
      text:
        "街は変わるよ。店も人も変わる。でも夜になって人が歩いて、誰かが商売している。その感じは昔から好きだね。",
      choices: [
        {
          text: "杭州について聞く",
          next: "hangzhou"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    hangzhou: {
      speaker: "老周",
      text:
        "観光地だけ見て杭州を知ったと思わないことだな。一本裏の道を歩くと、また違う街が見える。",
      choices: [
        {
          text: "裏路地も歩いてみます",
          next: "end"
        }
      ]
    }

  },


  ajie: {

    start: {
      speaker: "阿杰",
      role: "武林路のショップ店員",
      text:
        "晚上好。何か探してる？",
      choices: [
        {
          text: "武林路について",
          next: "street"
        },
        {
          text: "夜はいつもこんな感じ？",
          next: "night"
        },
        {
          text: "大丈夫です",
          next: "end"
        }
      ]
    },

    street: {
      speaker: "阿杰",
      text:
        "この辺は買い物をする人も多いし、夜になると夜市を目当てに歩いてくる人も増えるね。",
      choices: [
        {
          text: "夜について聞く",
          next: "night"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    night: {
      speaker: "阿杰",
      text:
        "昼と夜で雰囲気がかなり違うよ。夜は看板や屋台の明かりが増えて、通りそのものが店みたいになる。",
      choices: [
        {
          text: "確かに",
          next: "end"
        }
      ]
    }

  },


  tingting: {

    start: {
      speaker: "婷婷",
      role: "上海から来た観光客",
      text:
        "すみません、ここから西湖って遠くないですよね？",
      choices: [
        {
          text: "杭州は初めて？",
          next: "first"
        },
        {
          text: "夜市はどう？",
          next: "market"
        },
        {
          text: "よい旅を",
          next: "end"
        }
      ]
    },

    first: {
      speaker: "婷婷",
      text:
        "うん。西湖を見るために来たんだけど、夜はこういう普通の街を歩く方が楽しいかもしれない。",
      choices: [
        {
          text: "夜市はどう？",
          next: "market"
        },
        {
          text: "楽しんでね",
          next: "end"
        }
      ]
    },

    market: {
      speaker: "婷婷",
      text:
        "思っていたより現代的。もっと古い感じの市場を想像してた。",
      choices: [
        {
          text: "分かる",
          next: "end"
        }
      ]
    }

  },


  chenboss: {

    start: {
      speaker: "陈老板",
      role: "杭州料理店の店主",
      text:
        "杭州の料理、食べたことある？",
      choices: [
        {
          text: "東坡肉なら知っています",
          next: "dongpo"
        },
        {
          text: "地元の料理を知りたい",
          next: "localfood"
        },
        {
          text: "また来ます",
          next: "end"
        }
      ]
    },

    dongpo: {
      speaker: "陈老板",
      text:
        "有名だね。でも一つの料理だけで杭州料理を判断しちゃだめだよ。",
      choices: [
        {
          text: "では何を食べれば？",
          next: "localfood"
        },
        {
          text: "なるほど",
          next: "end"
        }
      ]
    },

    localfood: {
      speaker: "陈老板",
      text:
        "小吃や麺も食べてみて。旅行では豪華な料理より、普段食べられているものの方が記憶に残ることもある。",
      choices: [
        {
          text: "探してみます",
          next: "end"
        }
      ]
    }

  },


  xiaolin: {

    start: {
      speaker: "小林",
      role: "文創デザイナー",
      text:
        "この柄、良渚の玉器をヒントにしてるんですよ。",
      choices: [
        {
          text: "文創って面白いですね",
          next: "design"
        },
        {
          text: "良渚がモチーフ？",
          next: "liangzhu"
        },
        {
          text: "見ていきます",
          next: "end"
        }
      ]
    },

    design: {
      speaker: "小林",
      text:
        "古い文化を博物館だけに置いておくんじゃなくて、日常で使えるデザインに変えるのも文創の面白さです。",
      choices: [
        {
          text: "良渚について聞く",
          next: "liangzhu"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    liangzhu: {
      speaker: "小林",
      text:
        "玉琮みたいな特徴的な造形は、現代のデザインにしてもすごく印象的なんですよ。",
      choices: [
        {
          text: "確かに",
          next: "end"
        }
      ]
    }

  },


  zjustudent: {

    start: {
      speaker: "子涵",
      role: "浙江大学の学生",
      text:
        "你好。私、浙江大学の学生なんです。",
      choices: [
        {
          text: "浙江大学について",
          next: "zju"
        },
        {
          text: "どのキャンパス？",
          next: "campus"
        },
        {
          text: "再见",
          next: "end"
        }
      ]
    },

    zju: {
      speaker: "子涵",
      text:
        "杭州にある大学だから、街との距離が近いのも魅力だと思う。留学生もたくさん見かけるよ。",
      choices: [
        {
          text: "キャンパスについて",
          next: "campus"
        },
        {
          text: "谢谢",
          next: "end"
        }
      ]
    },

    campus: {
      speaker: "子涵",
      text:
        "私は紫金港キャンパス。かなり広いから、初めて来る人はびっくりすると思う。",
      choices: [
        {
          text: "行ってみたい",
          next: "end"
        }
      ]
    }

  },


  photographer: {

    start: {
      speaker: "阿凯",
      role: "街を撮影しているカメラマン",
      text:
        "ちょっと待って。この光、今すごくいい。",
      choices: [
        {
          text: "何を撮ってるんですか？",
          next: "photo"
        },
        {
          text: "杭州は撮りやすい？",
          next: "hangzhou"
        },
        {
          text: "邪魔しました",
          next: "end"
        }
      ]
    },

    photo: {
      speaker: "阿凯",
      text:
        "人だよ。看板だけ撮るより、その前を誰かが通った瞬間の方が街らしくなる。",
      choices: [
        {
          text: "杭州について聞く",
          next: "hangzhou"
        },
        {
          text: "なるほど",
          next: "end"
        }
      ]
    },

    hangzhou: {
      speaker: "阿凯",
      text:
        "西湖みたいな景色もいいけど、僕は夜の路地や店の明かりを撮る方が好きかな。",
      choices: [
        {
          text: "いいですね",
          next: "end"
        }
      ]
    }

  },


  cleaner: {

    start: {
      speaker: "刘阿姨",
      role: "夜市の清掃スタッフ",
      text:
        "足元気をつけてね。夜は人が多いから。",
      choices: [
        {
          text: "夜市の仕事は大変？",
          next: "work"
        },
        {
          text: "毎日ここに？",
          next: "daily"
        },
        {
          text: "お疲れさまです",
          next: "end"
        }
      ]
    },

    work: {
      speaker: "刘阿姨",
      text:
        "人が多ければゴミも増えるからね。でも朝になったとき通りがきれいだと気持ちいいよ。",
      choices: [
        {
          text: "毎日ですか？",
          next: "daily"
        },
        {
          text: "辛苦了",
          next: "end"
        }
      ]
    },

    daily: {
      speaker: "刘阿姨",
      text:
        "こういう場所は店だけでできてるわけじゃないの。準備する人、片付ける人、いろんな人が働いてる。",
      choices: [
        {
          text: "確かにそうですね",
          next: "end"
        }
      ]
    }

  }

};
