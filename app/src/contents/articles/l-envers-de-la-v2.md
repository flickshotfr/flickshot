---
title: L'envers de la V2
slug: l-envers-de-la-v2
description: 'NULL'
type: default
language: fr
draft: false
date: 2017-09-15T11:47:30.000Z
lastmod: 2022-05-09T12:26:33.000Z
views: '2100'
author: Olriko_42
country: fs
categories:
  - Flash
tags:
  - v2
---
Hello tout le monde,

Comme promis dans le podcast, je vais ici détailler un peu l'envers de cette nouvelle version du site et pourquoi tout ces changements.

Avant tout, je vais me présenter. Moi, c'est Olivier alias [Olriko](https://twitter.com/Olriko%5F42?lang=fr), je suis co-fondateur de Flickshot mais aussi le développeur.

Pourquoi tout ces changements ?

Pour poser les bases, Flickshot est un premier projet que nous avons fait de A à Z. On a appris beaucoup de choses en développant le projet et surtout moi du coté dev.

En sortant la première version en novembre 2016, on s'est vite rendu compte que UI/UX n'était pas adapté. Sans de réelle expérience dans ce domaine, nous avions fait un site peu lisible et peu harmonieux.

Dans un second temps, je me demandais si un forum était nécessaire, pouvions-nous trouver une alternative ? Je me suis inspiré de Medium.com, un site où n'importe qui peut proposer du contenu sous forme d'article, pour créer la partie communautaire avec le bouton "**Exprime-toi**" dans le header.

Durant cette année, Flickshot s'est fait une place à l'international grâce aux nombreuses exclusivités que l'on a pu avoir. Il s'imposait donc **d'internationaliser le site** en ajoutant la langue de Shakespeare.

Nous avons pu aussi constaté que le thème noir ne plaisait pas à tout le monde, c'est pourquoi nous avons introduit un thème blanc. Vous pouvez simplement **changer le thème en cliquant sur l'ampoule dans le header** !

Et le développement dans tout ça ?

Flickshot est codé en PHP avec le framework [Laravel](https://laravel.com/). Nous sommes passés de Laravel 5.2 à la 5.4 . J'ai totalement séparé le frontend et la partie admin avec deux applications distincts.

Coté front, j'utilise Foundation comme framework css/scss. Je le recommande fortement, une excellente alternative à Bootstrap ! Pour ce qui est du javascript, jQuery et parfois VueJs 2\. 

Concernant les serveurs, nous sommes passé sur [AWS](https://aws.amazon.com/fr/) et notamment en utilisant: EC2, RDS, SES, SQS, S3.

Je suis parti de zéro et il m'aura fallu 3/4 mois pour terminer le site.

Si vous avez des questions n'hésitez pas !

Un grand merci à tout le staff, fier de vous ?
