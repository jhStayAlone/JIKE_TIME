function foundA(string) {
    for (let item of string) {
        if (item === 'a') {
            return true
        }
    }
    return false
}

console.log('foundA', foundA('I am jh'))