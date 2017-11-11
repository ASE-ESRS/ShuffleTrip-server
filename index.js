// The LambdaLocationUpdateHandler is responsible for responding to requests from clients to
// update their current location entry in the database.
//
// The DynamoDB locations table can be viewed here:
// https://eu-west-2.console.aws.amazon.com/dynamodb/home?region=eu-west-2#tables:selected=locations
//
// This code must be copied over to the AWS Lambda Management Console here:
// https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/HandleLocationUpdate

var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

var accountSid = 'AC6663e90981bca05810e505d169dacc6f';
var authToken = '352933c45dfd2a86cb42689148cbaf26';

var client = require('twilio')(accountSid, authToken);
// This function is called in response to a request from a client.
//
// The `event` parameter holds information about the request, including the parameters.
// The following parameters are expected in the request:
//  - `userId` a unique identifier (e.g. email address) for this device (used as DB primary key).
//  - `latitude` the current latitude of the user (expected in ISO 6709 format - https://en.wikipedia.org/wiki/ISO_6709).
//  - `longitude` the current longitude of the user (expected in ISO 6709 format.)

// To print a log in the console use -> console.log('value1 =', event.key1);

exports.handler = (event, context, callback) => {
    let route = event.queryStringParameters.route;
	
	switch(route) {
		case "authenticate":
			let phoneNo = event.queryStringParameters.phoneNo;
			response({
				"status" : "success",
				"phone" : phoneNo	
			}, callback);
			// authenticate(event.queryStringParameters.phoneNo);
			break;
		default:
			response({
				"status" : "error",
				"message" : "Invalid request received by client"
			}, callback);
			break;
	}

    function authenticate(phoneNo) {
        client.messages.create({
            to: phoneNo,
            from: "+441273917430",
            body: "Welcome to ShuffleTrip!"
			}).then(sms => {response({
				"message" : sms.sid
			}, callback)});
    }

};

function response(json, callback) {
	callback(null, {
		"statusCode" : 200,
		"headers" : {"Content-Type" : "application/json"},
		"body" : JSON.stringify(json)
	});
}
