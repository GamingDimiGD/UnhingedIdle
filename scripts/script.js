console.log('hello world!')
let initItems = []
let initUpgrades = []
let initRPUpgrades = []
let genTime = 1000

let emptySave = {
    stardust: 0,
    sparkles: 10,
    gainedSparkles: 10,
    mode: 'light dark',
    shortenMode: 'EN',
    items: initItems,
    upgrades: initUpgrades,
    autoCraft: false,
    autoCraftAll: false,
    sfm: 1,
    rebirth: 0,
    rebirthPoints: 0,
    rp: 0,
    rpUpgrades: initRPUpgrades,
    autoBuyShopItems: false,
    achievements: [],
}

let game = $.jStorage.get('game') || { ...emptySave }

if (Object.keys(game).length < Object.keys(emptySave).length) {
    Object.keys(emptySave).forEach(key => {
        if (!game.hasOwnProperty(key)) {
            game[key] = emptySave[key]
        }
    })
}

if (!$.jStorage.get('game')) {
    pd(4, '你有一個使命')
    pd(4, '你要製造很多閃')
    pd(4, '超越無限')
    pd(4, '你的星塵製造機每秒製造1粒星塵')
    pd(4, '100顆星塵可以買一閃')
    pd(4, '用閃買素材，加快生產效率')
    pd(4, '突破無限')
    pd(4, '變成超級有閃人')
    pd(4, '請自己摸索怎麼使用。')
    dq()
}

if (game.autoCraft) toggleAutoCraft(true)
if (game.autoCraftAll) toggleAutoCraftAll(true)

$.each($('.sidebar button'), (i, e) => {
    e.onclick = () => {
        if (e.id === 'speed-for-mult' && shortenTimer.max > shortenTimer.ownedAmount) return showNotif('你沒買滿生產時間縮短!');
        if (e.id === 'about') giveAch('viewDev')
        $('.content .menu.show').removeClass('show')
        $('.open-sb')[0].click()
        openModal(e.id)
    }
})
$('.stardust').text(shorten(game.stardust))
$('.sparkles').text(shorten(game.sparkles))

toggleMode(game.mode)
toggleShortenMode(game.shortenMode)
toggleABSI(game.autoBuyShopItems)

let autoSave = setInterval(() => {
    save(game)
}, 10000)

if (window.innerHeight < 650 && window.innerHeight < window.innerWidth) {
    alertModal('你的螢幕太窄了，如果使用手機或平板的話，建議直放遊玩。')
}

let timeLastFrame = [], delay = 0, sps;

const generation = () => {
    game.items = game.items.filter(item => item.id && item.amount)
    game.upgrades = game.upgrades.filter(item => item.id && item.amount)
    
    shopItems.sort((a, b) => {
        return initItems.indexOf(initItems.find(c => c.id === a.id)) - initItems.indexOf(initItems.find(c => c.id === b.id))
    })
    game.items.sort((a, b) => {
        return initItems.indexOf(initItems.find(c => c.id === a.id)) - initItems.indexOf(initItems.find(c => c.id === b.id))
    })

    $.each(shopItems, (i, item) => {
        item.displayText(`${item.ownedAmount}個 (每秒${shorten(Math.round((item.stardustRate * (upgMult / 10)) / ((genTime + delay) / 1000)))}星塵)`)
        if (!game.items.find(it => it.id === item.id)) {
            game.items.push({
                id: item.id,
                amount: item.ownedAmount
            })
        }

        let itemsBefore = [...shopItems.filter(it => shopItems.indexOf(it) <= i)]
        if (game.sparkles * 10 >= item.priceBase || item.ownedAmount > 0) {
            itemsBefore.forEach(e => e.element.show())
            item.element.show()
        } else {
            item.element.hide()
        }
    })
    
    $.each(upgrades, (i, item) => {
        if (!game.upgrades.find(it => it.id === item.id)) {
            game.upgrades.push({
                id: item.id,
                amount: item.ownedAmount
            })
            return;
        }
        if (item.max < game.upgrades.find(it => it.id === item.id).amount) {
            game.upgrades.find(it => it.id === item.id).amount = item.max
        }
    })
    
    $.each(rpUpgrades, (i, item) => {
        if (!game.rpUpgrades.find(it => it.id === item.id)) {
            game.rpUpgrades.push({
                id: item.id,
                amount: item.ownedAmount
            })
            return;
        }
        if (item.max < game.rpUpgrades.find(it => it.id === item.id).amount) {
            game.rpUpgrades.find(it => it.id === item.id).amount = item.max
        }
    })
    
    $.each(shopItems.reverse(), (i, item) => {
        if (absi && item.currentPrice <= game.sparkles) {
            item.button[0].click()
        }
    })



    let upgMulti = upgMult / 10
    let upgPower = power / 100
    let genStardust = (1 * upgMulti + game.achievements.length) ** upgPower * game.sfm
    giveStardust(Math.round(genStardust))
    game.items.forEach(item => {
        let stardustRate = shopItems.find(i => i.id === item.id).stardustRate
        giveStardust(Math.round((stardustRate * item.amount * upgMulti) ** upgPower * game.sfm))
        genStardust += Math.round((stardustRate * item.amount * upgMulti) ** upgPower * game.sfm)
    })
    let genStardustRate = Math.round(genStardust / ((genTime + delay) / 1000))
    $('.persecond').text(shorten(genStardustRate) + ' 星塵')
    if (autoSparklesOwned) {
        let amountToSparkle = Math.ceil(genStardust / 200) * 100
        takeStardust(amountToSparkle)
        giveSparkles(amountToSparkle / 100)
        $('.persecond').text(`${shorten(Math.round((amountToSparkle / 100) / ((genTime + delay) / 1000)))}閃/秒 約${shorten(Math.round((genStardust - amountToSparkle) / ((genTime + delay) / 1000)))} 星塵`)
    }
    if (autoCraftAllSparkles) {
        $('.craft-all')[0].click()
        $('.persecond').text(`${shorten(Math.floor((genStardust / 100) / ((genTime + delay) / 1000)))} 閃`)
    }
    timeLastFrame.push(Date.now())
    if (timeLastFrame.length >= 2) {
        delay = (timeLastFrame[timeLastFrame.length - 1] - timeLastFrame[0]) - genTime
        timeLastFrame.shift()
    }
    sps = genStardust
    $('.delay').text(`延遲: ${delay / 1000}秒`)
    $('#speed-for-mult')[0].disabled = !(shortenTimer.ownedAmount >= shortenTimer.max)
    $('.rebirth-display').html(`重生次數: ${game.rebirth}<br>RP: ${shorten(game.rp)}<br>倍率加成: +${shorten(game.rebirthPoints)}倍<br>得到的閃(不會被花掉，但是重生會重置):${shorten(game.gainedSparkles)}<br>重生可得到的RP: ${shorten(calcRbp(game.gainedSparkles))}`)
    $('.sparkles').text(shorten(game.sparkles))
    let p = (bigInt(game.sparkles).value.toString().length / bigInt(maxNum).value.toString().length) * 100
    if (p > 100) p = 100
    if (p < 0 || game.sparkles < 10) p = 0
    $('.bg-img')[0].style.height = `${p}%`
    rrd()
    if (game.stardust > 1e100 && !game.achievements.includes('googol')) {
        pd(5, '喂! 停了!')
        pd(5, '你會把這個世界淹沒!')
        pd(6, '許多國家都被你淹沒了!')
        pd(4, '喔 然後哩')
        pd(4, '　', {
            sound: 'pewpew'
        })
        pd(4, 'ok 解決了')
        pd(4, '繼續吧')
        dq()
        giveAch('googol')
    }
    if (game.sparkles >= maxNum) {
        clearInterval(generationTimer)
        $('.sparkles').text('無限')
        $('.stardust').text('無限')
        $('.persecond').text('無限閃')
        if (game.achievements.includes('infinity')) return showNotif('但是沒有用...')
        pd(4, '好')
        pd(4, '你達到你的使命了')
        pd(4, '恭喜你。')
        dq()
        giveAch('infinity')
    }
}

let generationTimer = setInterval(generation, genTime)

