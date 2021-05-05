const css = require('css')
let currentToken = null
let currentAttribute = null

let stack = [{type: 'document', children: []}]
let currentTextNode = null

let rules = []
function addCSSRules(text) {
    // console.log(text, 'text')
    let ast = css.parse(text)
    // console.log(JSON.stringify(ast, null, '     '))
    rules.push(...ast.stylesheet.rules)
    // console.log(rules, 'rules')
}

function match(element, selector) {
    if (!selector || !element.attributes) {
        return false
    }
    if (selector.charAt(0) === '#') {
        let attr = element.attributes.filter(key => {
            return key.name === 'id'
        })[0]
        if (attr && attr.value === selector.replace('#', '')) {
            return true
        }
    } else if (selector.charAt(0) === '.') {
        let attr = element.attributes.filter(key => {
            return key.name === 'class'
        })[0]
        if (attr && attr.value === selector.replace('.', '')) {
            return true
        }
    } else {
        if (element.tagName === selector) {
            return true
        }
    }
}

function specificity(selector) {
    let spList = [0, 0, 0, 0]
    let selectorParts = selector.split(' ')
    for (let part of selectorParts) {
        if (part.charAt(0) === '#') {
            spList[1] += 1
        } else if (part.charAt(0) === '.') {
            spList[2] += 1
        } else {
            spList[3] += 1
        }
    }
    return spList
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return sp1[3] - sp2[3]
}

function computeCSS(element) {
    let elements = stack.slice().reverse()
    if (!element.computedStyle) {
        element.computedStyle = {}
    }

    for(let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse()
        if (!match(element, selectorParts[0])) {
            continue
        }
        // let matched = false
        let j = 1
        for(let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++
            }
        }
        if (j >= selectorParts.length) {
            matched = true
        }
        if (matched) {
            let sp = specificity(rule.selectors[0])
            let computedStyle = element.computedStyle
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                     computedStyle[declaration.property] = {}
                }
                if (!computedStyle[declaration.property].specificity) {
                     computedStyle[declaration.property].value = declaration.value
                     computedStyle[declaration.property].specificity = sp
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }
        }
        console.log(element, 'computedStyle')
    }
}

function emit(token) {
    // console.log(token, 'token')
    let top = stack[stack.length - 1]
    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName
        for (let key in token) {
            if (key !== 'type' || key !== 'tagName') {
                element.attributes.push({
                    name: key,
                    value: token[key]
                })
            }
        }
        computeCSS(element)
        top.children.push(element)
        if (!token.isSelfClosing) {
            stack.push(element)
        }
        currentTextNode = null
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error("tag start end dosen't match!")
        } else {
            // 处理style标签的css语法
            if (top.tagName === 'style') {
                // console.log(top, 'top')
                addCSSRules(top.children[0].content)
            }
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

// EOF: end of file
const EOF = Symbol('EOF')

function data(item) {
    if (item === '<') {
        return tagOpen
    } else if (item === EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        emit({
            type: 'text',
            content: item
        })
        return data
    }
}

function tagOpen(item) {
    if (item === '/') {
        return endTagOpen
    } else if (item.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(item)
    } else {
        emit({
            type: 'text',
            content: item
        })
        return
    }
}

function endTagOpen(item) {
    if (item.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(item)
    } else if (item === '>') {

    } else if (item === EOF) {

    } else {

    }
}

function tagName(item) {
    if (item.match(/^[\t\r\f ]$/)) {
        return beforeAttributeName
    } else if (item === '/') {
        return selfClosingStartTag
    } else if (item.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += item
        return tagName
    } else if (item === '>') {
        emit(currentToken)
        return data
    } else {
        currentToken.tagName += item
        return tagName
    }
}

function beforeAttributeName(item) {
    if (item.match(/^[\t\r\f ]$/)) {
        return beforeAttributeName
    } else if (item === '>' || item === '/' || item === EOF) {
        return afterAttributeName(item)
    } else if (item === '=') {
        
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(item)
    }
}

function attributeName(item) {
    if (item.match(/^[\t\n\f ]$/) || item === '/' || item === '>' || item === EOF) {
        return afterAttributeName(item)
    } else if (item === '=') {
        return beforeAttributeValue
    } else if (item === '\u0000') {

    } else if (item === '"' || item === '\'' || item === '<') {

    } else {
        currentAttribute.name += item
        return attributeName 
    }
}

function beforeAttributeValue(item) {
    if (item.match(/^[\t\n\f ]$/) || item === '/' || item === '>' || item === EOF) {
        return beforeAttributeValue
    } else if (item === '"') {
        return doubleQuotedAttributeValue
    } else if (item === '\'') {
        return singleQuotedAttributeValue
    } else if (item === '>') {

    } else {
        return UnquotedAttributeValue(item)
    }
}

function doubleQuotedAttributeValue(item) {
    if (item === '"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (item === '\u0000') {

    } else if (item === EOF) {

    } else {
        currentAttribute.value += item
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(item) {
    if (item === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (item === '\u0000') {

    } else if (item === EOF) {

    } else {
        currentAttribute.value += item
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(item) {
    if (item.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (item === '/') {
        return selfClosingStartTag
    } else if (item === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (item === EOF) {

    } else {
        currentAttribute.value += item
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(item) {
    if (item.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (item === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (item === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (item === '\u0000') {

    } else if (item === '"' || item === '\'' || item === '<' || item === '=' || item === '`') {

    } else if (item === EOF) {

    } else {
        currentAttribute.value += item
        return UnquotedAttributeValue
    }
}

function selfClosingStartTag(item) {
    if (item === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (item === EOF) {

    } else {

    }
}

function afterAttributeName(item) {
    if (item.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (item === '/') {
        return selfClosingStartTag
    } else if (item === '=') {
        return beforeAttributeValue
    } else if (item === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (item === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(item)
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data
    for(item of html) {
        state = state(item)
    }
    state = state(EOF)
    return stack[0]
}