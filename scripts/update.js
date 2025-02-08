const version = 'v1.0.0'

const updateInfo = [
    {
        title: "遊戲釋出",
        version: 'v1.0.0',
        description: [
            {
                title: '新遊戲? 歐買尬',
                text: '現在你來玩玩看吧',
            }
        ]
    }
]

$('.version').text(version)

const umud = $('.version-history')[0]

updateInfo.forEach(u => {
    umud.innerHTML += `<h2>${u.version} - ${u.title}</h2>`
    u.description.forEach(d => {
        umud.innerHTML += `<h3>- ${d.title}</h3>`
        umud.innerHTML += `<p>${d.text}</p><br/>`
    })
})