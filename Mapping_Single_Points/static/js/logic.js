// Add console.log to check to see if our code is working.

console.log("working");

// Create the map object with a center and zoom level.

let map = L.map("mapid", {
    
    center: [
        // Coords of Los Angeles, California
        34.0522, -118.2437
    
    ], 
    // Zoom into downtown LA
    zoom: 14
    
});

// Add a marker to the map for Los Angeles, California.

L.circleMarker([34.0522, -118.2437], {
  radius: 300,
  color: "black",
  fillColor: '#ffffa1'
}).addTo(map);


// We create the tile layer that will be the background of our map.

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY

    //id: 'mapbox/streets-v11',

    // Other map styles that can be used instead:
    // styles/mapbox/streets-v11
    // styles/mapbox/outdoors-v11
    // styles/mapbox/light-v10
    // styles/mapbox/dark-v10
    // styles/mapbox/satellite-v9
    // styles/mapbox/satellite-streets-v11

    //tileSize: 512,

    //zoomOffset: -1
});

// Then we add our 'graymap' tile layer to the map.

streets.addTo(map);


