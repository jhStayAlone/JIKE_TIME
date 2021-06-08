
import { creatElement, Conpoment } from "./framework.js";

class Carousel extends Conpoment {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, value) {
        this.attributes[name] = value
    }
    render() {
        // console.log(this.attributes.src)
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for(let record of this.attributes.src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url('${record}')`
            this.root.appendChild(child)
        }

        // 拖拽功能
        let position = 0
        this.root.addEventListener('mousedown', event => {
            console.log('mousedown')
            let children = this.root.children
            let startX = event.clientX

            let move = (event) => {
                console.log('mousemove')
                let x = event.clientX - startX

                let current = position - ((x - x % 800) / 800)
                for(let offset of [-1, 0, 1]) {
                    let pos = current + offset
                    pos = (pos + children.length) % children.length

                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${- pos * 800 + offset * 800 + x % 500}px)`
                }
            }
            let up = (event) => {
                console.log('mouseup')
                let x = event.clientX - startX
                position = position - Math.round(x / 800)

                for(let offset of [0, - Math.sign(Math.round(x / 800) - x + 400 * Math.sign(x))]) {
                    let pos = position + offset
                    pos = (pos + children.length) % children.length

                    children[pos].style.transition = ''
                    children[pos].style.transform = `translateX(${- pos * 800 + offset * 800}px)`
                }

                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
        

        // 自动轮播
        // let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children
        //     let nextIndex = (currentIndex + 1) % children.length

        //     let current = children[currentIndex]
        //     let next = children[nextIndex]

        //     next.style.transition = 'none'
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`

        //     setTimeout(() => {
        //         next.style.transition = ''
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${- nextIndex * 100}%)`
        //         currentIndex = nextIndex
        //     }, 16);
        // }, 2000);


        return this.root
    }
    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

let array = [
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091216%2Fgk4k4y1d5w0gk4k4y1d5w0.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=3408567ad4316ba4bc7e0c70e5c2f8a0",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091406%2Fdrz3ek0csyqdrz3ek0csyq.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=f2d0802235808900c7f7e2cafbca195d",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg34.51tietu.net%2Fpic%2F2016-120602%2F201612060213522kbkgqlpshl73913.jpg&refer=http%3A%2F%2Fimg34.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=3aa33b088593b439fd4cc5a9bd8c5df8",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F57d22dede8e68.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625745783&t=7cc8a8b6e0eda8b70986a08345766676",
]

let a = <Carousel src={array}></Carousel>

a.mountTo(document.body)

