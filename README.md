# Affichage Dynamique (projet tutoré)

## JOMAA Akrem, POIROT Damien, SIX Léo, ZIDANE Waïl
### Étudiants en LP CIASIE

---

## Présentation 

Notre projet est composé de deux applications. La première est la version en ligne de **Directus** qui est un CMS headless open source en nodeJS. C'est-à-dire que c’est un système de contenus qui nous offre une administration pour gérer un ensemble d’écrans d’informations installés au sein d’une organisation (par exemple, un établissement universitaire) sur différents dispositifs d’affichage. Ce CMS possède une API afin de pouvoir mieux exploiter les données de différentes manières.

La deuxième application web est l'**Affichage Dynamique**. C'est un gestionnaire d'affichage qui a été développée en Vue.js et fonctionne avec Directus en utilisant des requêtes API. Ce gestionnaire est accessible sur les dispositifs d'affichage connectés au réseau et permet de paraméter et d'afficher différents contenus sur les écrans qui ont été préalablement créé sur Directus.

## Récupérer et initialiser le projet 

*Ce repository contient uniquement le code de l'appli Affichage Dynamique et pas celui de Directus*

```
git clone git@github.com:WZidane/affichage-dynamique.git
cd affichage-dynamique
npm install
npm run dev
```

## Accéder aux liens 

Lien du CMS regroupant toutes les informations de conception (maquettes, UML, etc...) : https://leosix.fr/affichage-dynamique/ 

Lien du gestionnaire d'administration Directus : https://74b3jzk3.directus.app/admin/ 

Lien du gestionnaire d'affichage sur Netlify :
https://affichage-dynamique.netlify.app/
