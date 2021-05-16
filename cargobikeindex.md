---
layout: blank
title: CargoBikeIndex
subpage-title: CargoBikeIndex
subpage_link: "/cargobikeindex"
description: Wir bewerten die Lastenradfreundlichkeit der Straßen in Deutschland.
show-map: true
published: true
---

<div class="map-container">
    <div id="object_info_wrapper">
        <details>
            <summary class="roboto big">CargoBikeIndex Infos</summary>
            <p>Der Index berechnet sich aus den Werten zur Straßenqualität und Barrieren. Er reicht von 0 - für Lastenräder nicht passierbar, bis 5 - optimale Bedingungen für Lastenräder.</p>
        </details>
        <h2 class="roboto big">Wege-Informationen</h2>
        <div id="object_info" class="roboto">Klicke auf eine Straße, die Eigenschaften erscheinen hier!</div>
        <div id="city_list">
            <h2 class="roboto big">Städte</h2>
            <ul class="roboto">
                <li>Stuttgart <button onclick="fly('Stuttgart')">Zeige</button></li>
                <li>Augsburg <button onclick="fly('Augsburg')">Zeige</button></li>
                <li>Berlin <button onclick="fly('Berlin')">Zeige</button></li>
            </ul>
        </div>
    </div>
    <div id="object_info_mobile_wrapper">
        <div id="object_info_mobile" class="roboto">Klicke auf eine Straße, die Eigenschaften erscheinen hier!</div>
    </div>
    <div id="map"></div>
</div>
<script>
	mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk5NyIsImEiOiJ1bElfcS1rIn0.6kD_Z9ML35sB-N9XF-pQlQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/henri97/ckm8eucf25b6i17nw08qg8wsz',
        center: [9.1783, 48.7761],
        zoom: 13.2,
        hash: true
    });
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
    let cbi_layer_id= "cbi-standard"
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
            var features = map.queryRenderedFeatures(e.point, {layers: [cbi_layer_id]});
            // Limit the number of properties we're displaying for
            // legibility and performance
            var displayProperties = ['properties'];
            var displayFeatures = features.map(function (feat) {
            var displayFeat = {};
            displayProperties.forEach(function (prop) {
            displayFeat[prop] = feat[prop];
            });
                return displayFeat;
            });
            let map_element = displayFeatures[0].properties;
            let attributes_list = '<ul>';
            for(element in map_element){
                if (map_element[element] != undefined && map_element[element] != "")
                attributes_list += '<li>' + attributes_description_mapping[element] + ': ' + map_element[element]+'</li>'
            }
            if(map_element.length == 0) attributes_list = "Nichts ausgewählt"
            attributes_list += '</ul>';
            document.getElementById('object_info').innerHTML = attributes_list
            document.getElementById('object_info_mobile').innerHTML = "CargoBikeIndex: " + map_element['cbi'] + "/5"
        });
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mouseenter', cbi_layer_id, function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            let coordinates = e.features[0].geometry.coordinates[0];
            const street_name = e.features[0].properties.name
            let description = "";
            if(street_name){
                description = street_name + ": " + e.features[0].properties.cbi;}
            else {
                description = e.features[0].properties.label_sq + ": " + e.features[0].properties.cbi; }
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });
        map.on('mouseleave', cbi_layer_id, function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
    let map_element = document.querySelector('#map');
    function fly(city){
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
        }
        if (coordinates.length !== 0) map.flyTo({ center: coordinates, zoom: 12})
    }
</script>