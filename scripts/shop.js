const pgf = (base, ownedAmount, power = 1.4) => Math.round(base * Math.pow(power, ownedAmount))

const predictPriceSum = (base, ownedAmount, amount, power = 1.4) => {
    let price = base
    for (let i = 0; i < amount; i++) {
        price += pgf(base, ownedAmount + i, power)
    }
    return price
}

class ShopItem {
    constructor(name, priceBase, description, id, stardustRate, si = 0, onBuy = () => { }) {
        this.name = name
        this.priceBase = parseFloat(priceBase)
        this.description = description
        this.id = id
        this.stardustRate = stardustRate
        this.onBuy = onBuy

        if (game.items.find(item => item.id === id))
            this.ownedAmount = game.items.find(item => item.id === id).amount
        else this.ownedAmount = 0
        this.currentPrice = this.ownedAmount !== 0 ? pgf(this.priceBase, this.ownedAmount) : priceBase;
        let itemElement = `<div class="item"><img src="../images/items/${this.id}.png" alt="${this.id}"><div class="item-info"><h3>${name}</h3><b>${this.ownedAmount}個 (每秒${shorten(Math.round((this.stardustRate * (upgMult / 10)) / (genTime / 1000)))}星塵)</b><div><button class="${this.id}-button">${shorten(this.currentPrice)}閃</button><button class="buy10">買10個</button><button class="buy100">買100個</button></div></div></div>`
        if (!si) {
            this.element = $(itemElement)
            $('.shop-items').append(this.element)
            this.button = $(`.${this.id}-button`)
            shopItems.push(this)
            initItems.push({
                id: this.id,
                amount: 0
            })
            let index = shopItems.indexOf(this)
            const buyF = () => {
                this.currentPrice = this.ownedAmount !== 0 ? pgf(this.priceBase, this.ownedAmount) : this.priceBase;
                this.element.find('b').text(this.ownedAmount + `個 (每秒${shorten(Math.round((this.stardustRate * (upgMult / 10)) / (genTime / 1000)))}星塵)`)
                this.button.text(shorten(this.currentPrice) + '閃')
                game.items.find(i => i.id === this.id).amount = this.ownedAmount
                this.onBuy()
                if (this.ownedAmount < 3 && shopItems[index + 1]) {
                    shopItems[index + 1].element.hide()
                } else if (shopItems[index + 1]) shopItems[index + 1].element.show()
            }
            this.button[0].onclick = () => {
                if (!takeSparkles(this.currentPrice)) return showNotif('你的閃不足!');
                this.ownedAmount++
                buyF()
            }
            this.element.find('*').attr('data-hover-text', this.description)
            this.element.attr('data-hover-text', this.description)
            this.element.find('.buy10')[0].onclick = () => {
                for (let i = 0; i < 10; i++) {
                    this.button.click()
                }
            }
            this.element.find('.buy100')[0].onclick = () => {
                for (let i = 0; i < 100; i++) {
                    this.button.click()
                }
            }
        }
    }
    displayText(text) {
        if (!text) return this.element.find('b').text()
        this.element.find('b').text(text)
    }
}

let lightbulb = new ShopItem('電燈', 10, '燈泡散發出的光可以被轉成少量的星塵', 'lightbulb', 5)

let fire = new ShopItem('火源', 30, '發出較大的光，可以製造更多星塵', 'fire', 25)

let torch = new ShopItem('最強的手電筒', 1e2, '可以發出讓黑色物品燒起來的光', 'torch', 50)

let solarMirror = new ShopItem('反射太陽光的鏡面', 5e2, '直接使用太陽光來增加效率', 'solarMirror', 100)

let electricity = new ShopItem('繳電費', 1e3, '繳電費來讓政府給你用電', 'electricity', 200)

let solarPanel = new ShopItem('太陽能板', 1e4, '電力不夠，需要更多!', 'solarPanel', 1e3)

let waterPower = new ShopItem('水力發電機', 1e6, '靠附近河流來製造電力', 'waterPower', 1e4)

let windTurbine = new ShopItem('風力發電機', 1e9, '建造超大風車', 'windTurbine', 1e6)

let buildMoreBuildings = new ShopItem('建造分廠', 1e12, '設立分廠一起製造星塵', 'bmb', 1e8)

let hire = new ShopItem('申請人才', 1e15, '申請人才，讓他們想辦法增加產量', 'hire', 1e11)

let rocket = new ShopItem('發射火箭', 1e19, '不但可以使用它發出的光，還可以研究別顆星球，一舉兩得!', 'rocket', 1e15)

let buildOnOtherPlanets = new ShopItem('設立外星工廠', 1e24, '在其他星球設廠', 'boop', 1e20)

let buyStars = new ShopItem('購買恆星', 1e30, '把恆星買下來，採收其能量來製造星塵', 'buyStars', 1e25)

let portal = new ShopItem('異界傳送門', 1e35, '可以去異界採收能量並建造工廠製造閃', 'portal', 1e30)

let alienWorker = new ShopItem('申請異界人與外星人', 1e40, '聘請他們來幫忙研究製造閃的方式', 'alienWorker', 1e35)

let alienTech = new ShopItem('異界與外星科技', 1e45, '使用它們的科技，大量增加收入', 'alienTech', 1e40)

let manipulateLuck = new ShopItem('控制運氣', 1e50, '可使自己的運氣變好，機器不壞掉', 'manipulateLuck', 1e45)

let timeMachine = new ShopItem('時光機', 1e60, '可以穿越時空至古代與未來，使用恐龍與未來科技來製造閃', 'timeMachine', 1e55)

let newUniverse = new ShopItem('創造新次元', 1e70, '可以製造一個新的次元來增加產量 (圖片為新次元的大霹靂)', 'newUniverse', 1e65)

let antimatterEnergy = new ShopItem('反物質能量', 1e80, '使用反物質能量來製造能量', 'antimatterEnergy', 1e75)

let breakReality = new ShopItem('突破、超越現實的工廠', 1e100, '使用突破、超越現實的方式賺閃', 'breakReality', 1e90)

let breakThe4thWall = new ShopItem('突破第四面牆', 1e120, '"我知道你在玩這個遊戲，你的電腦的能量可以提供我能量賺閃"', 'breakThe4thWall', 1e105)

let math = new ShopItem('數學', 1e150, '利用數學的力量賺閃', 'math', 1e120)

shopItems.forEach((item, index) => {
    if (item.ownedAmount < 3 && shopItems[index + 1]) {
        shopItems[index + 1].element.hide()
    }
})

class Upgrade extends ShopItem {
    constructor(name, priceBase, description, id, stardustRate = 0, si = 1, onBuy = () => { }, max, priceGrowthRate = 1.4) {
        super(name, priceBase, description, id, stardustRate, si, onBuy, max)
        this.max = max
        let itemElement = `<div class="item" data-hover-text="${description}"><img src="../images/items/${this.id}.png" alt="${this.id}"><div class="item-info"><h3>${name}</h3><b>${this.ownedAmount}/${this.max}</b><br><button class="${this.id}-button buy">${shorten(this.currentPrice)}星塵</button></button><button class="buy10">買10個</button><button class="buy100">買100個</button></div></div>`
        this.element = $(itemElement)
        $('.sd-upgrade-items').append(this.element)
        upgrades.push(this)
        if (game.upgrades.find(e => e.id === this.id)) this.ownedAmount = game.upgrades.find(e => e.id === this.id).amount
        else this.ownedAmount = 0
        this.priceGrowthRate = priceGrowthRate
        this.button = this.element.find('.buy')
        this.button[0].onclick = () => {
            if (this.ownedAmount === this.max) return showNotif('已達到最高等級!');
            if (!takeStardust(this.currentPrice)) return showNotif('你的星塵不足!');
            this.ownedAmount++
            this.currentPrice = this.ownedAmount !== 0 ? pgf(this.priceBase, this.ownedAmount, this.priceGrowthRate) : this.priceBase;
            this.element.find('b').text(this.ownedAmount + '/' + this.max)
            this.button.text(shorten(this.currentPrice) + '星塵')
            game.upgrades.find(i => i.id === this.id).amount = this.ownedAmount
            this.onBuy()
        }
        this.element.find('.buy10')[0].onclick = () => {
            for (let i = 0; i < 10; i++) {
                this.button.click()
            }
        }
        this.element.find('.buy100')[0].onclick = () => {
            for (let i = 0; i < 100; i++) {
                this.button.click()
            }
        }
        this.element.find('*').attr('data-hover-text', this.description)
        this.element.attr('data-hover-text', this.description)
    }
}

let shortenTimer = new Upgrade('生產時間縮短', 100, '從1秒開始減少星塵生產時間，每個等級減少0.005秒', 'shortenTimer', 0, 1, () => {
    genTime -= 5
    clearInterval(generationTimer)
    generationTimer = setInterval(generation, genTime)
    shortenTimer.element.find('b').text(shortenTimer.ownedAmount + '/' + shortenTimer.max + ' (現在: ' + genTime / 1e3 + '秒)')
    if (shortenTimer.ownedAmount >= shortenTimer.max) $('#speed-for-mult')[0].disabled = false
    else $('#speed-for-mult')[0].disabled = true
}, 198)

let autoSparkles = new Upgrade('自動合成閃', 1e5, '自動把星塵合成閃', 'autoSparkles', 0, 1, () => {
    $('.auto-sparkles-button')[0].disabled = false
    $('.auto-craft-all')[0].disabled = false
    autoSparkles.button[0].disabled = true
    autoSparkles.button.text('已購買')
}, 1)

let multiply = new Upgrade('星塵倍率', 200, '每等增加0.1倍', 'multiply', 0, 1, () => {
    upgMult = 10 + multiply.ownedAmount + game.rebirthPoints * 10
    multiply.element.find('b').text(multiply.ownedAmount + '/' + multiply.max + ` (倍率: ${shorten(upgMult / 10)})`)
}, 1e3)

upgrades.forEach((upgrade, index) => {
    upgrade.displayText(upgrade.ownedAmount + '/' + upgrade.max)
    upgrade.currentPrice = upgrade.ownedAmount !== 0 ? pgf(upgrade.priceBase, upgrade.ownedAmount, upgrade.priceGrowthRate) : upgrade.priceBase;
    upgrade.button.text(shorten(upgrade.currentPrice) + '星塵')
    initUpgrades.push({
        id: upgrade.id,
        amount: 0
    })
    for (let i = upgrade.ownedAmount; i > 0; i--) {
        upgrade.onBuy()
    }
})


$('#speed-for-mult')[0].disabled = shortenTimer.ownedAmount >= shortenTimer.max

if (!game.sfm) game.sfm = 1
else if (shortenTimer.ownedAmount === shortenTimer.max) sfm(game.sfm)