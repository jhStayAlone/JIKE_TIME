function foundAB(string) {
    let foundA = false
    for (let item of string) {
        if (item === 'a') {
            foundA = true
        } else if (foundA && item === 'b') {
            return true
        } else {
            foundA = false
        }
    }
    return false
}

console.log('foundAB', foundAB('ljdajbskab'))