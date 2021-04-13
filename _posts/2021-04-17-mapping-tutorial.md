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

> Vorsicht: Es gibt allerdings viele verschiedene Möglichkeiten und entsprechende [Sub-Tags (Namespaces)](https://wiki.openstreetmap.org/wiki/DE:Attribut#Schl.C3.BCssel_und_Werte), die bspw. den Radstreifen neben der Fahrbahn (`cycleway:right=lane`). Diese werden bevorzugt, wenn vorhanden.

## Beispiel Szenarien

### Eigener Radweg

Einen abgetrennter, exklusiver Radweg hätte bspw. folgende Tags:
* `highway=cycleway`
* `surface=asphalt`
* `smoothness=excellent`
* `width=3.0`

### Radstreifen

<img alt="Radstreifen in mäßigem Zustand" src="/assets/images/cycleway:lane.jpg" width= "200" style="float: right;">

Eine Straße mit Radstreifen, der parallel zur Fahrbahn verläuft, hat möglicherweise folgende Tags:
* `highway=residential`
* `surface=asphalt`
* `cycleway:right=lane`
* `cycleway:right:lane=exclusive`
* `cycleway:right:smoothness=intermediate`
* `cycleway:right:width=1.7`
* `smoothness=excellent`

> Achtung! Das `right` in `cycleway:right` bezieht sich immer auf die Laufrichtung des OSM Weges.
> Und hier bezieht sich `smoothness` auf die Fahrbahn und `cycleway:right:smoothness` auf den Radstreifen.

### Gemeinsamer Rad-& Fußweg

<img alt="Getrennter, ausgeschilderter Radweg und Fußweg" src="/assets/images/cycleway:lane.jpg" width= "200" style="float: left; margin-right: 2rem;">

Ein ausgewiesener, getrennter Rad- und Fußweg könnte folgende Tags enthalten:
* `highway=path`
* `bicycle=designated`
* `foot=designated`
* `traffic_sign=DE:241`
* `segregated=yes`
* `cycleway:surface=asphalt`
* `footway:surface=cobblestone`
* `cycleway:smoothness=excellent`
* `width=3.5`

### Poller

<img alt="Beispiel für schmale Pollerdurchfahrt vor Brücke" src="/assets/images/bollard_small.jpg" width= "300" style="float: right;">

An Pollern ist vor allem eines Interessant: Das Durchkommen zwischen mehreren Pollern/Steinen oder Poller und Wegerand. Die breitest mögliche Stelle sollte dann gemessen werden und mit maxwidth:physical in Metern (ohne Einheit anhängen) getaggt werden. Hierfür sollte entweder ein klassisches Maßband oder eine entprechende App (bspw. [Android](https://play.google.com/store/apps/details?id=com.google.tango.measure) bzw. [iOS](https://play.google.com/store/apps/details?id=com.google.tango.measure&hl=de&gl=US)) verwendet werden.

Der Poller als Punkt auf einem Weg hätte bspw. folgende Werte:
* [`barrier=bollard`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=bollard)
* [`bollard`](https://wiki.openstreetmap.org/wiki/DE:Key:bollard)`=foldable`
* [`maxwidth:physical`](https://wiki.openstreetmap.org/wiki/Key:maxwidth:physical)`=1.1`
* `bicycle=yes`
* `foot=yes`

## Weiterführende Informationen

* Weitere, für Lastenräder wichtige Tags können auf der [Cargobike OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/DE:Cargobike) nachgelesen werden. 
* Einen guten Überblick über umfassendes, generelles taggen von Radinfrastruktur in OSM gibt es von [Verkehrswende Berlin](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Radwege).
* Die Allgemeinen Kartierungsempfehlungen sind ebenfalls im OSM Wiki auf der Seite [Radverkehrsanla   gen kartieren](https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren) zu finden.
* Für das Bewerten der Untergrundebenheit bietet diese [OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/smoothness) von Berlin Verkehrswende einen guten Überblick.