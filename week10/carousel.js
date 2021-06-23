
import { Conpoment, STATE, ATTRIBUTE } from "./framework.js";
import { enableGesture } from "./gesture.js";
import { Timeline, Animation } from "./animation.js";
import { ease } from './ease.js'

export { STATE, ATTRIBUTE } from './framework.js'

export class Carousel extends Conpoment {
    constructor() {
        super()
    }
    render() {
        // console.log(this.attributes.src)
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for(let record of this[ATTRIBUTE].src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url('${record.img}')`
            this.root.appendChild(child)
        }

        enableGesture(this.root)
        let timeline = new Timeline
        timeline.start()
        let handler = null
        let children = this.root.children
        
        this[STATE].position = 0

        let t = 0
        let ax = 0
        this.root.addEventListener('start', (event) => {
            console.log('start')
            timeline.pause()
            clearInterval(handler)
            if (Date.now() - t < 1500){
                let progress = (Date.now() - t) / 800
                ax = ease(progress) * 800 - 800
            } else {
                ax = 0
            }
        })

        this.root.addEventListener('tap', (event) => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position,
            })
        })

        this.root.addEventListener('pan', (event) => {
            let x = event.clientX - event.startX - ax
            console.log('pan', x)
            let current = this[STATE].position - ((x - x % 800) / 800)
            for(let offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length

                children[pos].style.transition = 'none'
                children[pos].style.transform = `translateX(${- pos * 800 + offset * 800 + x % 800}px)`
            }
        })

        this.root.addEventListener('end', (event) => {
            console.log('end')
            timeline.reset()
            timeline.start()
            handler = setInterval(nextPicture, 2000);

            let x = event.clientX - event.startX - ax
            let current = this[STATE].position - ((x - x % 800) / 800)
            let direction = Math.round((x % 800) / 800)

            if(event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 800) / 800)
                } else {
                    direction = Math.floor((x % 800) / 800)
                }
            }

            for(let offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length

                children[pos].style.transition = 'none'
                timeline.add(new Animation(
                    children[pos].style,
                    'transform',
                    - pos * 800 + offset * 800 + x % 800,
                    - pos * 800 + offset * 800 + direction * 800,
                    500,
                    0,
                    ease,
                    v => `translateX(${v}px)`
                ))
            }
            this[STATE].position = this[STATE].position - ((x - x % 800) / 800) - direction
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length

            this.triggerEvent('change', {
                position: this[STATE].position
            })

            // let x = event.clientX - event.startX - ax
            // position = position - Math.round(x / 800)

            // for(let offset of [0, - Math.sign(Math.round(x / 800) - x + 400 * Math.sign(x))]) {
            //     let pos = position + offset
            //     pos = (pos + children.length) % children.length

            //     children[pos].style.transition = ''
            //     children[pos].style.transform = `translateX(${- pos * 800 + offset * 800}px)`
            // }
        })
        
        let nextPicture = () => {
            let children = this.root.children
            let nextPosition = (this[STATE].position + 1) % children.length

            let current = children[this[STATE].position]
            let next = children[nextPosition]

            t = Date.now()

            timeline.add(new Animation(
                current.style,
                'transform',
                - this[STATE].position * 800,
                - 800 - this[STATE].position * 800,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))
            timeline.add(new Animation(
                next.style,
                'transform',
                800 - nextPosition * 800,
                - nextPosition * 800,
                500,
                0,
                ease,
                v => `translateX(${v}px)`
            ))
            this[STATE].position = nextPosition

            this.triggerEvent('change', {
                position: this[STATE].position
            })
        }

        handler = setInterval(nextPicture, 2000);

        // // 拖拽功能
        // let position = 0
        // this.root.addEventListener('mousedown', event => {
        //     console.log('mousedown')
        //     let children = this.root.children
        //     let startX = event.clientX

        //     let move = (event) => {
        //         console.log('mousemove')
        //         let x = event.clientX - startX

        //         let current = position - ((x - x % 800) / 800)
        //         for(let offset of [-1, 0, 1]) {
        //             let pos = current + offset
        //             pos = (pos + children.length) % children.length

        //             children[pos].style.transition = 'none'
        //             children[pos].style.transform = `translateX(${- pos * 800 + offset * 800 + x % 800}px)`
        //         }
        //     }
        //     let up = (event) => {
        //         console.log('mouseup')
        //         let x = event.clientX - startX
        //         position = position - Math.round(x / 800)

        //         for(let offset of [0, - Math.sign(Math.round(x / 800) - x + 400 * Math.sign(x))]) {
        //             let pos = position + offset
        //             pos = (pos + children.length) % children.length

        //             children[pos].style.transition = ''
        //             children[pos].style.transform = `translateX(${- pos * 800 + offset * 800}px)`
        //         }

        //         document.removeEventListener('mousemove', move)
        //         document.removeEventListener('mouseup', up)
        //     }

        //     document.addEventListener('mousemove', move)
        //     document.addEventListener('mouseup', up)
        // })
        

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
}


