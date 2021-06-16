
import { Conpoment } from "./framework.js";

export class Carousel extends Conpoment {
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


