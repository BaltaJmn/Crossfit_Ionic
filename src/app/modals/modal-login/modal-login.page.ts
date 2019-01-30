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

    let data = {
      usuario: this.loginUserFormGroup.get("usuario").value,
      contraseña: this.loginUserFormGroup.get("contraseña").value
    };

    this.presentLoading("Cargando");

    this.authServicio.recuperarUsuarioID(data.usuario, data.contraseña)
      .then((d) => {

        if (d.empty == true) {

          this.loadingController.dismiss();

          this.toast.mostrarToast("No se han encontrado usuarios", 100);

        } else {

          let id = d.docs[0].id;

          this.datosUsuario = d.docs[0].data();

          this.authServicio.iniciarSesion(this.datosUsuario, id);

          this.loadingController.dismiss();

          if (this.isLogged()) {

            this.toast.mostrarToast("Sesión iniciada correctamente", 100);

            this.flashlight.switchOn();

            this.vibration.vibrate(50);

            this.mostrarNotificacion("Estás logeado");

            this.flashlight.switchOff();

            this.modalController.dismiss()

          } else {

            this.toast.mostrarToast("Problemas al iniciar sesión", 100);

          }

        }
      });
  }

  register() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,  /*FILE_URI */
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      correctOrientation: true,
      /* allowEdit:true,*/
      saveToPhotoAlbum: true,
      /*sourceType:0 es library, 1 camera, 2 saved */
      /* targetHeight:200,*/
      targetWidth: 200
    };

    let data = {
      usuario: this.createUserFormGroup.get("usuario").value,
      contraseña: this.createUserFormGroup.get("contraseña").value,
      avatar: environment.defaultAvatar,
      dias: 0,
    };

    this.presentLoading("Cargando");

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64, ' + imageData;
        data.avatar = base64Image;

        //aqui he terminado de echar la foto
        // empiezo a guardar

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

  isLogged() {
    return this.authServicio.isLogged();
  }

  //Notificaciones
  mostrarNotificacion(msg) {
    this.localNotifications.schedule({
      id: 1,
      text: msg,
    });
  }

  async presentAlertConfirm(msg, type?) {
    const alert = await this.alertController.create({
      header: '¿Desea añadir foto de perfil?',
      message: msg,
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Ok',
          cssClass: 'ok',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }
}
