
import { creatElement, Conpoment } from "./framework.js";

import { Carousel } from "./carousel.js";
import { Timeline, Animation } from "./animation.js";

let array = [
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.pconline.com.cn%2Fpiclib%2F200906%2F19%2Fbatch%2F1%2F35663%2F12453784314964joior15op.jpg&refer=http%3A%2F%2Fimg1.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626958167&t=a0e47e4f027c491c2dc1871476fe0d36',
        url: 'http://www.baidu.com'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.jjmh.com%2Ffile%2Fuserfiles%2Fimages%2Fauto39%2F2017050911544598149.jpg&refer=http%3A%2F%2Fimage.jjmh.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626438192&t=b0bdfe0770c66e0933d26b6efb1917bd',
        url: 'http://www.baidu.com'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201303%2F18%2F233119quyrec7to3ws3rco.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626958167&t=74145a60184b4f4b472055bea278358b',
        url: 'http://www.baidu.com'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Ff2deb48f8c5494ee9aa312782ff5e0fe98257ec9.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626958167&t=41cf0db4fe72bdea49c6f08294b50434',
        url: 'http://www.baidu.com'
    },
]

let a = <Carousel
    src={array}
    onChange={event => {console.log(event.detail.position)}}
    onClick={event => window.location.href = event.detail.data.url}
    >
</Carousel>

a.mountTo(document.body)



// let tl = new Timeline()

// window.tl = tl
// window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null)
// // tl.add(new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null))
// tl.start()






