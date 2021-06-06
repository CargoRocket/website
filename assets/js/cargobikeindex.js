var map_style_blue = false;
var cbi_layer_ids = ['cbi-north', 'cbi-south', 'cbi-westphalia'];
var cbi_blue_layer_ids = ['cbi-north-blue', 'cbi-westphalia-blue', 'cbi-south-blue']
maplibregl.accessToken = 'pk.eyJ1IjoiaGVucmk5NyIsImEiOiJ1bElfcS1rIn0.6kD_Z9ML35sB-N9XF-pQlQ';
var map = new maplibregl.Map({
    container: 'map',
    style: 'mapbox://styles/henri97/ckm8eucf25b6i17nw08qg8wsz',
    center: [10.5, 51],
    zoom: 5.5,
    hash: true
});
let nav = new maplibregl.NavigationControl();
map.addControl(nav, 'top-right');
const attributes_description_mapping = {
    "car_traffic": "Autoverkehrs",
    "cbi": "CargoBikeIndex",
    "cbindex_cycleways": "CBI Radweg",
    "cbi_sq": "Straßenqualitäts-Index",
    "cbindex_surface": "CBI Straßenoberfläche",
    "cbi_b": "Barriere-Index",
    "label_sq": "Wegeart",
    "label_b": "Barriere-Art",
    "maxspeed": "Höchstgeschwindigkeit",
    "name": "Straßenname",
    "osm_id": "OpenStreetMap ID",
    "surface_combined":
        "Straßenoberfläche Gemeinsam",
    "dismount_necessary": "Absteigen notwendig",
    "min_maxwidth": "Maximal mögliche Breite",
    "pedestrian_traffic": "Fußverkehrsfaktor",
    "segregated": "Getrennter Fuß-/Radweg",
    "smoothness_combined": "Straßenoberfläche gemeinsam",
    "cycleway_combined": "Radweg kombiniert",
    "cycleway_width_combined": "Radwegsbreite",
    "cycleway_oneway_combined": "???"
}
map.on('load', function () {
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: cbi_layer_ids });
        // Limit the number of properties we're displaying for
        // legibility and performance
        const displayProperties = ['properties'];
        const displayFeatures = features.map(function (feat) {
            let displayFeat = {};
            displayProperties.forEach(function (prop) {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });
        let map_element = displayFeatures[0].properties;
        let attributes_list = '<ul>';
        for (element in map_element) {
            if (map_element[element] != undefined && map_element[element] != "")
                attributes_list += '<li>' + attributes_description_mapping[element] + ': ' + map_element[element] + '</li>'
        }
        if (map_element.length == 0) attributes_list = "Nichts ausgewählt"
        attributes_list += '</ul>';
        document.getElementById('object_info').innerHTML = attributes_list
        document.getElementById('object_info_mobile').innerHTML = "CargoBikeIndex: " + map_element['cbi'] + "/5"
    });
    var popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    function show_popup(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        let coordinates = e.features[0].geometry.coordinates[0];
        const street_name = e.features[0].properties.name
        let description = "";
        if (street_name) {
            description = street_name + ": " + e.features[0].properties.cbi;
        }
        else {
            description = e.features[0].properties.label_sq + ": " + e.features[0].properties.cbi;
        }
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    }
    function hide_popup() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    }
    for (layer of cbi_layer_ids) {
        map.on('mouseenter', layer, show_popup);
        map.on('mouseleave', layer, hide_popup);
    }
});
let map_element = document.querySelector('#map');
function fly(city) {
    let coordinates = []
    switch (city) {
        case 'Stuttgart':
            coordinates = [9.1783, 48.7761]
            break;
        case 'Augsburg':
            coordinates = [10.89475, 48.36541]
            break;
        case 'Berlin':
            coordinates = [13.3796, 52.5161]
            break;
        case 'Freiburg i.B.':
            coordinates = [7.8554, 47.993]
            break;
        case 'Leipzig':
            coordinates = [12.386, 51.335]
            break;
        case 'Köln':
            coordinates = [6.935, 50.95]
            break;
    }
    if (coordinates.length !== 0) map.flyTo({ center: coordinates, zoom: 12 })
}
function toggleMapStyle() {
    map_style_blue = !map_style_blue;
    if (map_style_blue) {
        for (const [index, layer] of cbi_blue_layer_ids.entries()) {
            map.setLayoutProperty(
                layer,
                'visibility',
                'visible'
            );
            map.setLayoutProperty(
                cbi_layer_ids[index],
                'visibility',
                'none'
            );
            console.warn(cbi_layer_ids[index]);
        }
    } else {
        for (const [index, layer] of cbi_layer_ids.entries()) {
            map.setLayoutProperty(
                layer,
                'visibility',
                'visible'
            );
            map.setLayoutProperty(
                cbi_blue_layer_ids[index],
                'visibility',
                'none'
            );
            console.warn(cbi_blue_layer_ids[index])
        }
    }
    let map_legend = document.getElementById('map_legend'). classList;
    if (map_legend.contains('blue')){
        map_legend.remove('blue');
    } else {
        map_legend.add('blue');
    }
}
