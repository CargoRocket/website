---
layout: post
title: CargoBikeIndex
author: Alexandra Kapp
excerpt: Bewertung der Lastenradtauglichkeit für die Indexberechnung.
description: Bewertung der Lastenradtauglichkeit für die Indexberechnung.
---

In einem [OpenStreetMap (OSM) Wiki zum Lastenrad](https://wiki.openstreetmap.org/wiki/DE:Cargobike) Artikel haben wir alle relevanten OSM Tags für das Lastenrad gesammelt (z.B. Poller (*barrier*), Straßenbelag (*surface*) oder Radwegsbreite (*width*)).

Wir haben mögliche Werte für diese Tags, sowie diverse Kombinationen im Detail auf Lastenradtauglichkeit bewertet - die Grundlage für unseren CargoBikeIndex und das Routing. Der aktuelle Stand dieser Bewertung ist auf der [CargoRocket OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/CargoRocket) erläutert. Straßenmerkmale sind hierbei auf einer Skala von 0 (*nicht passierbar*) bis 5 (*optimal für das Lastenrad*) bewertet. So bekommt beispielsweise eine Fahrradstraße eine Bewertung von 5, ein Radweg der weniger als 1,6 Meter breit ist nur eine Bewertung von 3, der Belag "Asphalt" eine 5 oder Kopfsteinplaster nur eine 2. 

Im CargoBikeIndex werden diese verschiedenen Attribute einer Straße nun kombiniert. Der Index setzt sich aus drei Sub-Indizes zusammen:
1. **Straßentyp**
2. **Oberfläche**
3. **Barrieren**

Beim **Straßentyp** wird bewertet, um welche Art von Straße es sich handelt: Gibt es einen Radweg? Wie breit ist dieser? Falls es keinen Radweg gibt - handelt es sich um eine Haupt- oder Wohnstraße? Falls es ein Fußgängerweg weg ist - darf man hier Fahrradfahren oder muss abgestiegen werden? Hier fließen vor allem die OSM Tags *highway*, *cycleway*, *width* und *bicycle* ein.

Bei dem Sub-Index zur **Oberfläche** wird die Qualität der Fahrbahn bewertet. Hier wird zuerst der Tag *smoothness* verwendet, der von *excellent* zu *impassable* reicht. Ist dieser Tag nicht vorhanden, so wird vom Straßenbelag *surface* auf die Qualität geschlossen.

Der Straßentyp und die Oberfläche werden zu einem **Straßenqualitäts-Index** kombiniert, indem die Wurzel des Produkts der beiden Indizes gebildet wird √(Straßentyp\*Oberfläche). Somit ergibt sich wieder ein Wert zwischen 0 und 5. Ist einer der beiden Sub-Indizes mit 0 als *nicht passierbar* klassifiziert, so, bleibt auch der kombinierte Index 0.

**Barrieren** behindern im besten Fall nicht das Durchkommen, sie werten aber eine Straße niemals auf. Dieser Sub-Index reicht daher von 0 (*nicht passierbar*) bis 1 (*für jedes Lastenrad problemlos passierbar*). Multipliziert mit dem Straßenqualitäts-Index ergibt sich der gesamte CargoBikeIndex. Ist der Barriere-Index 1, so bleibt die Straßenqualität unverändert. Ist er geringer, so reduziert sich die Bewertung für die Straße. Bei einem Barriere Faktor von 0 ergibt sich auch ein gesamter CargoBikeIndex von 0 *nicht passierbar*.

Der Barriere-Index ist auf einer kontinuierlichen Skala von 0 bis 1 dargestellt. Das Durchkommen bei Barrieren ist jedoch im Normalfall binär: passierbar oder nicht passierbar. Dies unterscheidet sich jedoch für verschiedene Lastenräder je nach Breite. Der Index versucht abzubilden, ob die Barriere für viele oder wenige Lastenradmodelle ein Problem darstellt.
Im Routing wird über die Einstellung die Breite des eigenen Lastenradmodells einstellbar sein, sodass auch die Passierbarkeit von Barrieren individuell bestimmt werden kann.

Die Bewertung der einzelnen Tags und die Berechnung des CargoBikeIndex befindet sich nun im Praxistest und werden im Laufe der nächsten Wochen und Monate weiterhin verfeinert und angepasst - **hier freuen wir uns über Feedback und Verbesserungsvorschläge!**

Ein erster Prototyp der Visualisierung des **CargoBikeIndex für Stuttgart** gibt es [hier](https://cargorocket.shinyapps.io/index_stuttgart/). Neben dem Gesamt-Index gibt es Ansichten für die einzelnen Sub-Indizes.

[![CargoBikeIndex Stuttgart Screenshot](/assets/images/index_screenshot.png)](https://cargorocket.shinyapps.io/index_stuttgart/)

Es ist zusätzlich ein Layer zu *Auto- und Fußverkehr* dargestellt. Hier sind Straßen zu sehen, die mit Autos oder Fußgänger:innen geteilt werden und diese potenziell das Lastenrad ausbremsen können. In einem Routing können perspektivisch aktuelle Stauzeiten miteinbezogen werden, sowie stark frequentierte Fußgängerzonen oder Parks gemieden werden. Dies ist aktuell jedoch weder im Index noch im Routing integriert, sondern nur zur Information dargestellt.