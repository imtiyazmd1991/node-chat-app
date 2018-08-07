var expect = require('expect');
var {generateMessage, getLocationMessage} = require('./message');
describe('Generate message', ()=>{
    it('has to generate the text message', ()=>{
        var from = 'Imt';
        var text = 'it created test text';
        var generatedMessage = generateMessage(from, text);
        expect(generatedMessage.createdAt).toBeA('number');
        expect(generatedMessage).toInclude({from, text});
    });
});     

describe('Generate location message', ()=>{
    it('has to generate current location message', ()=>{
        var from = "Admin";
        var latitude = "1";
        var longitude = "2";
        var geolocationurl = getLocationMessage( latitude, longitude);
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        expect(geolocationurl).toBeA('object').toInclude({from,url});
    });
});