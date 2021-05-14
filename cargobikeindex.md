---
layout: blank
title: CargoBikeIndex
subpage-title: Map
description: Wir bewerten die Lastenradfreundlichkeit der Straßen in Deutschland.
show-map: true
---

<style>
    .mapboxgl-popup {
        max-width: 400px;
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    }
    .map-container,
    #map {
        height: calc(100vh - 75px);
    }
    .info_window {
        background-color: white;
        width: 250px;
        position: absolute;
        top: 100px;
        left: 20px;
        z-index: 200;
        padding: 10px;
        border-radius: 10px;
    }
    #object_info {
        background-color: white;
        width: 300px;
        position: absolute;
        top: 100px;
        right: 20px;
        z-index: 200;
        padding: 10px;
        border-radius: 10px;
    }
    #object_info ul {
        list-style: none;
        padding: 0;
    }
</style>
<div class="map-container">
    <div class="info_window roboto">
    <h2 class="bebas">CargoBikeIndex</h2>
    Der Index berechnet sich aus den Werten zur Straßenqualität und Barrieren. Er reicht von 0 - für Lastenräder nicht passierbar, bis 5 - optimale Bedingungen für Lastenräder. Informationen zum Vekehr sind im Index NICHT berücksichtigt, sondern werden hier nur zur Information angezeigt
    </div>
    <div id="object_info">Klicke auf eine Straße, die Eigenschaften erscheinen hier!</div>
    <div id="map"></div>
</div>
<script>
	mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk5NyIsImEiOiJ1bElfcS1rIn0.6kD_Z9ML35sB-N9XF-pQlQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/henri97/ckm8eucf25b6i17nw08qg8wsz',
        center: [9.1783, 48.7761],
        zoom: 13.2
    });
    let cbi_layer_id= "cbi-standard"
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
                attributes_list += '<li>' + element + ': ' + map_element[element]+'</li>'
            }
            if(map_element.length == 0) attributes_list = "Nichts ausgewählt"
            attributes_list += '</ul>';
            document.getElementById('object_info').innerHTML = attributes_list
            console.warn(JSON.stringify(displayFeatures))
        });
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('mouseenter', cbi_layer_id, function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            let coordinates = e.features[0].geometry.coordinates[0];
            let description = e.features[0].properties.name;
            console.log(coordinates)
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });
        map.on('mouseleave', cbi_layer_id, function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
</script>