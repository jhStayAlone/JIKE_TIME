import { Conpoment, STATE, ATTRIBUTE, creatElement } from "./framework.js";
import { enableGesture } from "./gesture.js";

export { STATE, ATTRIBUTE } from './framework.js'

export class List extends Conpoment {
    constructor() {
        super()
    }
    render() {
        this.children = this[ATTRIBUTE].data.map(this.tamplate)
        this.root = (<div>{this.children}</div>).render()
        return this.root
    }
    appendChild(child) {
        this.tamplate = child
        this.render()
    }
}