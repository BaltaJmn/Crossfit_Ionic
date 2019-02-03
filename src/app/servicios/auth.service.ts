import { DatosSesion } from './../interfaces/datos-sesion';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ToastModule } from '../componentes/toast/toast.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuariosColeccion: any;
  datosSesion: DatosSesion = {};

  /*Variables para el infiniteScroll de la pestaña ranking*/
  rlastUserLoaded = null;
  rlastlastUserLoaded = null;
  rscrollUserEnabled = true;

  constructor(
    private fireStore: AngularFirestore,
    private storage: Storage,
    private toast: ToastModule,
    private camera: Camera
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

  /* Comprueba que hay datos de sesiones anteriores guardados en la memoria del teléfono y los carga */
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

  /* Crea un usuario en la base de datos */
  crearUsuario(datos) {
    return this.usuariosColeccion.add(datos);
  }

  /* Compruba que existe un usuario comprobando el usuario y la contraseña */
  recuperarUsuarioID(usuario, contraseña) {
    return this.usuariosColeccion.ref.where("usuario", "==", usuario).where("contraseña", "==", contraseña).get();
  }

  /* Actualiza los datos de un usuario */
  actualizarUsuario(data) {
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

  /* Realiza una consulta a la base de datos devolviendo un array de usuario ordenador por los días registrados */
  getRanking(): Promise<DatosSesion[]> {

    console.log(this.datosSesion.usuario);

    return new Promise((resolve, reject) => {

      let lreq: DatosSesion[] = [];
      let query;

      query = this.usuariosColeccion.ref.orderBy("dias", "desc").get()

      query.then((d) => {

        d.forEach((u) => {
          let x = { "id": u.id, ...u.data() };
          lreq.push(x);
        });

        resolve(lreq);
      });
    });
  }

  /* Método para el infinity Scroll */
  isRInfinityScrollEnabled() {
    return this.rscrollUserEnabled;
  }

  //Inicio y Cierre de Sesión
  iniciarSesion(datosUsuario, id) {

    this.datosSesion = datosUsuario;

    this.datosSesion.logged = true;

    this.datosSesion.id = id;

    this.datosSesion.dias = datosUsuario.dias;

    this.storage.set('datosSesion', this.datosSesion);
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

  /* Método para actualizar la foto de un usuario (Necesita mejoras en el loading) */
  actualizarFoto() {
    return new Promise((resolve, reject) => {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,  /*FILE_URI */
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: 0,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        targetWidth: 200
      };

      let data = {
        usuario: this.datosSesion.usuario,
        contraseña: this.datosSesion.contraseña,
        avatar: this.datosSesion.avatar,
        dias: this.datosSesion.dias,
      };

      this.camera.getPicture(options)
        .then((imageData) => {
          let base64Image = 'data:image/jpeg;base64, ' + imageData;
          data.avatar = base64Image;

          this.usuariosColeccion.ref.where("usuario", "==", data.usuario).get()
            .then((d) => {
              this.usuariosColeccion.doc(d.docs[0].id).update(data).then(() => {
                resolve();
              });
            });
        });
    });
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
