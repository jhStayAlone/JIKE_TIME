function foundABCABX(string) {
    let state = start
    for (let item of string) {
        state = state(item)
    }
    return state === end
}

function start(item) {
    if (item === 'a') {
        return foundA
    } else {
        return start
    }
}

function end(item) {
    return end
}

function foundA(item) {
    if (item === 'b') {
        return foundB
    } else {
        return start(item)
    }
}

function foundB(item) {
    if (item === 'c') {
        return foundC
    } else {
        return start(item)
    }
}

function foundC(item) {
    if (item === 'a') {
        return foundAA
    } else {
        return start(item)
    }
}

function foundAA(item) {
    if (item === 'b') {
        return foundBB
    } else {
        return start(item)
    }
}

function foundBB(item) {
    if (item === 'x') {
        return end
    } else {
        return foundB(item)
    }
}

console.log('foundABCABX', foundABCABX('abcabcabx'))