integrate third party api in airbnb clone...
mapbox for map
----------
Key concepts

Mapbox GL
The "GL" in Mapbox GL JS refers to Mapbox GL, a graphics library that renders 2D and 3D Mapbox maps as dynamic
visual graphics with OpenGL in any compatible web browser, without using additional plugins.

Client-side rendering
Mapbox GL JS relies on client-side rendering. Mapbox GL JS maps are dynamically rendered by combining vector tiles
with style rules in the browser rather than on a server, which makes it possible to change the maps's style and
displayed data in response to user interaction.

The Map class
The mapboxg1.Map class is the basis of every Mapbox GL JS project. The example code in this section demonstrates the
minimum you need to add a map to your page:

mapboxgl.accessToken = 'pk.ey01Ijoibm10aGluMDYxIiwiYSI6ImNtcDg@ZTAwbTFkN3EycXF6djVoaDhxZnQifQ.g_F6tvmWZe8XRFzsebRd-g'
const map = new mapboxg1.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [-74.5, 40], // starting position [Lng, Lat]
zoom: 9 // starting zoom

-----------------
install npm mapbox sdk
Geocoding

Geocoding is the process of converting addresses (like a street address) into geographic coordinates (like
latitude and longitude), which you can use to place markers on a map, or position the map.

mapbox/mapbox-
sdk-js
A JavaScript client to Maphox tervices, tupporting
Node, browsers, and Roact Native

& 59

GitHub
GitHub - mapbox/mapbox-sdk-js: A JavaScript client to Mapbox servi ...
A JavaScript client to Mapbox services, supporting Node, browsers, and React
Native - mapbox/mapbox-sdk-js

¥ 193

C

mapbox/mapbox-
sdk-js
A JavaSeript client to Mapbox services, supporting
Nodo, browsers, and Roact Native

8o 59

GitHub
mapbox-sdk-js/docs/services.md at main . mapbox/mapbox-sdk-js
A JavaScript client to Mapbox services, supporting Node, browsers, and React
Native - mapbox/mapbox-sdk-js

4 2Bk

s 763

y 193

----------
 go to github /mapboc/geocoding for api