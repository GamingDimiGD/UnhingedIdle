const rebirthAmount = 1e12
$('.rebirth-requirement').text(shorten(rebirthAmount));
const rebirth = () => {
    if (this.sparkles < 1e12) return showNotif('閃不夠!')
    if(!game.rebirthPoints) game.rebirthPoints = 0
    game.rebirth++
    game.rebirthPoints += Math.floor(game.sparkles / rebirthAmount)
    game.sparkles = 10 * game.rebirth
    game.stardust = 0
    game.items = initItems
    game.upgrades = initUpgrades
    power = 100 + game.rebirthPoints
    upgMult = 10 + game.rebirthPoints * 10
}
power = 100 + game.rebirthPoints
upgMult = 10 + multiply.ownedAmount + game.rebirthPoints * 10

$('.rebirth-button').on('click', () => {
    if (game.sparkles < rebirthAmount) return showNotif('閃不夠!')
    alertModal('確定轉生? 你會得到' + Math.floor(game.sparkles / rebirthAmount) + '轉生分數!', [
        {
            text: '確定',
            onclick: rebirth,
        },
        '取消'
    ])
})

$('.rebirth-display').html(`轉生次數: ${game.rebirth}<br>轉生分數: ${game.rebirthPoints}`)