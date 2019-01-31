import { DatosSesion } from './../interfaces/datos-sesion';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ToastModule } from '../componentes/toast/toast.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuariosColeccion: any;
  datosSesion: DatosSesion = {};

  constructor(
    private fireStore: AngularFirestore,
    private storage: Storage,
    private toast: ToastModule
  ) {

    this.usuariosColeccion = fireStore.collection<any>(environment.firebaseConfig.usuariosColeccion);

    this.datosSesion.logged = false;
    this.datosSesion.id = "";
    this.datosSesion.usuario = "";
    this.datosSesion.contraseña = "";
    this.datosSesion.dias = "";
    this.datosSesion.lang = environment.defaultLanguage;
    this.datosSesion.avatar = environment.defaultAvatar;
  }

  initChecking() {
    return new Promise((resolve, reject) => {
      this.storage.get('datosSesion').then((val: DatosSesion) => {
        if (val && val != {} && val != "" && val != [] && val != "[]" && val.id) {

          this.datosSesion = val;
        }
        resolve("Props loaded correctly");
      })
        .catch(err => {
          console.log(err);
          reject("Error loading props on local storage");
        });
    });
  }

  crearUsuario(datos) {
    return this.usuariosColeccion.add(datos);
  }

  recuperarUsuarioID(usuario, contraseña) {
    return this.usuariosColeccion.ref.where("usuario", "==", usuario).where("contraseña", "==", contraseña).get();
  }

  actualizarUsuario(id, data) {
    return new Promise((resolve, reject) => {

      this.datosSesion.dias = data.dias;

      this.usuariosColeccion.ref.where("usuario", "==", data.usuario).get()
        .then((d) => {
          this.usuariosColeccion.doc(d.docs[0].id).update(data).then(() => {
            resolve();
          });

        });
    });
  }

  //Inicio y Cierre de Sesión
  iniciarSesion(datosUsuario, id) {

    this.datosSesion = datosUsuario;

    this.datosSesion.logged = true;

    this.datosSesion.id = id;

    this.datosSesion.dias = datosUsuario.dias;

    this.storage.set('datosSesion', this.datosSesion)
      .then(() => {
        this.toast.mostrarToast("Guardados bien", 100);
      }).catch(err => {
        this.toast.mostrarToast("No se han guardado", 100);
      });
  }

  logOut() {

    return new Promise((resolve, reject) => {
      this.datosSesion.logged = false;
      this.datosSesion.avatar = environment.defaultAvatar;
      this.datosSesion.dias = "";
      this.storage.remove('datosSesion').then(() => {
        this.initChecking().then(d => {
          resolve();
        }).catch(err => {
          reject();
        });
      }).catch(err => {
        console.log("err");
        reject('Error removing props element on local storage');
      });
    });

  }

  isLogged(): Boolean {
    return this.datosSesion.logged;
  }




  //Getters Y Setters

  getDatosSesion() {
    return this.datosSesion;
  }

  setDatosSesion(datosSesion: DatosSesion) {
    this.datosSesion = datosSesion;
    return this.storage.set('datosSesion', this.datosSesion)
  }

  getLang() {
    return this.datosSesion.lang;
  }

  setLang(val) {
    this.datosSesion.lang = val;
    return this.storage.set('datosSesion', this.datosSesion);
  }

  getId() {
    return this.datosSesion.id;
  }

  getAvatar(): String {
    return this.datosSesion.avatar;
  }

  getDias() {
    return this.datosSesion.dias;
  }

  setDias() {
    return this.datosSesion.dias;
  }
}
