---
layout: post
title: CargoRocket Mapathon Anleitung
author: Henri Chilla
excerpt: Eine Anleitung zum erfolgreichen Mappen für den CargoRocket Mapathon.
description: Tutorial zum CargoRocket Mapathon
---

Um an unserem Mapathon teilzunehmen, ist nicht viel notwendig! Hier gehen wir kurz darauf ein, wie an dem Datensammeln mitgewirkt werden kann.

## OpenStreetMap
Für einen guten Index und ein gutes Routing sind gute Daten notwendig. Hierfür beziehen wir unsere Daten von [OpenStreetMap](https://www.openstreetmap.org) (OSM). An diesem Open-Source Projekt kann sich nach dem Wikipedia-Prinzip jede Person beteiligen und beliebige Daten eintragen. Dementsprechend ist es möglich, wichtige Daten für Lastenräder zu erfassen. Diese nützen dann aber auch allen anderen Nutzer:innen, die auf die Daten zugreifen, bspw. auch Rollstuhlfahrenden.

## Einführung OSM
*Wenn du bereits bei OSM aktiv bist, kannst du diesen Abschnitt vermutlich überspringen.*
Für das Eintragen der Daten wird zunächst ein OSM-Nutzerkonto benötigt, welcher [hier](https://www.openstreetmap.org/user/new) erstellt werden kann. Für das Bearbeiten existieren verschiedenste Editoren. Für den Einstieg sind folgende am besten geeignet: [ID-Editor](https://learnosm.org/de/beginner/id-editor/) und [StreetComplete](https://play.google.com/store/apps/details?id=de.westnordost.streetcomplete). Für unterwegs auf dem Smartphone existieren auch [Vespucci](https://play.google.com/store/apps/details?id=de.blau.android&hl=de&gl=US) (Android) und [Go Map!!](https://apps.apple.com/de/app/go-map/id592990211) (iOS) um eine Auswahl zu erwähnen.

Eine allgemeine Einführung gibt es bei [LearnOSM](https://learnosm.org/de/), denn dies soll keine Anleitung für OSM sein.

## Tags
Wir haben verschiedene Faktoren identifiziert, welche wichtig für Lastenrad-GIS-Applikationen sind. Daraus haben wir dann die entsprechenden OSM-Tags abgeleitet. Für unsere Auswertungen verwenden wir folgende generellen Tags:

* Radwege
  *  [`surface=*`](https://wiki.openstreetmap.org/wiki/DE:Key:surface)
  *  [`smoothness=*`](https://wiki.openstreetmap.org/wiki/DE:Key:smoothness)
  *  [`width=*`](https://wiki.openstreetmap.org/wiki/DE:Key:width)
*  Poller
   *  [`maxwidth:physical=*`](https://wiki.openstreetmap.org/wiki/DE:Key:maxwidth:physical)

> **Vorsicht**: Es gibt allerdings viele verschiedene Möglichkeiten und entsprechende [Sub-Tags (Namespaces)](https://wiki.openstreetmap.org/wiki/DE:Attribut#Schl.C3.BCssel_und_Werte), die bspw. den Radstreifen neben der Fahrbahn (`cycleway:right=lane`). Diese werden bevorzugt, wenn vorhanden.

## Maßnehmen

Für das ausmessen von Breiten der Wege bzw. Barrieren sollte entweder ein klassisches Maßband oder eine entprechende App (bspw. [Android](https://play.google.com/store/apps/details?id=com.google.tango.measure) bzw. [iOS](https://play.google.com/store/apps/details?id=com.google.tango.measure&hl=de&gl=US)) verwendet werden. Somit ist eine hohe Genauigkeit gewährleistet.

Falls das Maß nur geschätzt werden kann, könnte [est_width=*](https://wiki.openstreetmap.org/wiki/Key:est_width) verwendet werden. Dies wird allerdings nicht von uns ausgewertet.

## Beispiel Szenarien

### Einrichtungs-Radweg

<img alt="Einrichtungsradweg mit exzelletem Untergrund und grüner Markierung" src="/assets/images/cycleway.jpg" width= "200" style="float: right; margin-left: 2rem;">

Einen abgetrennter, beschildeter Radweg könnte bspw. folgende Tags enthalten:
* `highway=cycleway`
* `surface=asphalt`
* `smoothness=excellent`
* `width=3.0`
* `traffic_sign=DE:237`


### Zweirichtungs-Radweg

<img alt="Zweirichtungsradweg mit exzelletem Untergrund" src="/assets/images/bidirectional-cycleway.jpg" width= "200" style="float: left; margin-right: 2rem;">

Einen abgetrennter, exklusiver Radweg hätte bspw. folgende Tags:
* `highway=cycleway`
* `oneway=no`
* `surface=asphalt`
* `smoothness=excellent`
* `width=3.5`
* `traffic_sign=DE:237`

### Radstreifen

<img alt="Radstreifen in mäßigem Zustand" src="/assets/images/cycleway:lane.jpg" width= "200" style="float: right;">

> **Vorsicht**! Das `right` in `cycleway:right` bezieht sich immer auf die Laufrichtung des OSM Weges.
> Und hier bezieht sich `smoothness` auf die Fahrbahn und `cycleway:right:smoothness` auf den Radstreifen.


Eine Straße mit Radstreifen, der parallel zur Fahrbahn verläuft, hat möglicherweise folgende Tags:
* `highway=residential`
* `surface=asphalt`
* `cycleway:right=lane`
* `cycleway:right:lane=exclusive`
* `cycleway:right:smoothness=good`
* `cycleway:right:width=1.7`
* `smoothness=excellent` (bezieht sich auf die Fahrbahn)
* `traffic_sign=DE:237` (nur, wenn beschildert)


### Getrennter Rad-& Fußweg

<img alt="Getrennter, ausgeschilderter Radweg und Fußweg" src="/assets/images/separated-cycleway.jpg" width= "200" style="float: left; margin-right: 2rem;">

Ein ausgewiesener, getrennter Rad- und Fußweg könnte folgende Tags enthalten:
* `highway=path`
* `bicycle=designated`
* `foot=designated`
* `traffic_sign=DE:241`
* `segregated=yes`
* `surface=paving_stones`
* `cycleway:surface=*` (nur, falls sich vom Rest des Weges unterscheiden würde)
* `cycleway:smoothness=intermediate`
* `cycleway:width=0.7`

### Bordsteine

Bordsteine können insbesondere für Schwerlast-Lastenräder eine erhebliche Barriere darstellen und sollten deshalb in OpenStreetMap eingetragen werden. Sie werden als Punkt auf Wegen getaggt. In Baden-Württemberg existieren auch von behördlicher Seite keine flächendeckenden Informationen über Bordsteine. 

<img alt="Bordsteine an Kreuzung an Verkehrsinseln" src="/assets/images/kerb.jpg" width= "300" style="float: right;">

* [`barrier=kerb`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=kerb)
* [`kerb`](https://wiki.openstreetmap.org/wiki/DE:kerb)`=raised`
* `height=0.07` (in Metern)

Und auf Straßen, bei denen der Radweg auf diesen Wegen gemappt ist:

* `cycleway:left:barrier=kerb`
* [`kerb`](https://wiki.openstreetmap.org/wiki/DE:kerb)`=lowered`
* `height=0.04` (in Metern)

### Poller

<img alt="Beispiel für schmale Pollerdurchfahrt vor Brücke" src="/assets/images/bollard.jpg" width= "300" style="float: right;">

An Pollern ist vor allem eines Interessant: Das Durchkommen zwischen mehreren Pollern/Steinen oder Poller und Wegerand. Die breitest mögliche Stelle sollte dann gemessen werden und mit maxwidth:physical in Metern (ohne Einheit anhängen) getaggt werden.

* [`barrier=bollard`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=bollard)
* [`bollard`](https://wiki.openstreetmap.org/wiki/DE:Key:bollard)`=foldable`
* [`maxwidth:physical`](https://wiki.openstreetmap.org/wiki/Key:maxwidth:physical)`=1.1`
* `bicycle=yes`
* `foot=yes` (wenn für Fußverkehrerlaubt)

### Umlaufgitter

Für Umlaufgitter, oder auch Drängelgitter genannt, existieren derzeit noch keine gut verwendbare Tags um diese sinnvoll zu beschreiben. Nichtsdestotrotz sollten auch diese in OpenStreetMap eingetragen werden. Diese werden als Punkt auf einem Weg getaggt.

* [`barrier=cycle_barrier`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=bollard)
* `bicycle=yes` oder `bicycle=no`, falls nicht für Radverkehr erlaubt
* `foot=yes` (in aller Regel auch für Fußverkehr erlaubt)

## Weiterführende Informationen

* Weitere, für Lastenräder wichtige Tags können auf der [Cargobike OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/DE:Cargobike) nachgelesen werden. 
* Einen guten Überblick über umfassendes, generelles taggen von Radinfrastruktur in OSM gibt es von [Verkehrswende Berlin](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Radwege).
* Die Allgemeinen Kartierungsempfehlungen sind ebenfalls im OSM Wiki auf der Seite [Radverkehrsanlagen kartieren](https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren) zu finden.
* Für das Bewerten der Untergrundebenheit bietet diese [OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/smoothness) von Berlin Verkehrswende einen guten Überblick.

> Dieser Text und diese Bilder stehen unter der Lizenz **CC BY 4.0**.