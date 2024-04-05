# TP JavaScript

## Presentation du projet

Pour ce projet, nous avons choisi de présenter des cartes à collectionner. Pour ce faire, nous pouvons consulter différentes cartes, oragnisées en série. Il est possible de voir leur détail, de les ajouter en favories, ainsi que de les faire monter de niveau pour qu'elles évolue. 

## Comment démarer le projet

Pour lancer le projet, nous avons besoin de deux choses : 

- Il faut dans un premier temps lancer le json-server depuis npx, pour ce faire on fait : `npx json-server ./data/data.json`

- Ensuite, dans un autre terminal, on fait : `python3 -m http.server`

## Arboressence du projet

- CSS : Contient l'ensemble des fichiers CSS
- data : Le json avec les informations sur les cartes 
- image : Les images utiles pour l'affichage du site
- JS : Les fichiers JavaScript
 - JS/pages : Les fichiers correspondant à chacune des pages de l'application
 - JS/service : Ensemble des fichier permettant l'utilisation de service tel que l'utilisation de la base de données
 - app.js : Fichier prinipale permettant le lancement et la navigation

## Réalisé par
 
- Debray Antoine 
- Mechain Romain