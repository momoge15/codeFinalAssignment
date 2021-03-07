Pour arriver à notre resultat, nous avons eu à :
1) Dans la base données
*Ajouter deux collections users (Pour la protections des accès au données) et matieres(pour dresser une selection des matieres et profs).
* Modifier la collection assignments (ajouter de nouveaux champs)

2) Dans l'api
*Ajout des models user et matiere
*Modifications de model assignment (ajout de nouveaux élements)
*Ajout des routes des routes users (Avec fonction pour recupérer <une liste de users à patir du login) et 
	matieres(pour lister toutes les matieres et les prof)

*Modifier la routes assignments(Ajout d'une fonction getAssignmentss pour recupérer les assignments non rendu,

modification de la fonction getAssignments avec pagination afin de retourner les assigments rendu)

*Modifier server.js afin afin ajouter les liens vers les nouvelles ressources ajoutées

3) Dans Assignments app
* Modifier presque tous le graphisme
*Ajouter une securité par login et password et verification frequente des information du user connecter
* Ajout de contrainte au niveau de l'insertion de la modification.


4) Pour les test en local
*Dézziper le fichier
*Aller le de dossier api (Ouvrir le terminal et faire npm install puis node server.js pour lans l'api
*Aller dans le dossier assignment(Ouvrir le cmd taper npm install et ng serve pour lancer l'app assignment


lien vers l'application en ligne : https://assignmentclient.herokuapp.com


Vers l'api https://angularapiesatic.herokuapp.com/api/assignments
		https://angularapiesatic.herokuapp.com/api/assignmentss
		https://angularapiesatic.herokuapp.com/api/users
		https://angularapiesatic.herokuapp.com/api/matieres