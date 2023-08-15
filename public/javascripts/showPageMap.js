mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: JSON.parse(coordinates), // starting position [lng, lat]
    zoom: 9 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl())

new mapboxgl.Marker()
    .setLngLat(JSON.parse(coordinates))
    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${campTitle}</h3>`))
    .addTo(map);