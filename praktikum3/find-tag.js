const findTag = function (text) {
    if (typeof(text) !== "string" || text == null) return undefined
    let resultTag = ""
    let firstTag = false
    for (i = 0; i < text.length; i++) {
        if (text[i] == ">" && resultTag.length > 0) return resultTag
        if (firstTag) resultTag += text[i]
        if (firstTag === true && text[i] == "<" || text[i] == " " || !isNaN(text[i])) {
            resultTag = ""
            firstTag = false
        }
        if (text[i] == "<") firstTag = true
    }
    return undefined
}
/*
console.log(findTag("<header>Text</header"))
console.log(findTag("blabla <br> blabla"))
console.log(findTag("123245 </header> bla"))
console.log(findTag("123245 <hea der> bla"))
console.log(findTag("123245 <hea<der> bla"))
console.log(findTag("123245 <hea<der bla"))
*/
module.exports = { findTag }