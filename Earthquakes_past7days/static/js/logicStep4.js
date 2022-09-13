// Logic Step 4

// Add console.log to check to see if our code is working.
console.log("working");


// We create the light view tile layer that will be the default background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};


// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();


// We define an oject that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};


// Create the map object with center, zoom and default layer.
let map = L.map("mapid", {
    center: [39.5, -98.5], 
    zoom: 3,
    layers: [streets]
});


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);



// Accessing all earthquakes from the past 7 days GeoJSON URL.
let earthquakeSevenDays = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius

function styleInfo(feature) {

    return {

        opacity: 1,

        fillOpacity: 1,

        fillColor: getColor(feature.properties.mag),

        color: "#000000",

        radius: getRadius(feature.properties.mag),

        stroke: true,

        weight: 0.5

    };

}

// This function determines the color of the circle based on the magnitude of the earthquake.

function getColor(magnitude) {

    if (magnitude > 5) {
        return "#ea2c2c";
    }

    if (magnitude > 4) {
        return "#ea822c";
    }

    if (magnitude > 3) {
        return "#ee9c00";
    }

    if (magnitude > 2) {
        return "#eecc00";
    }

    if (magnitude > 1) {
        return "#d4ee00";
    }

    return "#98ee00";

}


// This function determines the radius of the earthquake marker based on its magnitude.

// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.

function getRadius(magnitude) {

    if (magnitude === 0) {

        return 1;
    }

    return magnitude * 4;

}


// Grabbing our GeoJSON data.
d3.json(earthquakeSevenDays).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        
        // We turn each feature into a marker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,

        // We create a popup for each circleMarker to display the magnitude and
        // location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
            "Magnitude: " 
            + feature.properties.mag 
            + "<br>Location: " 
            + feature.properties.place);
        }
    }).addTo(earthquakes);


    // Then we add the earthquake layer to our map.
    earthquakes.addTo(map);
});


// Code from all previous logic.js from mapping modules

// Add console.log to check to see if our code is working.
//console.log("working");
//
//
//// We create the light view tile layer that will be the default background of our map.
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18,
//    accessToken: API_KEY
//});
//
//// We create the dark view tile layer that will be an option for our map.
//let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18,
//    accessToken: API_KEY
//});
//
//// Create a base layer that holds both maps.
//let baseMaps = {
//    "Streets": streets,
//    "Satellite Streets": satelliteStreets
//};
//
//// Create the map object with center, zoom and default layer on Toronto's neighborhoods
//let map = L.map("mapid", {
//    center: [43.7, -79.3], 
//    zoom: 11,
//    layers: [streets]
//});
//
//// Pass our map layers into our layers control and add the layers control to the map.
//L.control.layers(baseMaps).addTo(map);
//
//// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/HackUnit/Mapping_Earthquakes/main/torontoNeighborhoods.json";
//
//// Create a style for the lines.
//let myStyle = {
//    color: "blue",
//    weight: 1,
//    fill: true,
//    fillColor: "yellow"
//}
//
//// Grabbing our GeoJSON data.
//d3.json(torontoHoods).then(function(data) {
//    console.log(data);
//    // Creating a GeoJSON layer with the retrieved data.
//    L.geoJson(data, {
//        style: myStyle,
//        onEachFeature: function(feature, layer) {
//            layer.bindPopup(
//               "<h3> Neighborhood: "
//                + feature.properties.AREA_NAME 
//                + "</h3>",
//               {maxWidth: 500}
//            );
//        }
//    })
//.addTo(map);
//});


// Code from Mapping Linestrings
// Create a style for the lines.
//let myStyle = {
//    color: "#ffffa1",
//    weight: 2
//}

// Grabbing our GeoJSON data.
//d3.json(torontoData).then(function(data) {
//    console.log(data);
// 
//    // Creating a GeoJSON layer with the retrieved data.
//    L.geoJson(data, {
//        style: myStyle,        
//        onEachFeature: function(feature, layer) {
//            layer.bindPopup(
//                "<h3> Airline: " 
//                + feature.properties.airline 
//                + "</h3><hr><h3> Destination: "
//                + feature.properties.dst 
//                + "</h3>", 
//                {maxWidth: 500}
//            ); 
//        }
//    })
//.addTo(map);
//});

//    // Other map styles that can be used:
//    // styles/mapbox/streets-v11
//    // styles/mapbox/outdoors-v11
//    // styles/mapbox/light-v10
//    // styles/mapbox/dark-v10
//    // styles/mapbox/satellite-v9
//    // styles/mapbox/satellite-streets-v11

// Add GeoJSON data for San Francisco International Airport.

//let sanFranAirport = {
//
//    "type": "FeatureCollection",
//
//    "features": [
//        
//    {
//        "type": "Feature",
//
//        "properties": {
//            "id": "3469",
//            "name": "San Francisco International Airport",
//            "city": "San Francisco",
//            "country": "United States",
//            "faa": "SFO",
//            "icao": "KSFO",
//            "alt": "13",
//            "tz-offset": "-8",
//            "dst": "A",
//            "tz": "America/Los_Angeles"
//        },
//
//        "geometry": {
//            "type": "Point",
//            "coordinates": [-122.375, 37.61899948120117]
//        }
//    }]
//};
//
// Grabbing our GeoJSON data.

//L.geoJson(sanFranAirport, {
//
//    // onEachFeature function
//    onEachFeature: function(feature, layer) {
//
//        console.log(layer);
//        layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>" + "<hr>" + "<h3>" + "Airport name: " + feature.properties.name + "</h3>", {maxWidth: 500});
//    }
//
//    //pointToLayer function
//    // We turn each feature into a marker on the map.
//    //pointToLayer: function(feature, latlng) {
//    //
//    //    console.log(feature);
//    //
//    //    return L.marker(latlng)
//    //    
//    //    .bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//    //}
//
//
//}).addTo(map);



// For Mapping_Lines Module work

// Create the map object with a center and zoom level.
// This bit of code is nicknamed "setView() method" because the module is dumb and can't decide what it wants and the actual setView() sucks.
// Lame "setView() method code: let map = L.map('mapid').setView([36.1733, -120.1794], 7);
//
// Instantiate a map object with given div id "mapid", 
// and map state options set to center and zoom instead of using a restrictive setView() method
//
//let map = L.map("mapid", {
//    
//    center: [
//        // Map centered on SFO airport
//        37.6213, -122.3790
//    
//    ], 
//    // Map zoomed to show lines
//    zoom: 5
//    
//});
//
// Mapping lines code
// Coordinates for each point to be used in the line.
// LAX, SFO, SLC, and SEA airports as points
//let line = [
//
//    [33.9416, -118.4085],
//    [37.6213, -122.3790],
//    [40.7899, -111.9791],
//    [47.4502, -122.3088]
//];
//
//// Create a polyline using the line coordinates and make the line yellow.
//L.polyline(line, {
//
//    color: "yellow"
//}).addTo(map);

// Mapping lines code
// Coordinates for each point to be used in the line.
// SFO to JFK with stops at AUS, HOU and YYZ airports as points
//let line = [
//
//    [37.6213, -122.3790],
//    [30.1975, -97.6664],
//    [29.6459, -95.2769],
//    [43.6777, -79.6248],
//    [40.6413, -73.7781]
//];
//
//// Create a polyline using the line coordinates and make the line yellow.
//L.polyline(line, {
//
//    color: "blue",
//    dashArray: "6.5",
//    weight: 4,
//    opacity: 0.5
//}).addTo(map);

// Multiple markers code
// Get data from cities.js

//let cityData = cities;

// Loop through the cities array and create one marker for each city.

//cityData.forEach(function(city) {
//    console.log(city)
//    L.circleMarker(city.location, {
//        // Radius circle of population divided by 20,000 pixels
//        radius: city.population/200000,
//        // Circle marker stroke color of orange and lineweight of 4
//        color: "orange",
//        weight: 4
//    })
//    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//    .addTo(map);
//});

// Single marker code
// Add a marker to the map for Los Angeles, California.

//L.circleMarker([34.0522, -118.2437], {
//  radius: 300,
//  color: "black",
//  fillColor: '#ffffa1'
//}).addTo(map);
