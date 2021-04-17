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

Eine allgemeine Einführung gibt es bei [LearnOSM](https://learnosm.org/de/), denn dies soll keine Anleitung für OSM selbst sein.

## Mitmachen

**Wie kann ich jetzt also teilnehmen?**

Jeder aktualisierte oder hinzugefügte Tag, Punkt oder Weg hilft CargoRocket und allen anderen der OSM-Community! Ziel ist es möglichst gute, akkurate und nachvollziehbare Daten einzutragen. Ganz konkret kann das folgendermaßen erfolgen:

Durch Hinzufügen & Aktualisieren...
* von Wegen (bspw. ein nicht eingetragener Radweg)
* von Punkten (bspw. ein neuer Poller)
* von Tags (bspw. von Durchfahrtsbreiten an Pollern)

<div class="c">
  <a href="/ranking" class="button secondary big bebas">Jetzt Mithelfen</a>
</div>

## Tags

Wir haben verschiedene Faktoren identifiziert, die die Lastenrad-Tauglichkeit von Straßen ausmachen. Daraus haben wir dann die entsprechenden OSM-Tags abgeleitet. Für unsere Auswertungen verwenden wir folgende Tags, welche die Eigenschaften von Wegen und Barrieren beschreiben:

* Radwege
  *  [`surface=*`](https://wiki.openstreetmap.org/wiki/DE:Key:surface)
  *  [`smoothness=*`](https://wiki.openstreetmap.org/wiki/DE:Key:smoothness)
  *  [`width=*`](https://wiki.openstreetmap.org/wiki/DE:Key:width)
* Poller (`barrier=bollard`) & Umlaufgitter (`barrier=cycle_barrier`)
  * [`maxwidth:physical=*`](https://wiki.openstreetmap.org/wiki/DE:Key:maxwidth:physical)
* Bordstein (`barrier=kerb`)
  *  [`height`](https://wiki.openstreetmap.org/wiki/DE:Key:height)
  *  [`kerb`](https://wiki.openstreetmap.org/wiki/Key:kerb) [Im OSM Wiki derzeit nur auf Englisch verfügbar]

> **Vorsicht**: Es gibt allerdings viele verschiedene Möglichkeiten und entsprechende [Sub-Tags (Namespaces)](https://wiki.openstreetmap.org/wiki/DE:Attribut#Schl.C3.BCssel_und_Werte), die bspw. den Radstreifen neben der Fahrbahn (`cycleway:right=lane`). Diese werden bevorzugt, wenn vorhanden.

## Maßnehmen

Für das ausmessen von Breiten der Wege bzw. Barrieren sollte entweder ein klassisches Maßband oder eine entprechende App (bspw. [Android](https://play.google.com/store/apps/details?id=com.google.tango.measure) bzw. [iOS](https://play.google.com/store/apps/details?id=com.google.tango.measure&hl=de&gl=US)) verwendet werden. Somit ist eine hohe Genauigkeit gewährleistet.

Falls das Maß nur geschätzt werden kann, könnte [est_width=*](https://wiki.openstreetmap.org/wiki/Key:est_width) verwendet werden. Alternativ ist auch [source:width=estimated](https://wiki.openstreetmap.org/wiki/DE:Key:source) möglich. Beide Tags werden (derzeit) allerdings nicht von uns ausgewertet.

## Beispiel Szenarien
Im folgenden sollen verschiedene real-existierende Szenarien in Form von Tags beschrieben werden.

### Einrichtungs-Radweg

<img alt="Einrichtungsradweg mit exzelletem Untergrund und grüner Markierung" src="/assets/images/cycleway.jpg" width= "200" class="float right">

Einen abgetrennter, beschildeter Radweg könnte bspw. folgende Tags enthalten:
* `highway=cycleway`
* `surface=asphalt`
* `smoothness=excellent`
* `width=2.0` (in Metern)
* `traffic_sign=DE:237`


### Zweirichtungs-Radweg

<img alt="Zweirichtungsradweg mit exzelletem Untergrund" src="/assets/images/bidirectional-cycleway.jpg" width= "200" class="float left">

Einen abgetrennter, exklusiver Radweg hätte bspw. folgende Tags:
* `highway=cycleway`
* `oneway=no`
* `surface=asphalt`
* `smoothness=excellent`
* `width=3.5`
* `traffic_sign=DE:237`

### Radstreifen


> **Vorsicht**! Das `right` in `cycleway:right` bezieht sich immer auf die Laufrichtung des OSM Weges.
> Und hier bezieht sich `smoothness` auf die Fahrbahn und `cycleway:right:smoothness` auf den Radstreifen.

<img alt="Radstreifen in mäßigem Zustand" src="/assets/images/cycleway:lane.jpg" width= "200" class="float right">

Eine Straße mit Radstreifen, der parallel zur Fahrbahn verläuft, hat möglicherweise folgende Tags:
* `highway=residential`
* `surface=asphalt` (Falls gleich für Fahrbahn als auch Radstreifen)
* `cycleway:right=lane`
* `cycleway:right:lane=exclusive`
* `cycleway:right:smoothness=good`
* `cycleway:right:width=1.7`
* `cycleway:right:traffic_sign=DE:237` (nur, wenn beschildert)
* `smoothness=excellent` (bezieht sich auf die Fahrbahn)

> Falls der Radstreifen einen anderen Untergrund hat, als die Fahrbahn, kann dies durch `cycleway:right:surface=*` angezeigt werden.

### Getrennter Rad-& Fußweg

<img alt="Getrennter, ausgeschilderter Radweg und Fußweg" src="/assets/images/separated-cycleway.jpg" width= "200" class="float left">

Ein ausgewiesener, getrennter Rad- und Fußweg könnte folgende Tags enthalten:
* `highway=path`
* `bicycle=designated`
* `foot=designated`
* `traffic_sign=DE:241` (nur wenn beschildert)
* `segregated=yes`
* `surface=paving_stones`
* `cycleway:surface=*` (nur, falls sich vom Rest des Weges unterscheiden würde)
* `cycleway:smoothness=intermediate`
* `cycleway:width=0.7`

### Bordsteine

Bordsteine können insbesondere für Schwerlast-Lastenräder eine erhebliche Barriere darstellen und sollten deshalb in OpenStreetMap eingetragen werden. Sie werden als Punkt auf Wegen getaggt. Für den Mapathon sind Bordsteine entscheidend, welche als Punkte auf Radwegen liegen. Poller als Linien oder Poller, die nicht auf Radwegen liegen werden von uns nicht weiter beachtet.

In Baden-Württemberg existieren auch von behördlicher Seite keine flächendeckenden Informationen über Bordsteine.

<div class="flex c">
  <figure role="group">
    <img alt="Raised kerb" src="/assets/images/kerb_raised.jpg" width="200">
    <figcaption>
      <code>raised</code>
    </figcaption>
  </figure>
    <figure role="group">
    <img alt="lowered kerb" src="/assets/images/kerb_lowered.jpg" width= "200">
    <figcaption>
      <code>lowered</code>
    </figcaption>
  </figure>
  <figure role="group">
    <img alt="Flushed kerb" src="/assets/images/kerb_flushed.jpg" width="200">
    <figcaption>
      <code>flushed</code>
    </figcaption>
  </figure>
</div>

* [`barrier=kerb`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=kerb)
* [`kerb`](https://wiki.openstreetmap.org/wiki/Key:kerb)`=raised`
* `height=0.07` (in Metern)

Führt der Radweg über einen Bordstein, ist jedoch bspw. als `cycleway:right=track` nur als Tag einer Straße vorhanden, kann hier nicht ein Bordstein hinzugefügt werden, der auf der Straße liegt. Das würde sonst bedeuten, dass auch die Autos von dieser Barriere betroffen wären. Daher schlagen wir hier dieses Tagging vor:

* `cycleway:left:barrier=kerb`
* [`kerb`](https://wiki.openstreetmap.org/wiki/DE:kerb)`=lowered`
* `height=0.04` (in Metern)

### Poller

<img alt="Beispiel für schmale Pollerdurchfahrt vor Brücke" src="/assets/images/bollard.jpg" width= "300" class="float right">

An Pollern ist vor allem eines interessant: Das Durchkommen zwischen mehreren Pollern/Steinen oder Poller und Wegerand. Die breitest mögliche Stelle auf dem Weg sollte dann gemessen werden und mit `maxwidth:physical` in Metern (ohne Einheit anhängen) getaggt werden. Die Breite sollte sich auf den (in der Regel asphalitierten) Bereich des Weges beziehen. Falls die physikalische Begrenzung nicht durch Zäune, Hecken oder andere Barrieren hergestellt ist, sondern bspw. ein Durchkommen über einen Grünstreifen möglich ist, schlagen wir vor zusätzlich den Tag `maxwidth:physical:definite=no` vor. Dieser soll anzeigen, dass ein überwinden der Barriere durch Ausholen über jenen Grünstreifen auch mit breiteren Fahrzeugen als durch `maxwidth:physical` angegeben, möglich ist. Umgekehrt würde `maxwidth:physical:definite=yes` ein Durchkommen mit breiteren Fahrzeugen als *definitiv* unmöglich anzeigen.

* [`barrier=bollard`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=bollard)
* [`bollard`](https://wiki.openstreetmap.org/wiki/DE:Key:bollard)`=foldable`
* [`maxwidth:physical`](https://wiki.openstreetmap.org/wiki/DE:Key:maxwidth:physical)`=1.1`
* `bicycle=yes`
* `foot=yes` (wenn für Fußverkehr erlaubt)

### Umlaufgitter

<div class="flex c">
  <img alt="Horizontales Maß bei Umlaufgitter" src="/assets/images/umlaufgitter_meter.jpg" width="300">
  <img alt="Vertikales Maß bei Umlaufgitter" src="/assets/images/umlaufgitter_meter2.jpg" width= "300">
</div>

Für Umlaufgitter, oder auch Drängelgitter genannt, sollte die engste Stelle gemessen und als maxwidth:physical angegeben werden. Dies kann entweder der Abstand zwischen den beiden Gittern sein, als auch der Abstand vom Gitter zu einer möglichen seitlichen Begrenzung (siehe Bilder).
Diese Angabe reicht zwar nur bedingt, um ein Durchkommen für Lastenräder festzustellen, da auch bei ausreichender Breite die Kurve zu eng für ein Durchkommen sein kann, allerdings gibt die Breite zumindest einen gewissen Anhaltspunkt.
Zusätzlich bietet diese Breitenangabe beispielsweise für Rollstuhlfahrende eine ausreichende, wichtige Information.

* [`barrier=cycle_barrier`](https://wiki.openstreetmap.org/wiki/DE:Tag:barrier=bollard)
* `maxwidth:physical=*`
* `bicycle=yes` oder `bicycle=no`, falls nicht für Radverkehr erlaubt
* `foot=yes` (in aller Regel auch für Fußverkehr erlaubt)

<div class="c">
  <a href="/ranking" class="button secondary big bebas c">Jetzt Beitragen!</a>
</div>

## Vorschläge?

Wenn du Vorschläge hast, was bspw. neue Tags betrifft um das Beschreiben von Barrieren zu verbessern, schreib uns gerne an [team@cargorocket.de](mailto:team@cargorocket.de) oder markiere uns auf Twitter [@cargo_rocket](https://twitter.com/cargo_rocket/)! 

## Weiterführende Informationen

* Weitere, für Lastenräder wichtige Tags können auf der [Cargobike OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/DE:Cargobike) nachgelesen werden. 
* Einen guten Überblick über umfassendes, generelles taggen von Radinfrastruktur in OSM gibt es von [Verkehrswende Berlin](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Radwege).
* Die Allgemeinen Kartierungsempfehlungen sind ebenfalls im OSM Wiki auf der Seite [Radverkehrsanlagen kartieren](https://wiki.openstreetmap.org/wiki/DE:Bicycle/Radverkehrsanlagen_kartieren) zu finden.
* Für das Bewerten der Untergrundebenheit bietet diese [OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/smoothness) von Berlin Verkehrswende einen guten Überblick.
* Für die Eintragung von Verkehrszeichen lohnt sich die Verwendung des [Vekehrszeichen Tool](https://osmtools.de/traffic_signs/index.html)s

> Dieser Text und diese Bilder stehen unter der Lizenz **CC BY 4.0**.
