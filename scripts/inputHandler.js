addEventListener('keydown', e => {
    if ($('.dialogue').hasClass('show') && e.code === 'Enter') $('.dialogue')[0].click()
})

let htq;
addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    $('.hover-text')[0].style.transform = `translate(${e.clientX + 20}px,${e.clientY + 20}px)`
    if (e.clientX + 20 + $('.hover-text')[0].offsetWidth > window.innerWidth) {
        $('.hover-text')[0].style.transform = `translate(${window.innerWidth - $('.hover-text')[0].offsetWidth}px,${e.clientY + 20}px)`
    }
    if (e.clientY + 20 + $('.hover-text')[0].offsetHeight > window.innerHeight) {
        $('.hover-text')[0].style.transform = `translate(${e.clientX + 20}px,${window.innerHeight - $('.hover-text')[0].offsetHeight}px)`
    }
    if (e.target.dataset && e.target.dataset.hoverText) {
        $('.hover-text')[0].style.opacity = '1'
        $('.hover-text').html(e.target.dataset.hoverText)
    } else $('.hover-text')[0].style.opacity = '0'
})
