function foundStr(string) {
    let foundA = false
    let foundB = false
    let foundC = false
    let foundD = false
    let foundE = false
    for (let item of string) {
        if (item === 'a') {
            foundA = true
        } else if (foundA && item === 'b') {
            foundB = true
            foundA = false
        } else if (foundB && item === 'c') {
            foundC = true
            foundA = false
            foundB = false
        } else if (foundC && item === 'd') {
            foundD = true
            foundA = false
            foundB = false
            foundC = false
        } else if (foundD && item === 'e') {
            foundE = true
            foundA = false
            foundB = false
            foundC = false
            foundD = false
        } else if (foundE && item === 'f') {
            return true
        } else {
            foundA = false
            foundB = false
            foundC = false
            foundD = false
            foundE = false
        }
    }
    return false
}

console.log('foundStr --- abcdef', foundStr('abcdef'))