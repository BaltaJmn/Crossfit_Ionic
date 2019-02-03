// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyDp4kARh4gKSjbwRcXKv9xL3jw12joANk4",
    authDomain: "crossfit-3d58b.firebaseapp.com",
    databaseURL: "https://crossfit-3d58b.firebaseio.com",
    projectId: "crossfit-3d58b",
    storageBucket: "crossfit-3d58b.appspot.com",
    messagingSenderId: "552062419841",
    semanaColeccion: "semana",
    entrenamientosColeccion: "entrenamientos",
    categoriasColeccion: "categorias",
    usuariosColeccion: "usuarios"
  }, 

  defaultLanguage:"es", 
  currentLanguages:['es','en'], 
  defaultAvatar:"assets/defaultProfile.jpg"
};

