const request = require('request');

exports.handler = (event, context, callback) => {
    let subject = event.Records[0].ses.mail.commonHeaders.subject.split(',');

    let data = {
        'name': subject[0],
        'height': subject[1],
        'credit_index': subject[2]
    };

    let options = {
        uri: 'http://swapi.dreamlabs.rocks/api/character/',
        method: 'POST',
        json: data
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            console.log(body);
        } else {
            console.log(error);
        }
    });

    callback(null, 'OK');
};
