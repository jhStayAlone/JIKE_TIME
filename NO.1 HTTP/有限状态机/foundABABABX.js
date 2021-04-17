function foundABABABX(string) {
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
    if (item === 'a') {
        return foundAAA
    } else {
        return start(item)
    }
}

function foundAAA(item) {
    if (item === 'b') {
        return foundBBB
    } else {
        return start(item)
    }
}

function foundBBB(item) {
    if (item === 'x') {
        return end
    } else {
        return foundBB(item)
    }
}

console.log('foundABABABX', foundABABABX('ababababx'))
