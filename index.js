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
var airports = require('airports');

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
		case "trips/shuffle":
			response(random_airport());
			break;
		default:
			response({
				"status" : "error",
				"message" : "Invalid request received by client"
			});
			break;
	}

	function response(json) {
		callback(null, {
			"statusCode" : 200,
			"headers" : {"Content-Type" : "application/json"},
			"body" : JSON.stringify(json)
		});
	}
};

function random_airport() {
	var keys = Object.keys(airports);
	var random_key = keys[Math.floor(Math.random() * keys)];
	return airports[random_key];
}
