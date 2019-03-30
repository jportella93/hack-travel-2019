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

}





//alert(arrayFound);



