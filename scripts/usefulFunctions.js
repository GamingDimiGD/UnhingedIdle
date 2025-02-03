// global variables

let notif = $('.notif')
let dialogueModal = document.querySelector(".dialogue");
let dialogueContent = document.querySelector(".dialogue .content");
let characters = [
    {
        name: "店員",
        id: "shopkeeper",
        statusMaxIndex: 1,
        idleIndex: 0,
    },
    {
        name: "???",
        id: 'mystery',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: '西瓜貓',
        id: 'cat',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: '阿蛋',
        id: 'egg',
        statusMaxIndex: 0,
        idleIndex: 0,
    },
    {
        name: 'Bob',
        id: 'bob',
        statusMaxIndex: 0,
        idleIndex: 0,
    }
];
let dialogueQueue = [];

let mouseX, mouseY;

const maxNum = Number.MAX_VALUE;

const suffixesEN = [
    'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QiVg', 'SxVg', 'SpVg', 'OcVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QiTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QiQd', 'SxQd', 'SpQd', 'OQd', 'NQd', 'Qt', 'UQt', 'DQt', 'TQt', 'QaQt', 'QiQt', 'SxQt', 'SpQt', 'OQt', 'NQt', 'Sg', 'USg', 'DSg', 'TSg', 'QaSg', 'QiSg', 'SxSg', 'SpSg', 'OSg', 'NSg', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QiSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QiOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Ng', 'UNg', 'DNg', 'TNg', 'QaNg', 'QiNg', 'SxNg', 'SpNg', 'ONg', 'NNg', 'C', 'UC', 'DC', 'TC', 'QaC'
]

const suffixesCH = [
    '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極', '恆河沙', '阿僧祇', '那由他', '不可思議', '無量大數'
]

let shopItems = []
let upgrades = []

let autoSparklesOwned,
    upgMult = 10,
    autoCraftAllSparkles,
    power = 100

// initialization
document.querySelector(".dialogue .content img").src = null
characters.forEach((c) => (c.statusAmount = c.statusMaxIndex + 1));

// global functions
const alertModal = (text, options) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add('alert-modal')
    modal.innerHTML = `
    <div class="content">
        <h3>${text}</h3>
        <button>OK</button>
    </div>
    `;
    let content = modal.querySelector('.content')
    let b = content.querySelector('button')
    if (typeof options === 'string' || options instanceof String) {
        b.innerHTML = options;
        b.addEventListener("click", () => {
            modal.classList.remove('show')
            setTimeout(() => modal.remove(), 1000)
        });
    } else if (typeof options === 'array' || options instanceof Array) {
        b.remove()
        b = document.createElement('div')
        b.classList.add('buttons')
        b.style.display = 'flex'
        b.style.justifyContent = 'space-around'
        options.forEach(e => {
            let eb = document.createElement('button')
            if (typeof e === 'string' || e instanceof String) {
                eb.innerHTML = e
                eb.addEventListener("click", () => {
                    modal.classList.remove('show')
                    setTimeout(() => modal.remove(), 1000)
                });
            } else if (typeof e === 'object' || e instanceof Object) {
                eb.innerHTML = e.text
                const hide = () => {
                    modal.classList.remove('show')
                    setTimeout(() => modal.remove(), 1000)
                }
                eb.addEventListener("click", () => {
                    hide()
                    e.onclick(eb)
                })
            }
            b.appendChild(eb)
        })
        content.appendChild(b)
    } else if (!options) {
        b.addEventListener("click", () => {
            modal.classList.remove('show')
            setTimeout(() => modal.remove(), 1000)
        });
    }
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add("show"), 1)
}

const openModal = (className) => {
    document.querySelector(`.${className}`).classList.add('show')
}

const closeModal = (className) => {
    document.querySelector(`.${className}`).classList.remove('show')
}

const rng = (max, min) => {
    if (!min) min = 0
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}

let getVar = (name) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`)
}

let setVar = (name, val) => {
    return document.documentElement.style.setProperty(`--${name}`, val)
}

const compareArray = (a, b) => {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
    }
    return true
}

const glitch = (amount) => {
    let text = ''
    for (amount; amount > 0; amount--) {
        const random = Math.floor(Math.random() * 65536);
        text = text + String.fromCharCode(random);
    }
    return text
}

const todaysLunarDate = () => {
    const today = new Date()
    return Solar.fromYmd(today.getFullYear(), today.getMonth() + 1, today.getDate()).getLunar()
}

const date = (month, day) => {
    return new Date().getDate() === day && new Date().getMonth() + 1 === month
}
const dateRange = (monthFrom, dayFrom, monthTo, dayTo) => {
    return new Date().getDate() >= dayFrom && new Date().getMonth() + 1 >= monthFrom && new Date().getDate() <= dayTo && new Date().getMonth() + 1 <= monthTo
}

const lunarDate = (month, day) => {
    return todaysLunarDate().getMonth() === month && todaysLunarDate().getDay() === day
}

const lunarDateRange = (monthFrom, dayFrom, monthTo, dayTo) => {
    return todaysLunarDate().getMonth() >= monthFrom && todaysLunarDate().getDay() >= dayFrom && todaysLunarDate().getMonth() <= monthTo && todaysLunarDate().getDay() <= dayTo
}

// WE STEALIN FROM UNHINGED HANGMAN WITH THIS ONE 🔥🔥🔥

const toggleMode = (m) => {
    let mode = getComputedStyle(document.documentElement).getPropertyValue(`color-scheme`)
    let modes = [
        "light",
        "dark",
        "light dark"
    ]
    let nextMode = m || modes[(modes.indexOf(mode) + 1) % modes.length]
    console.log(modes[(modes.indexOf(mode) + 1) % modes.length])
    let modeText;
    if (nextMode === "light") modeText = "明亮"
    else if (nextMode === "dark") modeText = "黑暗"
    else if (nextMode === "light dark") modeText = "自動"
    $('.change-mode').text('切換顏色模式: ' + modeText)
    game.mode = nextMode
    save(game)
    return document.documentElement.style.setProperty(`color-scheme`, nextMode)
}

const toggleShortenMode = (m) => {
    let mode = game.shortenMode || 'EN'
    let modes = [
        "EN",
        "CH",
        "SN"
    ]
    let nextMode = m || modes[(modes.indexOf(mode) + 1) % modes.length]
    let modeText;
    if (nextMode === "EN") modeText = "英文 (到無限)"
    else if (nextMode === "CH") modeText = "中文 (1e72以下)"
    else if (nextMode === "SN") modeText = "科學記號"
    game.shortenMode = nextMode
    save(game)

    shopItems.forEach(item => {
        item.button.text(shorten(item.currentPrice) + '閃')
    })
    
    upgrades.forEach(item => {
        item.button.text(shorten(item.currentPrice) + '星塵')
    })

    $('.toggle-shorten-mode').text('大數字表示方式: ' + modeText)
}

const save = (save) => {
    $.jStorage.set('game', save)
    showNotif('自動儲存成功!', 0.5)
}

const toggleSidebar = () => {
    $('.sidebar').toggleClass('show')
    $('.open-sb').html($('.sidebar').hasClass('show')?'<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-list"></i>')
}

$('.open-dp').on('click', () => {
    $('.fixed-panel').addClass('hide')
    $('.dynamic-panel').addClass('show')
})
$('.open-fp').on('click', () => {
    $('.fixed-panel').removeClass('hide')
    $('.dynamic-panel').removeClass('show')
})

let showNotif = (text, time = 5) => {
    notif.text(text)
    notif[0].style.opacity = '1'
    setTimeout(() => {
        notif[0].style.opacity = '0'
    }, time * 1000)
}

const giveStardust = (amount) => {
    if (game.stardust >= Infinity) return;
    if(amount + game.stardust > maxNum) return game.stardust = maxNum
    game.stardust = bigInt(game.stardust).add(amount)
    $('.stardust').text(shorten(game.stardust))
}

const takeStardust = (amount) => {
    if (bigInt(game.stardust).geq(amount)) {
        game.stardust = bigInt(game.stardust).minus(amount)
        $('.stardust').text(shorten(game.stardust))
        return true
    } else {
        return false
    }
}

const giveSparkles = (amount) => {
    if(amount + game.sparkles > maxNum) return game.sparkles = maxNum
    game.sparkles += amount
    $('.sparkles').text(shorten(game.sparkles))
}

const takeSparkles = (amount) => {
    if (game.sparkles >= amount) {
        game.sparkles -= amount
        $('.sparkles').text(shorten(game.sparkles))
        return true
    } else {
        return false
    }
}

const pd = (character, text, speed, onclick, buttons, promptText, pc, textStyle, sound) => {
    if (typeof speed === 'object' || speed instanceof Object) {
        onclick = speed.onclick
        buttons = speed.buttons
        promptText = speed.promptText
        pc = speed.pc
        textStyle = speed.textStyle
        sound = speed.sound
        speed = speed.speed
    }
    if (typeof character === 'string' || character instanceof String) {
        character = characters.find((c) => c.id === character)
    }
    if (typeof character === 'number' || character instanceof Number) {
        character = characters[character]
    }
    dialogueQueue.push({
        character, text, speed, onclick, buttons, promptText, pc, textStyle, sound
    })
}

const dialogue = (d) => {
    let { character, text, speed, onclick, buttons, promptText, pc, textStyle, sound } = d[0]
    if (sound) sfx(sound)
    if (!character || !text) return alertModal("ERROR");
    let dialogueTextBox = document.querySelector(".dialogue .content .text-box");
    let characterImg = document.querySelector(".dialogue .content img");
    let characterName = document.querySelector(
        ".dialogue .content .text-box .name",
    );
    let dialogueText = document.querySelector(
        ".dialogue .content .text-box .dialogue-text",
    );
    dialogueText.className = 'dialogue-text'
    characterName.innerText = character.name;
    if (promptText) {
        let r = prompt(promptText)
        while (!r) {
            alert('你要寫東西啊')
            r = prompt(promptText)
        }
        text = text.replaceAll('{prompt}', r)
        if (pc) pc(r)
    }
    dialogueText.innerHTML = "";
    let i = text.length;
    let si = 1;
    dialogueModal.classList.add("show");
    text = text.trim();
    const { statusMaxIndex, idleIndex, statusAmount } = character;
    if (typeof buttons === 'array' || buttons instanceof Array) {
        let e = setInterval(() => {
            if (i > 0) return;
            buttons.forEach(button => {
                let b = document.createElement('button')
                b.classList.add('dialogueButton')
                b.innerText = button.text
                b.onclick = () => {
                    if (dialogueQueue.length > 1) {
                        dialogueQueue.shift();
                        dialogue(dialogueQueue)
                    } else {
                        dialogueModal.classList.remove("show");
                    }
                    b.disabled = true;
                    if (button.callback) {
                        dialogueQueue.shift()
                        button.callback()
                    }
                    document.querySelectorAll('.dialogueButton').forEach(bb => bb.remove())
                }
                dialogueTextBox.append(b)
            })
            clearInterval(e)
        })
    }

    let j = setInterval(() => {
        if (i > 0) {
            if (statusMaxIndex >= 1 || statusAmount > 1) {
                characterImg.src = `../images/characters/${character.id}/${character.id}${si}.png`;
            }
            dialogueText.innerHTML += text.charAt(text.length - i);
            i--;
        } else {
            characterImg.src = `../images/characters/${character.id}/${character.id}${idleIndex}.png`;
            clearInterval(j);
        }
    }, speed || 100);
    if (typeof textStyle === 'string' || textStyle instanceof String) dialogueText.classList.add(textStyle)
    else if (typeof textStyle === 'array' || textStyle instanceof Array) {
        textStyle.forEach(style => dialogueText.classList.add(style))
    }
    let jin = setInterval(() => {
        if (i > 0) {
            dialogueModal.onclick = () => {
                if (i > 0) {
                    i = 0;
                    clearInterval(j);
                    dialogueText.innerHTML = text;
                }
            };
            return;
        }
        if (buttons) return
        if (dialogueQueue.length > 1) {
            dialogueModal.onclick = () => {
                if (i > 0) return;
                clearInterval(jin)
                dialogueQueue.shift();
                dialogue(dialogueQueue)
                if (onclick) {
                    dialogueQueue.shift()
                    onclick()
                }
                dialogueModal.onclick = null;
            };
            return
        }
        dialogueModal.onclick = () => {
            if (i > 0) return;
            clearInterval(jin)
            dialogueModal.classList.remove("show");
            dialogueQueue.shift()
            if (onclick) onclick()
            dialogueModal.onclick = null;
        };
    });
};


let dq = () => dialogue(dialogueQueue)

const isMobile = () => {
    return navigator.maxTouchPoints > 0
}

const shorten = (num) => {
    let shortenedNum = num
    if (game.shortenMode === "EN") {
        $.each(suffixesEN, (i, suffix) => {
            if (Math.abs(num) >= 10 ** (3 + 3 * (i + 1)) && Math.abs(num) < 10 ** (6 + 3 * (i + 1))) {
                shortenedNum = (num / 10 ** (3 + 3 * (i + 1))).toFixed(1) + suffix;
            }
        })
    } else if (game.shortenMode === 'CH' && num < 1e72) {
        $.each(suffixesCH, (i, suffix) => {
            if (Math.abs(num) >= 10 ** (4 + 4 * (i + 1)) && Math.abs(num) < 10 ** (8 + 4 * (i + 1))) {
                shortenedNum = (num / 10 ** (4 + 4 * (i + 1))).toFixed(1) + suffix;
            }
        })
    } else if (num >= 1e6 || (game.shortenMode === 'CH' && num >= 1e72)) {
        shortenedNum = numeral(num).format('0.00e+0').replaceAll('+','')
    }
    return shortenedNum
}

const shortenCH = (num) => {
    let shortenedNum = num
    $.each(suffixesCH, (i, suffix) => {
        if (Math.abs(num) >= 10 ** (4 + 4 * (i + 1)) && Math.abs(num) < 10 ** (8 + 4 * (i + 1))) {
            shortenedNum = (num / 10 ** (4 + 4 * (i + 1))).toFixed(1) + suffix;
        }
    })
    return shortenedNum
}

const toggleAutoCraft = (e) => {
    if(game.upgrades.find(i => i.id === 'autoSparkles').amount <= 0) return showNotif('你沒有買自動合成閃!')
    autoSparklesOwned = e || !autoSparklesOwned;
    $('.auto-sparkles-button').text('自動合成: ' + (autoSparklesOwned?'開':'關'))
    game.autoCraft = autoSparklesOwned
    return autoSparklesOwned;
}
const toggleAutoCraftAll = (e) => {
    if(game.upgrades.find(i => i.id === 'autoSparkles').amount <= 0) return showNotif('你沒有買自動合成閃!')
    autoCraftAllSparkles = e || !autoCraftAllSparkles;
    $('.auto-craft-all').text('自動合成全部: ' + (autoCraftAllSparkles?'開':'關'))
    game.autoCraftAll = autoCraftAllSparkles
    return autoCraftAllSparkles;
}

const sfm = (mult = game.sfm) => {
    if (!(shortenTimer.ownedAmount === shortenTimer.max)) return; 
    if (mult > 1000) mult = 1000
    if (mult < 1) mult = 1
    genTime = mult * 10
    game.sfm = mult
    clearInterval(generationTimer)
    generationTimer = setInterval(generation, genTime)
    $('.change-sfm-input').val(game.sfm)
    $('.sfm-display').html(`製造速度: ${mult / 100}秒<br>轉成倍率: ${mult}倍`)
    return genTime
}