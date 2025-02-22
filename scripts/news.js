const newsArticles = [
    {
        sps: 0,
        req: () => true,
        articles: [
            'Bob買給你的機器看起來很高科技',
            '今天什麼事都沒發生',
            'Bob叫你快點',
            '這個機器使用程度只有0.0...001%',
            '還活著嗎',
            '新聞: 你們是否在一個虛擬世界裡面?',
            '訂閱遊戲迪米'
        ]
    },
    {
        sps: 1e3,
        req: () => true,
        articles: [
            '你的閃的數量距離無限還很遠欸',
            '新聞: 賺錢方式有很多種，有一種是幫電影想名稱',
            '訂閱遊戲迪米',
            '這個機器使用程度還是在0.0...001%',
            '目前沒有人懷疑你的閃到底哪裡來的',
        ]
    },
    {
        sps: 1e6,
        req: () => true,
        articles: [
            '你現在買什麼東西已經有人看到了',
            '你的家已經變成一個工廠了',
            '新聞: 新的公司"閃爍科技"帶動全國科技發展!',
            '你的工廠以"科技公司"的名義製造星塵與閃',
            '新聞: "閃"貨幣開始貶值，專家說這件事情太少自然發生',
            '你覺得這個國家經濟要被你毀了，但不是現在'
        ]
    },
    {
        sps: 1e10,
        req: () => true,
        articles: [
            '你的閃越來越多，地下室開始裝不下',
            '你繳的電費越來越貴，同時也越來越便宜',
            '新聞: 閃幣的貶值已經開始有點令人擔心了',
            'Bob覺得你蠻會用的',
            '你覺得這個國家經濟要被你毀了，但不是現在',
            '新聞: 有些專家認為有人違法造大量閃，造成貶值'
        ]
    },
    {
        sps: 1e15,
        req: () => true,
        articles: [
            '新聞: "閃爍科技" 已經開始研究要怎麼飛去外星球了!',
            '新聞: 路上看到有一堆人開始扛著大量閃去超市，可能跟貶值有關',
            '你已經影響到百姓生活了',
            'Bob說你快要達到他的目標了',
            '新聞: 有些專家認為有人違法造大量閃，造成貶值',
            '你覺得這個國家經濟要被你毀了，但不是現在'
        ]
    },
    {
        sps: 1e20,
        req: () => true,
        articles: [
            '新聞: 最近貶值非常嚴重，老百姓現在都使用電子支付',
            '新聞: 政府在找是誰在大量違法造閃，目前進展: 0%',
            '你確定要繼續?',
            '"閃爍科技哪來的閃?" - 老百姓',
            '你現在的地位有點危險',
            '新聞: 亮亮造閃廠現在在製造新的貨幣，聽說是用塑膠做的',
        ]
    },
    {
        sps: 1e25,
        req: () => true,
        articles: [
            'Bob覺得新聞報的東西很無聊',
            '新聞: 閃爍科技成功在外星球建設房子建設完畢! 不知道什麼時候能住?',
            '你的地下室塞滿了閃',
            '你以這個速率來看，你需要大約1後面200多個零個世紀才能到達無限',
            '新聞: 現在有新的貨幣"亮亮幣"盛行，聽說1亮亮幣相當於1e10閃',
            '新聞: 歐買尬這個新聞平台太好駭入了吧，哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊啊啊啊啊啊啊阿哈哈哈哈 哈啊啊嘿黑' + glitch(20)
        ]
    },
    {
        sps: 1e30,
        req: () => portal.ownedAmount > 0,
        articles: [
            '新聞: 這個新聞平台前幾天被駭客入侵，許多小朋友看這個新聞都被嚇死，我們深感抱歉。',
            'Bob說那一次新聞被駭客入侵時，覺得新聞終於好看了，尤其是<b class="italic">那一段</b>。',
            '新聞: 最近好多駭客，連電子支付平台都被駭入，許多人亮亮幣都沒了',
            '你從窗外看到許多人扛著大袋子去買菜，帶子裡面都是閃',
            '新聞: 參宿四被閃爍科技買下，需多人懷疑是此公司在違法造閃!',
            '你發現Bob只是整天在看電視，把你當佣人',
            '有一隻蒼蠅飛進製造機裡，牠現在已經被原子分離到爛掉了',
            '"這家麵包店很好吃欸，尤其是他們的餅乾" 可能從異界來的餅乾',
        ]
    },
    {
        sps: 1e35,
        req: () => portal.ownedAmount > 3,
        articles: [
            '新聞: 地球上大量有外星人出現，幸好他們都沒搞破壞，不然就世界末日了',
            '你看外面全部都是長得很奇特的"貓咪"，而且餅乾還變多了欸',
            '新聞: 遊戲玩家現在很開心，自己認識的角色不斷出現，多虧閃爍科技!',
            'Bob覺得新聞都沒報到因為貶值而損失慘重的人，甚至覺得有點可笑',
            '新聞: "貓罐頭"現在變成了一個很好用的貨幣! 一定是從異界來的',
            '你現在覺得玩家好爽'
        ]
    },
    {
        sps: 1e40,
        req: () => alienWorker.ownedAmount > 0,
        articles: [
            '新聞: 地球上越來越多外星人，專家開始有點擔心未來會發生的事',
            '你覺得這個國家經濟被你提起，但是Bob說你被帶風向了',
            '新聞: 政府審查3間公司覺得最有可能違法造閃: "亮亮造閃", "閃爍科技" 與 ""第一電子"',
            'Bob吃了一個貓罐頭，結果被貓咪抓、打、揍、炸、切、刮、肯、拉、燒、考、扔',
            '新聞: 不可以吃貓罐頭! 只有貓咪可以! 後果很慘!',
            '你被一個外星人嚇死，結果是一個會瞬移的工作人員'
        ]
    },
    {
        sps: 1e45,
        req: () => alienTech.ownedAmount > 0,
        articles: [
            '新聞: 現在大部分交通工具都有被淘汰的機會，原因是因為"瞬移手錶"這個外星科技',
            '你在外面看到許多外星人再用流利的英文與中文跟別人講話',
            '新聞: 我們歡迎世界上第一個外星人記者! 哈囉大家好我是(外星語)，我今天要...(不重要的新聞)',
            'Bob說他早知道就相信新聞說不能吃貓罐頭了 (他現在長得鼻青臉腫)',
            '新聞: 目前很多人正因為最近閃嚴重貶值而無家可歸，幸好有"快樂生活基金會"可以給他們一個家，快去(網站)斗內!',
            '"快樂生活基金會"感覺像個假的東西',
            '"##### ######## ### # ###### ######" - 某路人'
        ]
    },
    {
        sps: 1e50,
        req: () => manipulateLuck.ownedAmount > 0,
        articles: [
            '你的運氣開始變好了',
            '新聞: 閃爍科技被證實不是違法造閃的公司，民眾全部都被嚇到!',
            '新聞: 外星人研發了"反物質炸彈"，可以把地球炸爛!',
            '寫這個跟寫作文一樣累',
            'Bob說他看到的街友感覺變少了，"快樂生活基金會"搞不好是真的?',
            '新聞: 有顆隕石即將撞- 喔沒事外星人把它炸爛了',
            '"##### ######## ### # ###### ######" - 某路人',
            '"我是雨"'
        ]
    },
    {
        sps: 1e60,
        req: () => timeMachine.ownedAmount > 0,
        articles: [
            '新聞: 地球恐龍數量大增! 閃爍科技帶動全世界經濟發展!',
            '新聞: 政府開始有點懷疑閃爍科技的閃的來源',
            '"要完了" - Bob',
            '你看著恐龍思考，他們會不會找到我們?',
            '好消息: 無限閃是你現在每秒得到的星塵數量的五倍多 壞消息: 是單位數量',
            '新聞: 現在全國經濟大幅提升! 阿巴拉巴拉',
            'Bob說違法造閃可能是一件好事?',
            '新聞: 訪問李白! 他說他想喝酒!',
        ]
    },
    {
        sps: 1e70,
        req: () => newUniverse.ownedAmount > 0,
        articles: [
            '新聞: 我們今天來到閃爍次元! 這裡的太空是黃的!',
            'Bob說快要了',
            '你把你99.9%+的閃都堆在新次元裡面',
            '新聞: 國內有閃爍科技大樓爆炸! 附近民眾被"閃"淹沒!?!?',
            'Bob似乎在準備什麼東西',
            '新聞: 政府再次審查閃爍科技! (即將開始)',
            '"政府找到的話應該會被淹沒" - Bob'
        ]
    },
    {
        sps: 1e80,
        req: () => true,
        articles: [
            '新聞: 政府審查閃爍科技結果出來了! 政府: "一棟棟的房子塞滿了閃，怎麼會沒查到"',
            '你的閃的數量已經超越中文可計算的範圍了',
            'Bob: "殺了幾個，用噴星塵與閃的東西"',
            '新聞: 下閃了! 全球都是閃! 民眾: "白日螢火蟲"',
            'Bob: "搞不好大海裡的垃圾可能被閃取代"',
            '新聞: 國內有許多閃爍科技大樓爆炸! 好我真的不知道了',
            '新聞: "我想辭職"',
            '新聞: 許多外星人"食用"閃! 他們說很好吃!',
            '你一看外面，滿地、滿天、滿空氣都是閃',
            '新聞: 新品種"閃貓"! 據說會吃閃!',
            '為什麼那麼多生物開始吃閃',
        ]
    },
    {
        sps: 1e100,
        req: () => true,
        articles: [
            '新聞: 許多國家破產! 一定是因為閃外流',
            '新聞: 低窪地區被閃淹沒! 許多民眾失去家園...',
            '你現在的閃數量的3~4次方大概就超越無限了',
            '"無限是一個概念，你無法到達它" - 某位外星員工',
            '新聞: 許多民眾說他們遇到從空氣中蹦出來的閃!',
            '好這個世界真的沒了',
            '新聞: "閃之亂"開始! 世界各地陸續傳出"被閃砸到"、"被閃淹沒"的人!',
            '你的閃的數量已經超越觀察到的宇宙的原子數量，但是你把大部分藏到異次元了，大概有1e30閃都在地球上',
            '你的閃的數量已經超過一副樸克牌可以洗牌後，牌的順序的數量 (52! = 52 * 51 * 50... * 2 * 1)',
            'Bob問說這個世界怎麼塞得下這麼多閃',
        ]
    },
    {
        sps: 1e120,
        req: () => true,
        articles: [
            '該停了嗎',
            '我知道你在你的螢幕後面',
            '新聞: 被證實! 我們確實在一個虛擬世界裡面!',
            '新聞: 許多國家被閃淹沒! 海平面與閃一起上升!',
            'Bob說他不後悔',
            '你看外- 看不到，都是閃',
            '新聞: 衛星畫面曝光! 地球變"亮黃色"!!!',
            '你的好幾個次元都塞不下那麼多閃了',
            '這樣下去地球應該根本看不到無限閃的樣子，有點可惜'
        ]
    },
    {
        sps: 1e150,
        req: () => math.ownedAmount > 0,
        articles: [
            '呃',
            '新聞: (雜訊)',
            'Bob現在改看外星人工作人員傳的影片',
            '你的房子怎麼撐得住被這麼多閃壓住',
            '沒什麼話可以說了',
            '外星人: 人類已經50%滅絕了，剩下人跑去異界了',
            '外星人: 地球已變完全的亮黃色了'
        ]
    },
]

let articleLoop = setInterval(() => {
    let currentPart = newsArticles.find((a, i) => {
        return !newsArticles[i + 1] || (sps >= a.sps && newsArticles[i + 1].sps > sps)
    })
    if (currentPart) {
        while (!currentPart.req()) currentPart = newsArticles[newsArticles.indexOf(currentPart) - 1];
        let news = currentPart.articles[rng(currentPart.articles.length - 1)]
        if (sps > 1e200) {
            news = glitch(50)
        }
        $('.news').html(news)
    }
}, 5000)