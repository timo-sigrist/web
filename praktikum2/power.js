const power = function (base, exponent) {
    assert(Number.isInteger(base) && Number.isInteger(exponent), "AssertionError");
    assert(exponent >= 0, "AssertionError");

    if (exponent == 0) return 1
    if (exponent % 2 == 0) return (base ** (exponent/2)) ** 2
    return base * power(base, exponent-1)
}

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}


module.exports = { power }