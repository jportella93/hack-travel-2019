const axios = require('axios');
const apiKey = process.env.API_KEY;

function getFlightsForOneOrigin({flyFrom, dateFrom, dateTo}) {
  return new Promise((resolve, reject) => {
    axios.get(`https://kiwicom-prod.apigee.net/v2/search?flyFrom=${flyFrom}&dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      headers: {
        apiKey,
      },
    })
      .then(response => {
        const parsedData = []
        response.data.data.forEach(flight => {
          const { cityTo, flyTo, cityFrom, flyFrom, price, utc_arrival: UTCArrival, utc_departure: UTCDeparture,
          route, deep_link: deepLink, local_departure: localDeparture, local_arrival: localArrival } = flight;

          parsedData.push({
            price,
            cityFrom,
            cityTo,
            flyFrom,
            localDeparture,
            UTCDeparture,
            flyTo,
            localArrival,
            UTCArrival,
            deepLink
          })
          if (route.length > 1) parsedData[route] = route;
        });

        resolve(parsedData)
      })
  })
}

function groupFlights(origins){
  const commonFlights = {};
  origins.forEach(flights => flights.forEach(flight => {
    if (flight.cityTo in commonFlights) {
      commonFlights[flight.cityTo].push(flight)
    } else {
      commonFlights[flight.cityTo] = [flight]
    }
  }))
  return commonFlights;
}

function filterFlightsWithoutAllOrigins(groupedFlights, origins){
  const copyOfGroupedFlights = {...groupedFlights};
  for (let destination in copyOfGroupedFlights) {
    if (!origins.every(origin => copyOfGroupedFlights[destination].some(flight => flight.flyFrom === origin.flyFrom))) {
      delete copyOfGroupedFlights[destination];
    }
  }
  return copyOfGroupedFlights
}

module.exports.getFlights = async (dateFrom, dateTo, origins) => {
  const formattedOrigins = [];
  origins.forEach(origin => formattedOrigins.push({
    flyFrom: origin,
    dateFrom,
    dateTo,
    })
  )

  const parsedFlights = await Promise.all(formattedOrigins.map(origin => getFlightsForOneOrigin(origin)))

  const flightsGroupedByDestination = groupFlights(parsedFlights)

  const destinationsWithAllOrigins = filterFlightsWithoutAllOrigins(flightsGroupedByDestination, formattedOrigins)

	return destinationsWithAllOrigins;
}
