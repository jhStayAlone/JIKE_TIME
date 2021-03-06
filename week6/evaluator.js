import { Realm, EnvironmentRecord, ExecutionContext, Reference } from "./runtime.js";

export class Evaluator {
    constructor() {
        this.realm = new Realm()
        this.globalObject = {}
        this.ecs = [new ExecutionContext(this.realm, this.globalObject)]
    }
    evaluate(node) {
        if (this[node.type]) {
            let r = this[node.type](node)
            // console.log(r)
            return r
        }
    }
    Program(node) {
        // console.log(node, 'Program')
        return this.evaluate(node.children[0])
    }
    StatementList(node) {
        // console.log(node, 'StatementList')
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        } else {
            this.evaluate(node.children[0])
            return this.evaluate(node.children[1])
        }
    }
    Statement(node) {
        // console.log(node, 'Statement')
        return this.evaluate(node.children[0])
    }
    VariableDeclaration(node) {
        // console.log(node, 'VariableDeclaration')
        // console.log(node.children[1].name)
        let runningEC = this.ecs[this.ecs.length - 1]
        runningEC.variableEnvironment[node.children[1].name]
    }
    ExpressionStatement(node) {
        return this.evaluate(node.children[0])
    }
    Expression(node) {
        return this.evaluate(node.children[0])
    }
    AdditiveExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
    }
    MultiplicativeExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
    }
    PrimaryExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
    }
    Literal(node) {
        return this.evaluate(node.children[0])
    }
    NumbericLiteral(node) {
        let str = node.value
        let l = str.length
        let value = 0
        let n = 10

        if (str.match(/^0b/)) {
            n = 2
            l -= 2
        } else if (str.match(/^0o/)) {
            n = 8
            l -= 2
        } else if (str.match(/^0x/)) {
            n = 16
            l -= 2
        }
        while(l--) {
            let c = str.charCodeAt(str.length - l - 1)
            if (c >= 'a'.charCodeAt(0)) {
                c = c - 'a'.charCodeAt(0) + 10
            } else if (c >= 'A'.charCodeAt(0)) {
                c = c - 'A'.charCodeAt(0) + 10
            } else if (c >= '0'.charCodeAt(0)) {
                c = c - '0'.charCodeAt(0)
            }
            value = value * n + c
        }
        return value
        // console.log(value, 'NumbericLiteral')
    }
    StringLiteral(node) {
        let result = []
        for(let i = 1; i < node.value.length - 1; i++) {
            if (node.value[i] === '\\') {
                ++i
                let c = node.value[i]
                let map = {
                    "\"": "\"",
                    "\'": "\'",
                    "\\": "\\",
                    "0": String.fromCharCode(0x0000),
                    "b": String.fromCharCode(0x0008),
                    "f": String.fromCharCode(0x000C),
                    "n": String.fromCharCode(0x000A),
                    "r": String.fromCharCode(0x000D),
                    "t": String.fromCharCode(0x0009),
                    "v": String.fromCharCode(0x000B),
                }
                if (c in map) {
                    result.push(map[c])
                } else {
                    result.push(c)
                }
            } else {
                result.push(node.value[i])
            }
        }
        // console.log(result.join(''))
        return result.join('')
    }
    ObjectLiteral(node) {
        if (node.children.length === 2) {
            return {}
        }
        if (node.children.length === 3) {
            let object = new Map()
            this.PropertyList(node.children[1], object)
            return object
        }
    }
    PropertyList(node, object) {
        if (node.children.length === 1) {
            this.Property(node.children[0], object)
        } else {
            this.PropertyList(node.children[0], object)
            this.Property(node.children[2], object)
        }
    }
    Property(node, object) {
        let name;
        if (node.children[0].type === 'Identifier') {
            name = node.children[0].name
        } else if (node.children[0].type === 'StringLiteral') {
            name = this.evaluate(node.children[0])
        }
        object.set(name, {
            value: this.evaluate(node.children[2]),
            writable: true,
            enumerable: true,
            configable: true,
        })
    }
    AssignmentExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        let left = this.evaluate(node.children[0])
        let right = this.evaluate(node.children[2])
        left.set(right)
    }
    LogicalORExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        let result = this.evaluate(node.children[0])
        if (result) {
            return result
        } else {
            return this.evaluate(node.children[2])
        }
    }
    LogicalANDExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        let result = this.evaluate(node.children[0])
        if (!result) {
            return result
        } else {
            return this.evaluate(node.children[2])
        }
    }
    LeftHeadsideExpression(node) {
        return this.evaluate(node.children[0])
    }
    NewExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        if (node.children.length === 2) {
            let cls = this.evaluate(node.children[1])
            return cls.construct()
            // let object = this.realm.Object.construct()
            // let cls = this.evaluate(node.children[1])
            // let result = cls.call(object)
            // if (typeof result === 'object') {
            //     return result
            // } else {
            //     return object
            // }
        }
    }
    CallExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        if (node.children.length === 2) {
            let func = this.evaluate(node.children[0])
            let args = this.evaluate(node.children[1])
            return func.call(args)
        }
    }
    MemberExpression(node) {
        if (node.children.length === 1) {
            return this.evaluate(node.children[0])
        }
        if (node.children.length === 3) {
            let obj = this.evaluate(node.children[0]).get()
            // return obj.get(node.children[2].name)
            let prop = obj.get(node.children[2].name)
            if ('value' in prop) {
                return prop.value
            }
            if('get' in prop) {
                return prop.get.call(obj)
            }
        }
    }
    Identifier(node) {
        let runningEC = this.ecs[this.ecs.length - 1]
        return new Reference(runningEC.lexicalEnvironment, node.name)
    }
    EOF() {
        console.log('EOF')
        return null
    }
}
