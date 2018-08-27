import View from 'ol/View';
import Map from 'ol/Map';
/* New imports */
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

window.onload = () => {
    const target = document.getElementById('map')

    new Map({
        target,
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
        layers: [
            // New TileLayer with OpenStreetMap as a source
            new TileLayer({
                source: new OSM(),
            })
        ]
    });
}
