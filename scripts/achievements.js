const achievements = [
    {
        name: '愛迪生',
        description: '使用燈泡來製造星塵',
        id: 'lightbulb',
    },
    {
        name: '支援政府',
        description: '繳電費',
        id: 'government',
    },
    {
        name: '貴爆',
        description: '買風力發電機',
        id: 'windTurbine',
    },
    {
        name: '向外擴張',
        description: '建造分廠',
        id: 'buildMore',
    },
    {
        name: '那也能買?!',
        description: '購買恆星',
        id: 'buyStar',
    },
    {
        name: '數學是一切',
        description: '購買數學',
        id: 'math',
    },
    {
        name: '有差嗎',
        description: '購買"生產時間縮短"',
        id: 'huh',
    },
    {
        name: '終於有差了!',
        description: '買滿"生產時間縮短"',
        id: 'maxShortenTimer',
    },
    {
        name: '我沒看過這種數字!',
        description: '得到超過' + shorten(1e16) + '星塵',
        id: '1e16sd',
    },
    {
        name: '這不是點擊遊戲!',
        description: '點一下星塵製造機',
        id: 'clicker',
    },
]

const checkAchievements = () => {
    if (game.achievements.length > 0) $('.ach-display').empty();
    game.achievements.forEach(a => {
        const ach = achievements.find(b => b.id === a)
        const achDiv = $('<div class="achievement"></div>')
        achDiv.append(`<div>
                        <h3>${ach.name}</h3>
                        ${ach.description}
                    </div>`)
        $('.ach-display').append(achDiv)
    })
}

checkAchievements()

const giveAch = (id) => {
    if (game.achievements.includes(id)) return;
    if (!achievements.find(ach => ach.id === ach.id)) return;
    game.achievements.push(id)
    showNotif('你獲得新成就！')
    checkAchievements()
    return true;
}