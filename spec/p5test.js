const parseToProto = require('../../praktrkium5/pare');

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