var obj = {"Los Angeles":"Los Angeles", "Virginia":"Virginia", "Baltimore":"Baltimore", "Boston":"Boston", "Philadelphia":"Philadelphia", "Seattle":"Seattle", "Houston":"Houston", "Miami":"Miami", "Tampa":"Tampa", "Atlanta":"Atlanta", "Cleveland":"Cleveland", "Indianapolis":"Indianapolis", "Geneva":"Geneva", "Zurich" : "Zurich"};

var body = document.body;
var textContent = body.textContent || body.innerText;

var arrayFound = {};

var allValues = Object.values(obj);
var allKeys = Object.keys(obj);


var localCity = "BCN";

for(var i=0;i<allValues.length;i++){
	if( textContent.indexOf(allValues[i]) >= 0){
  		arrayFound[allKeys[i]] = allValues[i];
	}
}

var x = Object.keys(arrayFound);


function codeAddress(allMyKeys) {

	for(var i=0;i<allMyKeys.length;i++) {

		var theId = "link_"+allMyKeys[i];
		if(document.getElementById(theId)) {
			document.getElementById(theId).addEventListener("click", function(){
    			getFlights("BCN","IAD");
			});
		}
	}
}


function getFlights(originCity, destinationCity) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('POST', 'https://stg.farelogix.com:443/xmlts/sandboxdm-wsdl', true);
	
	// build SOAP request
            var sr =
            	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tc="http://farelogix.com/flx/tc" xmlns:far="http://farelogix.com/flx/AirshoppingRQ">'+
    '<soapenv:Header>'+
        '<tc:TransactionControl>'+
            '<tc>'+
                '<iden u="Farelogix" p="TEMP02" pseudocity="AJI0" agt="xmlhack001" agtpwd="farelogix1" agtrole="Ticketing Agent" agy="00101496"/>'+
                '<agent user="xmlhack001"/>'+
                '<trace>AJI0_hack</trace>'+
                '<script engine="FLXDM" name="uad-dispatch.flxdm"/>'+
            '</tc>'+
        '</tc:TransactionControl>'+
    '</soapenv:Header>'+
    '<soapenv:Body>'+
        '<far:FlxTransaction>'+
            '<AirShoppingRQ Version="17.2" TransactionIdentifier="22efe3c31dde41179c6c0e29f76cffa0">'+
                '<PointOfSale>'+
                    '<Location>'+
                        '<CountryCode>US</CountryCode>'+
                        '<CityCode>MIA</CityCode>'+
                    '</Location>'+
                '</PointOfSale>'+
                '<Document>'+
                    '<ReferenceVersion>17.2</ReferenceVersion>'+
                '</Document>'+
                '<Party>'+
                    '<Sender>'+
                        '<TravelAgencySender>'+
                            '<Name>United Airlines</Name>'+
                            '<PseudoCity>AJJJ</PseudoCity>'+
                            '<AgencyID>00571476</AgencyID>'+
                            '<AgentUser>'+
                                '<Name>falmeida</Name>'+
                                '<AgentUserID>falmeida</AgentUserID>'+
                                '<UserRole>Ticketing Agent</UserRole>'+
                            '</AgentUser>'+
                        '</TravelAgencySender>'+
                    '</Sender>'+
                '</Party>'+
                '<CoreQuery>'+
                    '<OriginDestinations>'+
                        '<OriginDestination OriginDestinationKey="OD1">'+
                            '<Departure>'+
                                '<AirportCode>ORD</AirportCode>'+
                                '<Date>2018-09-12</Date>'+
                            '</Departure>'+
                            '<Arrival>'+
                                '<AirportCode>MIA</AirportCode>'+
                            '</Arrival>'+
                        '</OriginDestination>'+
                        '<OriginDestination OriginDestinationKey="OD2">'+
                            '<Departure>'+
                                '<AirportCode>MIA</AirportCode>'+
                                '<Date>2018-09-13</Date>'+
                            '</Departure>'+
                            '<Arrival>'+
                                '<AirportCode>ORD</AirportCode>'+
                            '</Arrival>'+
                        '</OriginDestination>'+
                    '</OriginDestinations>'+
                '</CoreQuery>'+
                '<Preference>'+
                    '<AirlinePreferences>'+
                        '<Airline>'+
                            '<AirlineID>UA</AirlineID>'+
                        '</Airline>'+
                        '<Airline>'+
                            '<AirlineID>LH</AirlineID>'+
                        '</Airline>'+
                    '</AirlinePreferences>'+
                   '<FlightPreferences>'+
                        '<Characteristic>'+
                            '<NonStopPreferences>Y</NonStopPreferences>'+
                        '</Characteristic>'+
                    '</FlightPreferences>'+
                    '<CabinPreferences>'+
                        '<CabinType>'+
                            '<Code>Y</Code>'+
                        '</CabinType>'+
                    '</CabinPreferences>'+
                '</Preference>'+
                '<DataLists>'+
                    '<PassengerList>'+
                        '<Passenger PassengerID="T1">'+
                            '<PTC>ADT</PTC>'+
                        '</Passenger>'+
                    '</PassengerList>'+
                '</DataLists>'+
            '</AirShoppingRQ>'+
        '</far:FlxTransaction>'+
    '</soapenv:Body>'+
'</soapenv:Envelope>';
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
			}
		}
	}
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.send(sr);
}




if( x.length > 0) {
	var layer = "<div id='myLifeDiv' style='background-color:#00826f; color: #ebeced; margin:"+
				" 0; position: fixed; top: 0em; padding: 10px; right: 0em; left: 0em;z-index:1000'>"+
				"Want to meet your friends in ";


	for (var key in arrayFound) {
    	layer += "<a href='file:///Users/vivianaranha/Documents/GitHub/hack-travel-2019/client/index.html?location="+key+"' style='color:#ebcdf2' id='link_"+key+"'>"+arrayFound[key]+"</a> ";
	}

	layer +=  "<img style='cursor: pointer' src=\"https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_960_720.png\" height='20' align='right' onclick='document.getElementById(\"myLifeDiv\").style.display=\"none\"'> </div>";


 //    var layer = '<div id="widget-holder"></div> <script data-lang="da" data-from="BCN" data-to="IAD" data-departure="2019-03-07" data-return="2019-02-21" data-passengers="2" data-width="100%" src="https://widget.kiwi.com/scripts/widget-search-iframe.js"></script>';
	document.body.innerHTML += layer;

	window.onload = codeAddress(allKeys);

}





//alert(arrayFound);



