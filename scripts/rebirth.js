const calcRbp = (x) => {
    let r = Math.floor((x / rebirthAmount) * 10)
    if (r > 1e8) r = Math.floor(1e8 + r ** 0.6)
    return r
}

const rebirthAmount = 1e8
$('.rebirth-requirement').text(shorten(rebirthAmount));
const rebirth = () => {
    if (game.gainedSparkles <= rebirthAmount) return showNotif('閃不夠!')
    if (!game.rebirthPoints) game.rebirthPoints = 0
    if (!game.rp) game.rp = 0
    if (game.sparkles >= maxNum) return showNotif('但是沒有用...');
    if (game.rebirth >= 10) giveAch('10rebirth')
    giveAch('rebirth')
    game.rebirth++
    let amount = calcRbp(game.gainedSparkles)
    game.rebirthPoints += amount
    game.rp += amount
    game.sparkles = 10
    game.stardust = 0
    game.gainedSparkles = 0
    game.items = [...initItems]
    game.upgrades = [...initUpgrades]
    upgMult = 10 + game.rebirthPoints * 10
    shopItems.forEach((item, index) => {
        item.ownedAmount = 0
        item.currentPrice = item.priceBase
        item.button.text(shorten(item.currentPrice) + '閃')
        if (item.ownedAmount < 3 && shopItems[index + 1]) {
            shopItems[index + 1].element.hide()
        }
    })
    if (!game.rpUpgrades.find(r => r.id === 'dontResetSDUpgradesOnRB')) {
        game.sfm = 1
        genTime = 1000
        clearInterval(generationTimer)
        generationTimer = setInterval(generation, genTime)
        toggleAutoCraft(false)
        toggleAutoCraftAll(false)
        upgrades.forEach(u => {
            u.currentPrice = u.priceBase
            u.button.text(u.currentPrice + '星塵')
            u.ownedAmount = 0
            u.element.find('b').text(`${u.ownedAmount}/${u.max}`)
        })
        $('.auto-sparkles-button')[0].disabled = true
        $('.auto-craft-all')[0].disabled = true
        autoSparkles.button[0].disabled = false
        autoSparkles.button.text(shorten(autoSparkles.priceBase) + '星塵')
        $('#speed-for-mult')[0].disabled = true
    }
}
upgMult = 10 + multiply.ownedAmount + game.rebirthPoints * 10

$('.rebirth-button').on('click', () => {
    if (game.gainedSparkles <= rebirthAmount) return showNotif('閃不夠!')
    alertModal('確定重生?' + (calcRbp(game.gainedSparkles) > 1e8 ? ' 你能得到的RP已超過' + shorten(1e8) + '，超過的部分會被減少。' : ""), [
        {
            text: '確定',
            onclick: rebirth,
        },
        '取消'
    ])
})

let autoBuyShopItems = new Upgrade('自動購買商店物品', 1e6, '會申請外星人在每次得到製造星塵時買商店物品', 'autoBuyShopItems', 0, 2, () => {
    autoBuyShopItems.button.text(absi ? '關閉' : '開啟')
    autoBuyShopItems.button[0].onclick = () => {
        if (game.sparkles >= maxNum) return showNotif('但是沒有用...')
        toggleABSI()
        autoBuyShopItems.button.text(absi ? '關閉' : '開啟')
        giveAch('auto')
    }
}, 1)

let dontResetSDUpgradesOnRB = new Upgrade('不在重生時重置星塵升級', 1e6, '會在重生時不重置你的星塵升級', 'dontResetSDUpgradesOnRB', 0, 2, () => {
    dontResetSDUpgradesOnRB.button[0].disabled = true
    dontResetSDUpgradesOnRB.button.text('已購買')
}, 1)

let powerUpg = new Upgrade('提升次方', 1e110, '次方增加0.01', 'powerUpg', 0, 2, () => {
    power += 1
    powerUpg.displayText(`${powerUpg.ownedAmount}/${powerUpg.max} (^${power/100})`)
}, 20, 100)

rpUpgrades.forEach((upgrade, index) => {
    upgrade.displayText(upgrade.ownedAmount + '/' + upgrade.max)
    upgrade.currentPrice = upgrade.ownedAmount !== 0 ? pgf(upgrade.priceBase, upgrade.ownedAmount, upgrade.priceGrowthRate) : upgrade.priceBase;
    upgrade.button.text(shorten(upgrade.currentPrice) + 'RP')
    initRPUpgrades.push({
        id: upgrade.id,
        amount: 0
    })
    for (let i = upgrade.ownedAmount; i > 0; i--) {
        upgrade.onBuy()
    }
})

rrd()
