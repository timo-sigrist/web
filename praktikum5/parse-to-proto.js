function parseToProto(json, object) {
    const parsedJson = JSON.parse(json)

    Object.keys(parsedJson).forEach(function(key) {
        object[key] = parsedJson[key]
    })
    return object
}

/*
describe('Test', function() {    
    let proto

    beforeEach(function() {
        proto = new Object()
        proto = { category: "animal"}
    })
  
    it('should be able to play a Song', function() {
        let obj = parseToProto('{"type":"cat","name":"Mimi", "age":3}', proto)
        expect(obj.age).toEqual(3);
        expect(obj.category).toBePlaying("animal")
    })
})
*/

module.exports = { parseToProto }