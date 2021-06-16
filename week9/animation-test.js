import { Timeline, Animation } from "./animation.js";
import { ease, easeIn } from "./ease.js";

let tl = new Timeline()

tl.start()



// window.tl = tl
// window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null)
tl.add(new Animation(document.querySelector('.box').style, 'transform', 0, 500, 2000, 0, easeIn, v => `translateX(${v}px)`))
document.querySelector('.box1').style.transition = 'transform ease-in 2s'
document.querySelector('.box1').style.transform = 'translateX(500px)'

document.querySelector('#pause-btn').addEventListener('click', () => tl.pause())
document.querySelector('#resume-btn').addEventListener('click', () => tl.resume())


