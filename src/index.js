import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import { fromLonLat } from 'ol/proj'

/* [longitude, latitude] */
const visitedPlaces = [
    [-0.118092, 51.509865], // London, United Kingdom
    [-8.61099, 41.14961], // Porto, Portugal
    [-73.935242, 40.730610], // New York, USA
    [37.618423, 55.751244], // Moscow, Russia
]

window.onload = () => {
    const target = document.getElementById('map')

    // countriesSource is a variable holding the vector source with countries from countries.geojson
    const countriesSource = new VectorSource({
        url: 'https://raw.githubusercontent.com/bernardobelchior/openlayers-scratch-map-tutorial/start/countries.geojson',
        format: new GeoJSON(),
    })

    new Map({
        target,
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                // Old instantiation moved to countriesSource
                source: countriesSource,
                style: new Style({
                    fill: new Fill({
                        color: '#D4AF37',
                    })
                })
            })
        ]
    })

    // Wait for source to render
    countriesSource.once('addfeature', () => {
        // For each visited place
        visitedPlaces.forEach(place => {
            // Obtain map coordinates from longitude and latitude
            const coordinate = fromLonLat(place)

            // For each feature at coordinate, remove it from the source
            // Because OpenLayers observes for changes, this will visually delete the countries from the map.
            countriesSource.getFeaturesAtCoordinate(coordinate).forEach(f => countriesSource.removeFeature(f))
        })
    })
}
