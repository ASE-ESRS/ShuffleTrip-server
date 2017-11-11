// The LambdaLocationUpdateHandler is responsible for responding to requests from clients to
// update their current location entry in the database.
//
// The DynamoDB locations table can be viewed here:
// https://eu-west-2.console.aws.amazon.com/dynamodb/home?region=eu-west-2#tables:selected=locations
//
// This code must be copied over to the AWS Lambda Management Console here:
// https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/HandleLocationUpdate

var skyscanner = require("skyscannerjs");
const skyscannerApiKey = "INSERT SKYSCANNER API KEY HERE";
const skyscannerAPI = new skyscanner.API(skyscannerApiKey);

var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    let route = event.queryStringParameters.route;

	switch(route) {
		case "trips/shuffle":
			// Here we want to create a new trip and return it in JSON format
			// hopefully using the Skyscanner API. We want to return a flight,
			// and then look for hotels and things to do in that location.
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
