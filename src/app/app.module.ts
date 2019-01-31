import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalLoginPage } from './modals/modal-login/modal-login.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { SemanaservicioService } from './servicios/semanaservicio.service';
environment
import { IonicStorageModule } from '@ionic/storage';
import { ToastModule } from './componentes/toast/toast.module';

//Native
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PopoverLogoutComponent } from './modals/popover-logout/popover-logout.component';
import { PopoverFotoComponent } from './modals/popover-foto/popover-foto.component';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

/*Importamos los módulos y funciones necesarias para la traducción */
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function setTranslateLoader(http: any) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent, ModalLoginPage, PopoverLogoutComponent, PopoverFotoComponent],
  entryComponents: [AppComponent, ModalLoginPage, PopoverLogoutComponent, PopoverFotoComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    ToastModule,
    HttpClientModule, TranslateModule.forRoot({  //Módulo de traducción
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Vibration,
    LocalNotifications,
    Flashlight,
    Camera,
    DeviceMotion,
    QRScanner,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
