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
var prices = require('./prices.json');


exports.handler = (event, context, callback) => {
    let route = event.queryStringParameters.route;

	switch(route) {
		  case "trips/shuffle":
			// Here we want to create a new trip and return it in JSON format
			// hopefully using the Skyscanner API. We want to return a flight,
			// and then look for hotels and things to do in that location.

      var routes = prices["Routes"];
      var quotes = prices["Quotes"];
      var places = prices["Places"];
      var carriers = prices["Carriers"];
      var currencies = prices["Currencies"];

      console.log("The number of routes found is "+str(routes.length));
      var randJourney = routes[Math.floor(Math.random()*routes.length)]; // may not work
      var originId = randJourney["OriginId"];
      var destId = randJourney["DestinationId"];
      var quoteId0 = randJourney["QuoteId"][0];

      console.log(quotes);
      var minCost = quotes[quoteId0]["MinPrice"];
      var outbound = quotes["OutboundLeg"]["DestinationId"];
      var inbound = quote["InboundLeg"]["DestinationId"];

      var outboundName;
      var inboundName;

      console.log(places);
      for (i = 0; i < places.length; i++) {
        if (places[i]["PlaceId"] == outbound) {
          outboundName = places[i]["Name"];
        }
        if (places[i]["PlaceId"] == inbound) {
          inboundName = places[i]["Name"];
        }

      }

      console.log("outbound name -  " + outboundName)
      console.log("inbound name  -  " + inboundName)
      //
			// var randomAirport = airports["Everything"][Math.floor(Math.random()*airports["Everything"].length)];
      // var airportCode = randomAirport["Id"];
      //
			// var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
			// var day = currentDate.getDate() + 1;
			// var month = currentDate.getMonth();
			// var year = currentDate.getFullYear();
			// var tomorrow = year+"-"+month+"-"+year;

			// skyscannerAPI.flights.browse.routes({
			// 	market : "UK",
			// 	currency : "GBP",
			// 	locale : "en-GB",
			// 	originPlace : "LGW",
			// 	destinationPlace : airportCode,
			// 	outboundPartialDate : tomorrow,
			// 	ip : "139.184.223.129"
			// }).then((resp) => {
			// 	const quotes = resp.data.Quotes;
			// 	const dates = resp.data.Routes;

				// var firstQuote = quotes[0];
        //
				// var price = firstQuote['MinPrice'];
				// console.log(price);
				response({

          // "country_name" : randomAirpot['CountryName'], // David Add in (might break)
					// "airport_name" : randomAirport['Name'],
          // "airport_city" : randomAirpot['City'],
					// "airport_code" : randomAirport['Id'],
					// "country" : randomAirport['CountryId'],
					// "airport_location" : random
          console.log('whoppeee')
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
