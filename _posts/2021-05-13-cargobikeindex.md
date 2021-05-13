---
layout: post
title: CargoBikeIndex
author: Alexandra Kapp
excerpt: Bewertung der Lastenradtauglichkeit für die Indexberechnung.
description: Bewertung der Lastenradtauglichkeit für die Indexberechnung.
---

In einem **[OpenStreetMap (OSM) Wiki zum Lastenrad](https://wiki.openstreetmap.org/wiki/DE:Cargobike) Artikel haben wir alle relevanten OSM Tags für das Lastenrad** gesammelt (z.B. Poller (*barrier*), Straßenbelag (*surface*) oder Radwegsbreite (*width*)).

Wir haben mögliche Werte für diese Tags, sowie diverse Kombinationen im Detail auf Lastenradtauglichkeit bewertet - die Grundlage für unseren CargoBikeIndex und das Routing. **Der aktuelle Stand dieser Bewertung ist auf der [CargoRocket OSM Wiki Seite](https://wiki.openstreetmap.org/wiki/CargoRocket) erläutert.** Straßenmerkmale sind hierbei auf einer Skala von 0 (*nicht passierbar*) bis 5 (*optimal für das Lastenrad*) bewertet. So bekommt beispielsweise eine Fahrradstraße eine Bewertung von 5, ein Radweg, der weniger als 1,6 Meter breit ist nur eine Bewertung von 3, der Belag 'Asphalt' eine 5 oder 'Kopfsteinplaster' eine 2. 

Im CargoBikeIndex werden diese verschiedenen Attribute einer Straße nun kombiniert. Der Index setzt sich aus drei Sub-Indizes zusammen:
1. **Straßentyp**
2. **Oberfläche**
3. **Barrieren**

Beim **Straßentyp** wird bewertet, um welche Art von Straße es sich handelt: Gibt es einen Radweg? Wie breit ist dieser? Falls es keinen Radweg gibt - handelt es sich um eine Haupt- oder Wohnstraße? Falls es ein Fußgängerweg weg ist - darf man hier Fahrradfahren oder muss abgestiegen werden? 

Insbesondere die Radwegsbreite ist häufig nicht bekannt. Somit müssen hier sinnvolle *defaults* gewählt werden, auf die zurückgegriffen werden kann. Schmale Radspuren auf der Fahrbahn sind unserer Einschätzung nach weniger problematisch, da keine physische Barriere verhindert die Autospur mitzunutzen. Bei getrennten Radwegen, oder Hochbordradwegen sind schmale Radwege problematischer, da hier zum Teil phyische Barrieren wie Bäume vorhanden sind oder häufig niedrige Kanten den Gehweweg vom Radweg trennen (siehe Bild). Zusätzlich stehen hier häufiger temporäre Barrieren, wie Mülltonnen oder geparkte Fahrräder. Daher ist die default-Bewertung für Radwege ohne Breite 3, während der default für Radspuren eine 4 ist. 

<div class="flex c">
<img alt="Beispiel Hochbordradweg" src="/assets/images/separated-cycleway.jpg" width= "400">
</div>

Wohnstraßen ohne Radweg sind mit 4 gut bewertet, während mit steigender Größe der Straße, die Bewertung sinkt, falls kein Radweg vorhanden ist - von Vorfahrtstraße 3 bis Bundesstraße 1.

Wege, die ohne abgetrennten Radweg mit Fußgänger:innen geteilt werden, sind mit einer 2 bewertet, da hier davon ausgegangen wird, dass kein schnelles Durchkommen möglich ist. Muss abgestiegen werden, gibt es eine Bewertung von 1. Stufen sind als nicht passierbar mit 0 bewertet.

Bei dem Sub-Index zur **Oberfläche** wird die Qualität der Fahrbahn bewertet. Hier wird zuerst der Tag *smoothness* verwendet, der von *excellent* zu *impassable* reicht. Ist dieser Tag nicht vorhanden, so wird vom Straßenbelag *surface* auf die Qualität geschlossen. Obwohl die Qualität *smoothness* nicht vollständig objektiv bewertet werden kann, liefert sie doch eine bessere Information als der Belag allein. Grundsätzlich wird beispielsweise davon ausgegangen, dass Asphalt sehr gut befahrbar ist, ein unbefestigter Weg hingegen schlecht. Es gibt aber auch Asphalt der durch Schlaglöcher und Wurzeln  holprig ist, hingegen ein nicht befestigter Parkweg, der glatt, kompakt und angenehm zu befahren ist.

Der Straßentyp und die Oberfläche werden zu einem **Straßenqualitäts-Index** kombiniert, indem die Wurzel des Produkts der beiden Indizes gebildet wird √(Straßentyp\*Oberfläche). Somit ergibt sich wieder ein Wert zwischen 0 und 5. Ist einer der beiden Sub-Indizes mit 0 als *nicht passierbar* klassifiziert, so, bleibt auch der kombinierte Index 0.

**Barrieren** behindern im besten Fall nicht das Durchkommen, sie werten aber eine Straße niemals auf. Dieser Sub-Index reicht daher von 0 (*nicht passierbar*) bis 1 (*für jedes Lastenrad problemlos passierbar*). Multipliziert mit dem Straßenqualitäts-Index ergibt sich der **gesamte CargoBikeIndex**. Ist der Barriere-Index 1, so bleibt die Straßenqualität unverändert. Ist er geringer, so reduziert sich die Bewertung für die Straße. Bei einem Barriere Faktor von 0 ergibt sich auch ein gesamter CargoBikeIndex von 0 - *nicht passierbar*.

Der Barriere-Index ist auf einer kontinuierlichen Skala von 0 bis 1 dargestellt. Das Durchkommen bei Barrieren ist jedoch im Normalfall binär: passierbar oder nicht passierbar. Dies unterscheidet sich jedoch für verschiedene Lastenräder je nach dessen Breite. Der Index versucht abzubilden, ob die Barriere für viele oder wenige Lastenradmodelle ein Problem darstellt. Im Routing wird in den Einstellungen die Breite des eigenen Lastenradmodells hinterlegt sein, sodass auch die Passierbarkeit von Barrieren individuell bestimmt werden kann.

Die maximale Breite zum Durchkommen ist bei Barrieren leider selten in OSM angegeben. Da die Abstände der meisten Poller groß genug sind, wird per default von einem Durchkommen ausgegangen. Bei Umlaufgittern wird hingegen grundsätzlich davon ausgegangen, dass diese nicht passierbar sind. Die maximale Breite gibt hier leider nur bedingt Auskunft, da die engen Kurven das größere Problem darstellen (siehe hierzu auch [dieses eindrückliche und unterhaltsame Video](https://www.youtube.com/watch?v=jSl3jgNLceI)).

Die Bewertung der einzelnen Tags und die Berechnung des CargoBikeIndex befindet sich nun im Praxistest und werden im Laufe der nächsten Wochen und Monate weiterhin verfeinert und angepasst - **hier freuen wir uns über Feedback und Verbesserungsvorschläge!**

Ein erster Prototyp der Visualisierung des **CargoBikeIndex für Stuttgart** gibt es [hier](https://cargorocket.shinyapps.io/index_stuttgart/). Neben dem Gesamt-Index gibt es Ansichten für die einzelnen Sub-Indizes.

<div class="flex c">
<a href= "https://cargorocket.shinyapps.io/index_stuttgart/"> <img alt="CargoBikeIndex Stuttgart Screenshot" src="/assets/images/index_screenshot.png" width= "600"> </a>
</div>

Es ist zusätzlich ein Layer zu *Auto- und Fußverkehr* dargestellt. Hier sind Straßen zu sehen, die mit Autos oder Fußgänger:innen geteilt werden und diese potenziell das Lastenrad ausbremsen können. In einem Routing können perspektivisch aktuelle Stauzeiten miteinbezogen werden, sowie stark frequentierte Fußgängerzonen oder Parks gemieden werden. Dies ist aktuell jedoch weder im Index noch im Routing integriert, sondern nur zur Information dargestellt.