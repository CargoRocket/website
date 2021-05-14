---
layout: map
title: CargoBikeIndex
subpage-title: Map
description: Wir bewerten die Lastenradfreundlichkeit der Straßen in Deutschland.
show-map: true
published: false
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
        width: 200px;
        position: absolute;
        top: 100px;
        left: 20px;
        z-index: 200;
        padding: 10px;
        border-radius: 10px;
    }
</style>
<div class="map-container">
    <div class="info_window">
    Der Index berechnet sich aus den Werten zur Straßenqualität und Barrieren. Er reicht von 0 - für Lastenräder nicht passierbar, bis 5 - optimale Bedingungen für Lastenräder. Informationen zum Vekehr sind im Index NICHT berücksichtigt, sondern werden hier nur zur Information angezeigt
    </div>
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

    map.on('load', function () {
        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'stuttgart_streets_vculijy', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
</script>