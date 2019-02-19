import { environment } from 'src/environments/environment';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SemanaservicioService } from 'src/app/servicios/semanaservicio.service';
import { ModalController, NavController, LoadingController, IonSlides, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { ToastModule } from 'src/app/componentes/toast/toast.module';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EncryptServiceService } from 'src/app/servicios/encrypt-service.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;

  //Swipe
  SwipedTabsIndicator: any = null;
  tabs = ["selectTab(0)", "selectTab(1)"];
  public category: any = "0";
  ntabs = 2;
  titulo: any = "Iniciar Sesión";

  //Formulario
  private createUserFormGroup: FormGroup;
  private loginUserFormGroup: FormGroup;

  //Inicio Sesión
  private datosUsuario = [];


  constructor(
    public semanaServicio: SemanaservicioService,
    public authServicio: AuthService,
    public router: Router,
    public modalController: ModalController,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public nav: NavController,
    public toast: ToastModule,
    public vibration: Vibration,
    public localNotifications: LocalNotifications,
    public flashlight: Flashlight,
    public camera: Camera,
    public encryptService: EncryptServiceService,
  ) {

    this.createUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    })

    this.loginUserFormGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    })

  }

  ngOnInit() {

    this.SwipedTabsSlider.length().then(l => {
      this.ntabs = l;
    });

  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }


  //Slide

  /* Actualiza la categoría que esté en ese momento activa*/
  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category;
      if (this.category == 0) {
        this.titulo = "Iniciar Sesión";
      } else {
        this.titulo = "Crear Usuario";
      }
    });
  }

  /* El método que permite actualizar el indicado cuando se cambia de slide*/
  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {

      if (this.ntabs > i) {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }

    });

  }

  /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
  animateIndicator(e) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }



  //Loading

  async presentLoading(msg) {

    let myloading = await this.loadingController.create({
      message: msg
    });

    return await myloading.present();
  }

  finishLoading() {
    this.loadingController.dismiss();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }



  //Formularios

  login() {

    /* Reune los datos del formulario */
    let data = {
      usuario: this.loginUserFormGroup.get("usuario").value,
      contraseña: this.loginUserFormGroup.get("contraseña").value,
    };

    this.presentLoading("Cargando");

    /* Comprueba que el usuario existe */
    this.authServicio.recuperarUsuarioID(data.usuario, data.contraseña)
      .then((d) => {

        if (d.empty == true) {

          this.loadingController.dismiss();

          this.toast.mostrarToast("No se han encontrado usuarios", 100);

        } else {

          let id = d.docs[0].id;

          /* Vuelca los datos del usuario en un array e inicia sesión */
          this.datosUsuario = d.docs[0].data();

          console.log(this.datosUsuario);

          this.authServicio.iniciarSesion(this.datosUsuario, id);

          this.loadingController.dismiss();

          /* Comprueba que se encuentra logeado */
          if (this.isLogged()) {

            this.toast.mostrarToast("Sesión iniciada correctamente", 100);

            this.vibration.vibrate(50);

            this.mostrarNotificacion("Estás logeado");

            this.modalController.dismiss()

          } else {

            this.toast.mostrarToast("Problemas al iniciar sesión", 100);

          }

        }
      });
  }

  register() {

    /* Opciones para la cámara */
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 200
    };

    /* Reune los datos del formulario */
    let data = {
      usuario: this.createUserFormGroup.get("usuario").value,
      contraseña: this.createUserFormGroup.get("contraseña").value,
      avatar: environment.defaultAvatar,
      dias: 0,
    };

    this.presentLoading("Cargando");

    /* Realiza la foto, la carga en los datos del formulario y guarda el array en la base de datos */
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64, ' + imageData;
        data.avatar = base64Image;

        this.authServicio.crearUsuario(data)
          .then((docRef) => {

            this.createUserFormGroup.setValue({
              usuario: '',
              contraseña: ''
            });

            this.loadingController.dismiss();

            this.toast.mostrarToast("Usuario creado correctamente", 100);

          })
          .catch((error) => {

            this.toast.mostrarToast("No se ha podido crear el usuario deseado", 100);

            this.loadingController.dismiss();

          });


      });


  }

  /* Comprueba el estado logeado */
  isLogged() {
    return this.authServicio.isLogged();
  }

  //Notificaciones
  mostrarNotificacion(msg) {
    this.localNotifications.schedule({
      id: 1,
      text: msg,
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
    });
  }
}
