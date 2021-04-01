# ServicesWeb

Tout d'abord il faut récupérer l'api, la lancer avec visual studio sur le localhost IIS. Le port peut changer en fonction de la config. Donc il faudra adapter le code du client si jamais il y a besoin. Une fois l'api lancée il y'a une interface swagger pour la tester.

Pour le client, une fois récupéré il faudra faire un *npm install* puis *npm start* pour le lancer.

La fonction supplémentaire utilise la fonction de recherche de l'api, l'appel est correct mais un problème de requête CORS bloque le client et je n'arrive pas à le regler (en revanche cela fonctionne sur le swagger.

Dans la liste des films si l'ont double clic sur une ligne, cela affiche un panel avec plus d'informations.
