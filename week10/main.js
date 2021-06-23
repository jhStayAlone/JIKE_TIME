

function creatElement(type, attributes, ...children) {
    let element
    if (typeof type === 'string') {
        element = new ElementWrapper(type)
    } else {
        element = new type
    }
    for (let name in attributes) {
        element.setAttribute(name, attributes[name])
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child)
        }
        element.appendChild(child)
    }
    return element
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class Carousel {
    constructor() {
        this.root = document.createElement('div')
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        child.mountTo(this.root)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

let a = <Carousel>
    <span>a</span>
    <span>b</span>
    <span>c</span>
</Carousel>

// let array = [
//     "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A3%81%E7%BA%B8&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=466023402,4255709910&os=1099247041,4272536572&simid=4236771762,742373337&pn=23&rn=1&di=217360&ln=3762&fr=&fmq=1623073502223_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&oriquery=%E5%A3%81%E7%BA%B8&objurl=https%3A%2F%2Fss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Ff3d3572c11dfa9ece2b7dc9c60d0f703908fc1a4.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined",
//     "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A3%81%E7%BA%B8&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3874392250,1777675246&os=3085247851,705748105&simid=4197860790,625943911&pn=99&rn=1&di=216040&ln=3762&fr=&fmq=1623073502223_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=3c&oriquery=%E5%A3%81%E7%BA%B8&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fattach.bbs.miui.com%252Fforum%252F201208%252F28%252F213940mzipilupppuxbuvi.jpg%26refer%3Dhttp%253A%252F%252Fattach.bbs.miui.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1625665642%26t%3D0c7fc24c2f4490190c4bb7a4731e6e5b&rpstart=0&rpnum=0&adpicid=0&nojc=undefined",
//     "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A3%81%E7%BA%B8&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3910672540,328426905&os=4138418542,3364304207&simid=4127315169,669860094&pn=79&rn=1&di=51920&ln=3762&fr=&fmq=1623073502223_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&oriquery=%E5%A3%81%E7%BA%B8&objurl=https%3A%2F%2Fss1.baidu.com%2F9vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F2f738bd4b31c8701f86e3d7d277f9e2f0608ff55.jpg&rpstart=0&rpnum=0&adpicid=0&nojc=undefined",
//     "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A3%81%E7%BA%B8&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=4045106833,2732108095&os=407949941,2013002054&simid=3498987943,307097434&pn=75&rn=1&di=129140&ln=3762&fr=&fmq=1623073502223_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&oriquery=%E5%A3%81%E7%BA%B8&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fattach.bbs.miui.com%252Fforum%252F201107%252F26%252F170118k33ni0vgttg031zz.jpg%26refer%3Dhttp%253A%252F%252Fattach.bbs.miui.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1625665505%26t%3Db190fbc30140cd0f539c6afd237252ac&rpstart=0&rpnum=0&adpicid=0&nojc=undefined",
// ]

a.mountTo(document.body)
