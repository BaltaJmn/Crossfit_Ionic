import { ModalRankingComponent } from './modals/modal-ranking/modal-ranking.component';
import { environment } from './../environments/environment';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { PopoverFotoComponent } from './modals/popover-foto/popover-foto.component';
import { ToastModule } from 'src/app/componentes/toast/toast.module';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { Component } from '@angular/core';

import { Platform, ModalController, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SemanaservicioService } from './servicios/semanaservicio.service';
import { AuthService } from 'src/app/servicios/auth.service';

//Native
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

//Popover
import { PopoverController } from '@ionic/angular';
import { PopoverLogoutComponent } from './modals/popover-logout/popover-logout.component';

//Translate
import { TranslateService } from '@ngx-translate/core';

//Encriptar
import * as CryptoJS from 'crypto-js';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  logged: Boolean;
  avatar: String;
  scanSub: any;

  //header
  diasEscaneados: any = 0;
  descuentoEscaneados: any;

  //Encrypt
  encryptSecretKey: any = "secretKey";
  datos = {
    user: "user",
    password: "password"
  }

  datosEn: any;
  datosDes: any;
  aux: any;





  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private semanaServicio: SemanaservicioService,
    private authService: AuthService,
    private modalController: ModalController,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toast: ToastModule,
    private camera: Camera,
    private qrScanner: QRScanner,
    private popoverController: PopoverController,
    private flashlight: Flashlight,
    private translate: TranslateService,
    private datePicker: DatePicker,
    private localNotifications: LocalNotifications,
  ) {
    this.logged = false;
    this.initializeApp();
  }

  /**
   * Carga los datos almacenados en la memoria del teléfono sobre las sesiones anteriores
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.translate.addLangs(environment.currentLanguages);  //add all languages
      this.translate.setDefaultLang(environment.defaultLanguage); //use default language
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }

      this.authService.initChecking().then(() => {

        this.logged = this.authService.isLogged();

        this.avatar = this.authService.getAvatar();

        this.diasEscaneados = this.authService.getDias();
        this.descuentoEscaneados = parseInt(this.diasEscaneados) * 10 / 100;

        this.splashScreen.hide();

      });

    });
  }

  /**
   * Antes de entrar en la ventana, carga el avatar
   */
  ionViewDidEnter() {
    this.avatar = this.authService.getAvatar();
  }

  //Recordatorio
  // recordatorio() {
  //   this.datePicker.show({
  //     titleText: "Añade un recordatorio",
  //     date: new Date(),
  //     mode: 'time',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   })
  //     .then((d) => {
  //       let fecha = d.toString();
  //       let hora = fecha.substring(16, 18);
  //       let minuto = fecha.substring(19, 21);
  //       let segundo = fecha.substring(22, 24);

  //       this.calculadoraHora(hora, minuto, segundo);
        
  //       console.log(fecha);
  //       console.log(hora);
  //       console.log(minuto);
  //       console.log(segundo);
  //     });
  // }

  // calculadoraHora(hora, minuto, segundo) {

  //   let total = hora * 3600000 + minuto * 60000 + segundo * 1000;

  //   console.log(total);
  //   console.log(new Date(new Date().getTime() + total));

  //   this.localNotifications.schedule({
  //     id: 1,
  //     text: "¡A entrenar!",
  //     trigger: { at: new Date(new Date().getTime() + 10000) },
  //     led: 'FF0000',
  //   });

  // }

  /**
   * Abre el escaner QR para sumar los días
   */
  abreQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        //Cámara preparada
        if (status.authorized) {
          this.qrScanner.show();  //Mostramos cámara
          window.document.querySelector('ion-app').classList.add('cameraView');  //ocultamos vista de la app

          this.scanSub = this.qrScanner.scan().subscribe((d) => {

            if (d == "suma") {
              this.flashlight.switchOn();
              this.sumaDias();
              this.flashlight.switchOff();
            } else {
              this.toast.mostrarToast("Código incorrecto", 100);
            }



            window.document.querySelector('ion-app').classList.remove('cameraView');  //mostramos vista de la app
            this.qrScanner.destroy();
          });
        } else if (status.denied) {
          /* No hay permisos, abrimos configuración de permisos */
          this.toast.mostrarToast("error", 100);
          console.log("denied");
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          this.toast.mostrarToast("error", 100);
          console.log("other denied");
        }
        //this.back.cambiarValorOpenModal(false);
      })
      .catch((e: any) => console.log('Error is', e));

  }

  /**
   * Cierra el QR
   */
  ngOnDestroy() {
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.qrScanner.hide().then(() => {
      this.qrScanner.destroy();
    }); // hide camera preview
  }

  /**
   * Pausa el QR
   */
  pauseQR() {
    this.qrScanner.hide();
    this.qrScanner.pausePreview();
    window.document.querySelector('ion-app').classList.remove('cameraView');
  }

  /**
   * Cierra el QR
   */
  closeQR() {
    window.document.querySelector('ion-app').classList.remove('cameraView');
    this.qrScanner.hide().then(() => {
      this.qrScanner.destroy();
    });
    this.scanSub.unsubscribe(); // stop scanning
  }

  /**
   * Añade días a al usuario logeado cuando escanea el QR correcto
   */
  sumaDias() {

    let datosSesion = this.authService.getDatosSesion();

    let data = {
      avatar: datosSesion.avatar,
      contraseña: datosSesion.contraseña,
      dias: datosSesion.dias + 1,
      usuario: datosSesion.usuario,
    };

    this.authService.actualizarUsuario(data).then((d) => {
      this.diasEscaneados = this.authService.getDias()
      this.descuentoEscaneados = parseInt(this.diasEscaneados) * 10 / 100;
      this.toast.mostrarToast("¡Día sumado!", 100);
    });
  }

  //Translate
  /**
   * Cambia el lenguaje a través del toggle
   * @param e Acción del toggle
   */
  changeLang(e) {
    //console.log(e.detail.checked);
    if (e.detail.checked) {
      this.authService.setLang("en");
      this.translate.use("en");
    } else {
      this.authService.setLang("es");
      this.translate.use("es");
    }
  }

  /**
   * Muestra el modal para el inicio de sesión
   */
  async mostrarModalLogin() {

    const modal = await this.modalController.create({
      component: ModalLoginPage
    });
    modal.onDidDismiss().then(() => {

      this.avatar = this.authService.getAvatar();
      this.diasEscaneados = this.authService.getDias();
      this.descuentoEscaneados = parseInt(this.diasEscaneados) * 10 / 100;

    });

    return await modal.present();
  }

  /**
   * Muestra el modal para el Ranking
   */
  async mostrarModalRanking() {

    const modal = await this.modalController.create({
      component: ModalRankingComponent
    });

    return await modal.present();
  }

  /**
   * Muestra el popover para cerrar la sesión
   */
  async mostrarPopoverLogout() {
    const popover = await this.popoverController.create({
      component: PopoverLogoutComponent,
      translucent: true
    });
    popover.onDidDismiss().then(() => {

      this.avatar = this.authService.getAvatar();

    });
    return await popover.present();
  }

  /**
   * Muestra un popover para preguntar si quieres actualizar la foto de perfil
   */
  async mostrarActualizarFoto() {
    const popover = await this.popoverController.create({
      component: PopoverFotoComponent,
      translucent: true
    });
    popover.onDidDismiss().then(() => {

      this.avatar = this.authService.getAvatar();
      this.toast.mostrarToast("Foto de perfil actualizada", 100);

    });
    return await popover.present();
  }

  /**
   * Cierra la sesión del usuario
   */
  logOut() {
    this.authService.logOut();
  }

  /**
   * Comprueba si está logeado
   */
  isLogged() {
    return this.authService.isLogged();
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
}
