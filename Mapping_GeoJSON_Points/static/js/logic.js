// Add console.log to check to see if our code is working.

console.log("working");


// Create the map object with center at the San Francisco airport. 

let map = L.map("mapid", {
    
    center: [

        37.5, -122.5
    
    ], 

    zoom: 10
    
});

// Add GeoJSON data.

let sanFranAirport = {

    "type": "FeatureCollection",

    "features": [
        
    {
        "type": "Feature",

        "properties": {
            "id": "3469",
            "name": "San Francisco International Airport",
            "city": "San Francisco",
            "country": "United States",
            "faa": "SFO",
            "icao": "KSFO",
            "alt": "13",
            "tz-offset": "-8",
            "dst": "A",
            "tz": "America/Los_Angeles"
        },

        "geometry": {
            "type": "Point",
            "coordinates": [-122.375, 37.61899948120117]
        }
    }]
};

// Grabbing our GeoJSON data.

L.geoJson(sanFranAirport, {

    // onEachFeature function
    onEachFeature: function(feature, layer) {

        console.log(layer);
        layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>" + "<hr>" + "<h3>" + "Airport name: " + feature.properties.name + "</h3>", {maxWidth: 500});
    }

    //pointToLayer function
    // We turn each feature into a marker on the map.
    //pointToLayer: function(feature, latlng) {
    //
    //    console.log(feature);
    //
    //    return L.marker(latlng)
    //    
    //    .bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
    //}


}).addTo(map);



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


// We create the tile layer that will be the background of our map.

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//    // Other map styles that can be used instead:
//    // styles/mapbox/streets-v11
//    // styles/mapbox/outdoors-v11
//    // styles/mapbox/light-v10
//    // styles/mapbox/dark-v10
//    // styles/mapbox/satellite-v9
//    // styles/mapbox/satellite-streets-v11

// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);


