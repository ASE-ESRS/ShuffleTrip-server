// The LambdaLocationUpdateHandler is responsible for responding to requests from clients to
// update their current location entry in the database.
//
// The DynamoDB locations table can be viewed here:
// https://eu-west-2.console.aws.amazon.com/dynamodb/home?region=eu-west-2#tables:selected=locations
//
// This code must be copied over to the AWS Lambda Management Console here:
// https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/HandleLocationUpdate

var skyscanner = require("skyscannerjs");
const skyscannerApiKey = "ha696723343441434034465280137182";
const skyscannerAPI = new skyscanner.API(skyscannerApiKey);
var airports = require('./airports.json');

exports.handler = (event, context, callback) => {
    let route = event.queryStringParameters.route;

	switch(route) {
		case "trips/shuffle":
			// Here we want to create a new trip and return it in JSON format
			// hopefully using the Skyscanner API. We want to return a flight,
			// and then look for hotels and things to do in that location.

			var randomAirport = airports[Math.floor(Math.random()*airports.length)];
			var airportCode = randomAirport["IataCode"];

			skyscannerAPI.flights.browse.routes({ 
				market : "UK",
				currency : "GBP",
				locale : "en-GB",
				originPlace : "LGW",
				destinationPlace : airportCode,
				outboundPartialDate : "2017-11-12",
				ip : "139.184.223.129"
			}).then((resp) => {
				const quotes = resp.data.Quotes;
				const dates = resp.data.Routes;

				var firstQuote = quotes[0];

				var price = firstQuote['MinPrice'];
				console.log(price);
				response({
					"price" : price,
					"airport_name" : randomAirport['Name'],
					"airport_code" : randomAirport['IataCode'],
					"country" : randomAirport['CountryId']
				});	
			}).catch((error) => {
				console.log(error);
				response({"error" : error});
			});
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
