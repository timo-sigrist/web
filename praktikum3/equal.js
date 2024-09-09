const equal = function(a, b) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (typeof(a) === "object" && typeof(b)  === "object") {
        let aKeys = Object.keys(a)
        let bKeys = Object.keys(b)

        if (aKeys.length != bKeys.length) return false
        
        for (key of aKeys) {
            if (!bKeys.includes(key) || a[key] != b[key]) return false
        }
        return true
    }
    return false
}
/*
console.log(equal(16,16))
console.log(equal("hi","hi"))
console.log(equal({},{}))
console.log(equal({a:1, b:2},{b:2, a:1}))
console.log(equal({a:1, b:2}, {c:3, b:2, a:1}))
console.log(equal({a:{}}, {a:{}}))
let emptyObject = {}
console.log(equal({a:emptyObject}, {a:emptyObject}))
*/

module.exports = { equal }