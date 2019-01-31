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

//Popover
import { PopoverController } from '@ionic/angular';
import { PopoverLogoutComponent } from './modals/popover-logout/popover-logout.component';

//Translate
import { TranslateService } from '@ngx-translate/core';

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
  ) {
    this.logged = false;
    this.initializeApp();
  }

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

        this.toast.mostrarToast("datos cargados", 500);
        this.logged = this.authService.isLogged();

        this.avatar = this.authService.getAvatar();

        this.diasEscaneados = this.authService.getDias();
        this.descuentoEscaneados = parseInt(this.diasEscaneados) * 10 / 100;

        this.splashScreen.hide();

      });

    });
  }

  abreQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        //Cámara preparada
        if (status.authorized) {
          this.qrScanner.show();  //Mostramos cámara
          window.document.querySelector('ion-app').classList.add('cameraView');  //ocultamos vista de la app

          this.flashlight.switchOn();

          this.scanSub = this.qrScanner.scan().subscribe((d) => {

            if (d == "suma") {
              this.sumaDias();
            } else {
              this.toast.mostrarToast("Código incorrecto", 100);
            }



            window.document.querySelector('ion-app').classList.remove('cameraView');  //mostramos vista de la app
            this.qrScanner.destroy();
          });
        } else if (status.denied) {
          /* No hay permisos, abrimos configuración de permisos*/
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

  sumaDias() {

    let datosSesion = this.authService.getDatosSesion();
    let id = this.authService.getId();

    let data = {
      avatar: datosSesion.avatar,
      contraseña: datosSesion.contraseña,
      dias: datosSesion.dias + 1,
      usuario: datosSesion.usuario,
    };

    this.authService.actualizarUsuario(id, data).then((d) => {
      this.diasEscaneados = this.authService.getDias()
      this.descuentoEscaneados = parseInt(this.diasEscaneados) * 10 / 100;
      this.toast.mostrarToast("¡Día sumado!", 100);
    });
  }

  //Translate
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

  async mostrar() {
    const popover = await this.popoverController.create({
      component: PopoverFotoComponent,
      translucent: true
    });
    return await popover.present();
  }

  logOut() {
    this.authService.logOut();
  }

  isLogged() {
    return this.authService.isLogged();
  }
}
