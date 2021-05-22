import {scan} from "./LexParser.js"; // node 不支持ES6 模块化
// let scan = require('./LexParser') // 使用CommonJs模块化
// console.log(typeof scan, 'scan')

let syntax = {
    Program: [
        ["StatementList", "EOF"]
    ],
    StatementList: [
        ["Statement"],
        ["StatementList", "Statement"]
    ],
    Statement: [
        ["ExpressionStatement"],
        ["IfStatement"],
        ["VariableDeclaration"],
        ["FunctionDeclaration"],
    ],
    IfStatement: [
        ["if", "(", "Expression", ")", "Statement"]
    ],
    VariableDeclaration: [
        ["var", "Identifier", ";"],
        ["let", "Identifier", ";"]
    ],
    FunctionDeclaration: [
        ["function", "Identifier", "(", ")", "{", "StatementList", "}"]
    ],
    ExpressionStatement: [
        ["Expression", ";"]
    ],
    Expression: [
        ["AdditiveExpression"]
    ],
    AdditiveExpression: [
        ["MultiplicativeExpression"],
        ["AdditiveExpression", "+", "MultiplicativeExpression"],
        ["AdditiveExpression", "-", "MultiplicativeExpression"],
    ],
    MultiplicativeExpression: [
        ["PrimaryExpression"],
        ["MultiplicativeExpression", "*", "PrimaryExpression"],
        ["MultiplicativeExpression", "/", "PrimaryExpression"],
    ],
    PrimaryExpression: [
        ["(", "Expression", ")"],
        ["Literal"],
        ["Identifier"],
    ],
    Literal: [
        ["Number"]
    ]
}

let hash = {}

function closure(state) {
    hash[JSON.stringify(state)] = state
    
    let queue = []
    for (let symbol in state) {
        if (symbol.match(/^\$/)) {
            return
        }
        queue.push(symbol)
    }
    while(queue.length) {
        let symbol = queue.shift()
        if (syntax[symbol]) {
            for(let rule of syntax[symbol]) {
                if (!state[rule[0]]) {
                    queue.push(rule[0])
                }
                let current = state
                for(let part of rule) {
                    if (!current[part])
                        current[part] = {}
                    current = current[part]
                }
                current.$reduceType = symbol
                current.$reduceLength = rule.length
            }
        }
    }
    for (let symbol in state) {
        if (symbol.match(/^\$/)) {
            return
        }
        if (hash[JSON.stringify(state[symbol])]) {
            state[symbol] = hash[JSON.stringify(state[symbol])]
        } else {
            closure(state[symbol])
        }
    }
}

let end= {
    $isEnd: true
}

let start = {
    "Program": end
}

closure(start)

let source = `
    var a;
`

function parse(source) {
    console.log(start, 'start')
    let stack = [start]
    function reduce() {
        let state = stack[stack.length - 1]
        if (state.$reduceType) {
            let children = []
            for(let i = 0; i < state.$reduceLength; i++) {
                children.push(stack.pop())
            }
            return {
                type: state.$reduceType,
                children: children.reverse()
            }
        } else {
            throw new Error("unexpected token")
        }
    }
    function shift(symbol) {
        let state = stack[stack.length - 1]
        // console.log(symbol.type)
        // console.log(state)
        // console.log(symbol.type in state)
        if (symbol.type in state) {
            stack.push(state[symbol.type])
        } else {
            shift(reduce())
            shift(symbol)
        }
    }
    for(let symbol of scan(source)) {
        // console.log(symbol)
        shift(symbol)
    }
    reduce()
    // console.log(stack)
}
parse(source)


















