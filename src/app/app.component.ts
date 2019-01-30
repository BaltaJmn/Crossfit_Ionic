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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public semanaServicio: SemanaservicioService,
    public authService: AuthService,
    public modalController: ModalController,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public toast: ToastModule,
    public camera: Camera,
    public qrScanner: QRScanner,
    public popoverController: PopoverController,
    public flashlight: Flashlight
  ) {
    this.logged = false;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.authService.initChecking().then(() => {

        this.toast.mostrarToast("datos cargados", 500);
        this.logged = this.authService.isLogged();

        this.avatar = this.authService.getAvatar();

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
              this.toast.mostrarToast("¡Día sumado!", 100);
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
      logged: datosSesion.logged,
      usuario: datosSesion.usuario,
    };

    console.log(id);
    console.log(data);

    console.log(id);
    console.log(id);
    console.log(id);

  }

  async mostrarModalLogin() {

    const modal = await this.modalController.create({
      component: ModalLoginPage
    });
    modal.onDidDismiss().then(() => {

      this.avatar = this.authService.getAvatar();

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
