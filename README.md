**Documentation Technique :**
Mini-Réseau Social - Fullstack MEAN
Introduction

Ce projet est une mini-application de réseau social qui permet aux utilisateurs de :

- S'inscrire et se connecter.
- Publier des messages (texte uniquement).
- Liker et commenter les publications d'autres utilisateurs.

L'application est divisée en deux parties : le back-end (Node.js, Express, MongoDB) et le front-end (Angular).
**Partie Back-End**
Structure du projet
Voici la structure des dossiers pour la partie back-end :

backend/
├── middleware/
│   └── auth.js
├── controllers/
│   ├── userController.js
│   ├── postController.js
│   └── commentController.js
├── models/
│   ├── user.js
│   ├── post.js
│   └── comment.js
├── services/
│   ├── userService.js
│   ├── postService.js
│   └── commentService.js
├── routers/
│   ├── users.js
│   ├── posts.js
│   └── comments.js
├── server.js
└── db.js
**Fonctionnalités**

1/Inscription utilisateur :
-Les utilisateurs peuvent créer un compte en fournissant leur prénom, nom, adresse e-mail et mot de passe.
-Validation des champs (longueur minimale, unicité de l'e-mail, format valide).

2/Authentification
- Login via e-mail et mot de passe.
- Utilisation de JSON Web Tokens (JWT) pour l'authentification.
-Middleware pour protéger les routes sensibles.

3/Publication de posts
-Les utilisateurs authentifiés peuvent publier des messages texte.
-Les messages sont liés à l'utilisateur qui les a publiés.

4/Likes sur les posts
-Les utilisateurs peuvent liker un post.
-Un utilisateur ne peut liker un post qu'une seule fois.

5/Commentaires sur les posts
-Les utilisateurs peuvent commenter les posts.
-Les commentaires sont liés à l'utilisateur qui les a publiés et au post correspondant

**Partie Front-End**
Structure du projet
Voici la structure principale des composants pour la partie front-end Angular :

frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── post-list/
│   │   ├── _services/
│   │   ├── _guards/
│   │   ├── app.module.ts
│   │   ├── app.component.ts

**Fonctionnalités**

1/Inscription et connexion
-Composants : signup et login.
-Gestion des formulaires avec validation des champs (Angular Forms).
-Appels HTTP vers les API back-end pour enregistrer et authentifier les utilisateurs.

2/Affichage des posts
-Composant : post-list.
-Liste les posts existants avec les likes et les commentaires.
-Possibilité de liker et de commenter un post.

3/Guards
-Protègent les routes accessibles uniquement aux utilisateurs connectés.

4/Services
-Gestion des appels HTTP vers le back-end (ex. : AuthService, PostService, CommentService).

**Installation et Exécution**
**Prérequis**
-Node.js et npm installés.
-MongoDB en cours d'exécution.

**Back-End**

1/Cloner le dépôt.
2/Aller dans le dossier backend/.
3/Installer les dépendances : npm install.
4/Démarrer le serveur : npm start.

**Front-End**

1/Aller dans le dossier frontend/.
2/Installer les dépendances : npm install.
3/Démarrer l'application Angular : ng serve.
4/Accéder à l'application sur http://localhost:4200.
