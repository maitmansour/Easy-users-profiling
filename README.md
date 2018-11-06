
# Profiling
## Introduction
Ce code permet proposer des produits en se basant sur les prodits favoris (cliqué) par un utilisateur, il permet également de mettre à jours les informations d'un produit en se basant sur les produits cliqués par l'utilisateur. 

## Auteurs
- AIT MANSOUR Mohamed
- BELGHARBI Meryem

  
## suggest.html
  
Cet example permet la suggestion d'un produit, veullez suivre ces étapes pour tester : 

 1. Lancer le fichier
 2. Cliquer sur plusieurs produits (images)
 3. Cliquer sur Suggérer un produit

Vous aurez le produit le plus proche (distance euclidienne) du Barycentre des produits dont le clique est effectué.

  
## update.html

Cet example permet la mise à jours des valeurs d'un produit (qui contient des 0) grâce au barycentre des produits cliqués avant. pour tester :

 1. Ouvrir le fichier
 2. Cliquer sur plusieurs produits avec le border
 3. Cliquer sur un produit sans border
 4. La mise à jour sera effectuée !

Les nouveau valeurs sont alors enregistrés, (LocalStorage), vous pouvez simuler le changement d'utilisateur pour recalculer à nouveau le barycentre.

Pour la remise à zéro il suffit de cliquer sur RESET.
