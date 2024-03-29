---
layout: post
title: Datenquellen
author: Alexandra Kapp
excerpt: Phantastische Daten und wo sie zu finden sind.
description: Phantastische Daten und wo sie zu finden sind.
---

Während die Auswertung unserer Umfrage noch läuft, beschäftigen wir uns parallel mit der nächsten Frage: 
**Was gibt es für Datenquellen?** 

Ein Routing zur Umfahrung von Engstellen, Stau und unebenem Belag ist nur möglich, wenn auch Informationen darüber vorhanden sind. In diesem Blog Post führen wir alle Datenquellen auf, die wir hierfür gefunden haben und potenziell nutzen werden. 
Ihr kennt noch weitere oder bessere offene Daten? Wir freuen uns über Tipps!

Als Hauptdatenquelle verwenden wir [OpenStreetMap (OSM)](https://www.openstreetmap.de/). Im folgenden gehen wir auf relevante [Tags](https://wiki.openstreetmap.org/wiki/Tags) für die jeweiligen Themen ein, sowie mögliche zusätzliche Datenquellen.

## Radwege

Zuerst die grundlegendste Information: auf welchen Straßen gibt es Radwege, Radfahrstreifen oder Schutzstreifen und auf welchen Straßen wird sich die Fahrbahn mit dem Autoverkehr oder dem Fußverkehr geteilt? Diese Information ist gut in OSM erfasst und kann [sehr spezifisch getaggt](https://wiki.openstreetmap.org/wiki/DE:Key:cycleway) werden.

**Radweg-Breite**

Die Radweg-Breite kann über den Tag [`width`](https://wiki.openstreetmap.org/wiki/Key:width) bzw. über Sub-Keys wie bspw. `cycleway:left:width` theoretisch ebenfalls spezifiziert werden, jedoch ist dieser Tag nur spärlich vergeben. Diese Information ist jedoch notwendig, um Radwege die zu schmal für breite Lastenräder sind zu identifizieren. 
Der [RadNETZ BW Datensatz](https://www.mobidata-bw.de/dataset/radnetz-bw) von MobiData BW liefert hierzu detaillierte Informationen, jedoch handelt es sich hier um [Landesradfernwege zwischen Gemeinden](https://www.aktivmobil-bw.de/radverkehr/radnetz/das-radnetz/) und einzelne Radwege innerhalb einer Stadt sind nicht verzeichnet.

![RadNETZ BW in Baden-Württemberg und Zoom auf den Ausschnitt für Stuttgart.](/assets/images/RadNETZ.jpg)

*RadNETZ BW in Baden-Württemberg und Zoom auf den Ausschnitt für Stuttgart.*

## Ebenheit der Fahrbahn

Mit dem Fahrrad über Wurzeln und Kopfsteinpflaster zu fahren ist unangenehm. Wer schon einmal voll bepackt mit dem Wocheneinkauf über holprige Straßen gefahren ist weiß, dass dies mit schwerer Last nochmal problematischer ist und wesentlich langsamer gefahren werden muss.

OSM bietet auch hierfür Daten: Die Oberflächenbeschaffenheit - Asphalt oder Kopfsteinplaster? - wird mit [`surface`](https://wiki.openstreetmap.org/wiki/DE:Key:surface) getaggt und gut 40% der baden-württembergischen Straßen[^1] haben hierfür einen Eintrag. Doch auch ein asphaltierter Radweg kann durch Wurzeln und Schlaglöcher uneben sein. Dies wird über den Tag [`smoothness`](https://wiki.openstreetmap.org/wiki/DE:Key:smoothness) erfasst, der ist jedoch schon deutlich seltener    vergeben - für nur 5% der baden-württembergischen Straßen.

Eine zusätzliche Datenquelle stellt hier [Mapillary](https://www.mapillary.com/) dar: Eine Plattform über die Straßenbilder (ähnlich wie Google Street View) durch einen Crowd-Sourcing Ansatz gesammelt und zur Verfügung gestellt werden. Auf diesen Bildern lässt sich der Zustand der Straße erkennen. Dies könnte nun über einen Bilderkennungsalgorithmus automatisiert werden. Das ist kein triviales Problem, daher freuen wir uns, dass sich ein Projekt-Team von [CorrelAid](https://correlaid.org) diesem Thema in Kooperation mit uns in den kommenden Monaten annehmen wird.  

![MapilScreenshot der Mapillary Plattform](/assets/images/mapillary_screenshot.jpg)

*Screenshot der Mapillary Plattform.*


## Barrieren

Poller verhindern die Durchfahrt von Kraftfahrzeugen, zum Beispiel in Fußgängerzonen. Umlauf- oder Drängelgitter zwingen Fahrradfahrende abzubremsen, beispielweise an Parkeingängen oder bei Gleisübergängen. Beide Arten der Barrieren sollten für Fahrradverkehr die Durchfahrt ermöglichen. Lastenräder sind zum Teil jedoch zu breit und können hier nur noch sehr schwer oder gar nicht mehr passieren.
In [OSM sind Barrieren](https://wiki.openstreetmap.org/wiki/DE:Key:barrier) sehr gut verzeichnet. Es wird nach `bollard` (Poller), `cycle_barrier` (Umlaufgitter) und einigen weiteren Barrierearten unterschieden. Neben der Art der Barriere kann zusätzlich die maximale Breite `width` oder `maxwidth:physical` getaggt werden, diese Information ist jedoch leider nur für ca. 1% der Barrieren in Baden-Württemberg vorhanden.

## Autoverkehr

Ist keine Radinfrastruktur vorhanden oder sind Radwege zu schmal für Lastenräder muss auf die Straße ausgewichen werden. Staut sich allerdings der Autoverkehr, verzögert sich auch die Fahrt für Lastenräder, da diese Autos nicht so einfach überholen können wie reguläre Fahrräder. Damit wird ein wichtiger Geschwindigkeitsvorteil gegenüber regulärem Lieferverkehr verspielt. Somit sind auch Daten zum Stau des Autoverkehrs relevant für das Lastenrad-Routing.
Mit der [HERE Traffic Flow API](https://developer.here.com/documentation/traffic/dev_guide/topics_v6.1/example-flow.html) lassen sich real-time Stau Daten abfragen. 
Alternativ gibt es auch eine [API von TomTom](https://developer.here.com/documentation/traffic/dev_guide/topics_v6.1/example-flow.html).

## Fußgängerverkehr

Fußgängerzonen sind über das [Taggingschema](https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren) `highway=pedestrian` mit `bicycle=yes` und geteilte Geh- und Radwege mit `segregated=no` verzeichnet. 
Genaue Daten, wann die Fußgängerzonen mit vielen Menschen gefüllt sind, sind schwer zu bekommen. Hier könnte mit Heuristiken gearbeitet werden: [morgens sind weniger Menschen einkaufen, nachmittags füllen sich die Läden und damit die Straßen](https://de.statista.com/infografik/7503/bestellzeiten-handel-e-commerce/).

Eine Zusätzliche Information können hier Uhrzeiten und Orte von Wochenmärkten sein: der Stuttgarter Marktplatz lässt sich normalerweise entspannt mit dem Lastenrad überqueren, jedoch nicht dienstags, donnerstags und samstags zu Marktzeiten. Hierzu gibt es leider keine guten maschinenlesbaren, offenen Daten. Das Open Data Projekt ["Wo ist Markt?"](https://wo-ist-markt.de/#stuttgart) könnte hierfür eine guter Startpunkt sein, da hier für viele Städte die Daten bereits gesammelt sind.

## Steigung

Steigungen sind für Lastentransporte von nicht unerheblicher Wichtigkeit. Jenachdem welche Last transportiert werden soll, kann hierdurch bspw. die Geschwindigkeit stark verringert werden oder die Batterie-Ladung schwindet bei Pedelecs/E-Bikes schneller. Auch wenn durch elektrifizierte Lastenräder Steigungen besser überwunden werden können, ist es von Vorteile weniger steile Abschnitte zu wählen oder Steigungen gänzlich zu vermeiden. Auch wenn OpenStreetMap mit [`incline`](https://wiki.openstreetmap.org/wiki/DE:Key:incline) einen Tag anbietet, ist dieser unbrauchbar, weil dieser nicht ausreichend gemappt ist. Stattdessen bietet es sich an global verfügbare Satelliten Höhenmodelle zu verwenden. Hier wird häufig das [SRTM](https://de.wikipedia.org/wiki/SRTM-Daten) Höhenmodell verwendet, dessen Version 3 eine Auflösung von einer Bogensekunde, also etwa 30 Metern für die ganze Welt bereitstellt. Dieses Modell kann für (Vektor-)Karten als auch für Routing verwendet werden.

## Bordsteine

Nicht abgesenkte Bordsteine können je nach Lastenradmodell ein unangenehmes Hindernis darstellen. Mit odem [OSM Tag `kerb`](https://wiki.openstreetmap.org/wiki/Key:kerb) kann dies über den Wert `raised` oder `lowered` abgebildet werden, jedoch sind auch hier die Tags nur kaum gesetzt.

## Fußnoten
[^1]: Hierfür haben relevante OSM Tags in Baden-Württemberg analysiert. [Hier kann die Analyse](https://cargorocket.github.io/OsmAnalysis/docs/OSM_Analysis_BW.html) bzw. [hier das zugrundeliegende R Markdown File](https://github.com/CargoRocket/OsmAnalysis/blob/main/R/OSM_Analysis_BW.Rmd) eingesehen werden.
