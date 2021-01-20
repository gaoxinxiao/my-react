
//102334155
function fib(n) {
    if (n <= 1) return n
    return fib(n - 1) + fib(n - 2)
}

let catchArr = []

function fib1(n) {
    if (n <= 1) return n

    if (catchArr[n]) {
        return catchArr[n]
    }

    let ns = fib1(n - 1) + fib1(n - 2)

    catchArr[n] = ns

    return ns
}

// 0 011 235
function fib2(n) {
    let prev = 1
    let curt = 1
    let next = 0

    while (n >= 3) {
        next = prev + curt
        prev = curt
        curt = next
        n--
    }
    return curt
}

console.log(fib2(100000))
