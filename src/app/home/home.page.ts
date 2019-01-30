import { SemanaservicioService } from './../servicios/semanaservicio.service';
import { ModalDiaPage } from './../modals/modal-dia/modal-dia.page';
import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  listaDias = [];
  listaDiasPanel = [];

  constructor(
    public semanaServicio: SemanaservicioService,
    public modalController: ModalController,
    public navCtrl: NavController,
    public loadingController: LoadingController) {

  }

  ionViewWillEnter() {
    this.mostrarDias();
  }

  mostrarDias() {

    this.presentLoading("Cargando");

    this.semanaServicio.leeSemana()
      .subscribe(querySnapshot => {
        this.listaDias = [];
        querySnapshot.forEach((doc) => {
          this.listaDias.push({ id: doc.id, ...doc.data() });
        });
        this.listaDiasPanel = this.listaDias;
        this.loadingController.dismiss();
      });
  }

  async presentLoading(msg) {

    let myloading = await this.loadingController.create({
      message: msg
    });

    return await myloading.present();
  }

  async mostrarModal(id) {

    const modal = await this.modalController.create({
      component: ModalDiaPage, 
      componentProps: {id:id}
    });

    return await modal.present();
  }

  


}
