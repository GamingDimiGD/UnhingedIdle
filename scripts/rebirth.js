const calcRbp = (x) => {
    let r = Math.floor((x / rebirthAmount) * 10)
    if(r > 1e8) r = 1e8 + r**0.5
    return r
}

const rebirthAmount = 1e8
$('.rebirth-requirement').text(shorten(rebirthAmount));
const rebirth = () => {
    if (game.gainedSparkles <= rebirthAmount) return showNotif('閃不夠!')
    if (!game.rebirthPoints) game.rebirthPoints = 0
    toggleAutoCraft(false)
    toggleAutoCraftAll(false)
    game.sfm = 1
    genTime = 1000
    clearInterval(generationTimer)
    generationTimer = setInterval(generation, genTime)
    game.rebirth++
    let amount = calcRbp(game.gainedSparkles)
    game.rebirthPoints += amount
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
upgMult = 10 + multiply.ownedAmount + game.rebirthPoints * 10

$('.rebirth-button').on('click', () => {
    if (game.gainedSparkles <= rebirthAmount) return showNotif('閃不夠!')
    alertModal('確定重生? 你會得到' + shorten(calcRbp(game.gainedSparkles)) + '重生分數!', [
        {
            text: '確定',
            onclick: rebirth,
        },
        '取消'
    ])
})

$('.rebirth-display').html(`重生次數: ${game.rebirth}<br>重生分數: ${shorten(game.rebirthPoints)}<br>倍率加成: +${shorten(game.rebirthPoints)}倍<br>得到的閃(不會被花掉，但是重生會重置):${shorten(game.gainedSparkles)}`)