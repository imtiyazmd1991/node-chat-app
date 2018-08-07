var moment = require('moment');

var date = moment();

var generateMessage = (from , text)=>{
    return {
        from,
        text,
        createdAt: date.valueOf()
    };
};

var getLocationMessage = (latitude, longitude)=>{
    const BaseURL = "https://www.google.com/maps?q=";
    // 51.03841,-114.01679
    var retObj = {
        from: "Admin",
        url: `${BaseURL}${latitude},${longitude}`,
        createdAt: date.valueOf()
    };
    return retObj;
};

module.exports = { generateMessage, getLocationMessage};