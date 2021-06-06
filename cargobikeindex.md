---
layout: blank
title: CargoBikeIndex
subpage-title: CargoBikeIndex
subpage_link: "/cargobikeindex"
description: Der CargoBikeIndex bewertet die Lastenradfreundlichkeit von Straßen & Wegen in Deutschland.
show-map: true
published: true
socialmedia-banner: "cargorocket_cargobikeindex_banner.png"
click-info: Klicke auf eine Straße, die Eigenschaften erscheinen hier!
description-cbi: Der Index berechnet sich aus den Werten zur Straßenqualität und Barrieren. Er reicht von (dunkel rot) 0 - für Lastenräder nicht passierbar, bis (dunkel grün) 5 - optimale Bedingungen für Lastenräder. Mehr Infos zur Bewertung gibt's
city-list:
    - Stuttgart
    - Augsburg
    - Berlin
    - Freiburg i.B.
    - Leipzig
    - Köln
---

<div class="map-container">
    <div id="object_info_wrapper">
        <details>
            <summary class="roboto big">CargoBikeIndex Infos</summary>
            <p>{{ page.description-cbi }}<a href="2021/05/16/cargobikeindex.html"> im Blogpost</a></p>
        </details>
        <div class="map_legend_wrapper flex">
            <span>0</span>
            <span id="map_legend"></span>
            <span>5</span>
        </div>
        <div class="c">
            <button class="button small secondary" onclick="toggleMapStyle()">Farbschema wechseln &#128259;</button>
        </div>
        <div id="city_list">
        <h2 class="roboto big">Städte (Auswahl)</h2>
        <select id="cities">
        {% for city in page.city-list %}
            <option value="{{ city }}">{{ city }}</option>
        {% endfor %}
        </select>
        <button class="button small secondary" onclick="fly(document.querySelector('#cities').value)">Flieg dorthin &#128640;</button>
        </div>
        <h2 class="roboto big">Wege-Informationen</h2>
        <div id="object_info" class="roboto">{{ page.click-info }}</div>
    </div>
    <div id="object_info_mobile_wrapper">
        <div id="object_info_mobile" class="roboto">{{ page.click-info }}</div>
    </div>
    <div id="city_list_mobile_wrapper">
        <div id="city_list_mobile" class="roboto">
        {% for city in page.city-list %}
            <button class="button small secondary" onclick="fly('{{ city }}')">{{ city }} &#128640;</button>
        {% endfor %}
        </div>
    </div>
    <div id="map"></div>
</div>
<script src="assets/js/cargobikeindex.js"></script>
