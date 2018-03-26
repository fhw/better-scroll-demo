import BetterScroll from 'better-scroll'

const wrapper = document.querySelector('.wrapper')

let scroll = new BetterScroll(wrapper, {
  scrollX: true,
  click: true,
  mouseWheel: true
})

console.log(scroll)
