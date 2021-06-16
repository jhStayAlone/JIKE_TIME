
import { creatElement, Conpoment } from "./framework.js";

import { Carousel } from "./carousel.js";
import { Timeline, Animation } from "./animation.js";

let array = [
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091216%2Fgk4k4y1d5w0gk4k4y1d5w0.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=3408567ad4316ba4bc7e0c70e5c2f8a0",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.jjmh.com%2Ffile%2Fuserfiles%2Fimages%2Fauto39%2F2017050911544598149.jpg&refer=http%3A%2F%2Fimage.jjmh.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626438192&t=b0bdfe0770c66e0933d26b6efb1917bd",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg34.51tietu.net%2Fpic%2F2016-120602%2F201612060213522kbkgqlpshl73913.jpg&refer=http%3A%2F%2Fimg34.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=3aa33b088593b439fd4cc5a9bd8c5df8",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F57d22dede8e68.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=7cc8a8b6e0eda8b70986a08345766676",
]

let a = <Carousel src={array}></Carousel>

a.mountTo(document.body)



let tl = new Timeline()

window.tl = tl
window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null)
// tl.add(new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null))
tl.start()






