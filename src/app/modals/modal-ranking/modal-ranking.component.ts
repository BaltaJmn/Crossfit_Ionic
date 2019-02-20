import { AuthService } from 'src/app/servicios/auth.service';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-ranking',
  templateUrl: './modal-ranking.component.html',
  styleUrls: ['./modal-ranking.component.scss']
})
export class ModalRankingComponent implements OnInit {

  @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;

  listadoRanking: any = [];
  listadoHTML: any = [];
  top1Avatar = null;
  top1Usuario = null;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.updateRanking(null);
  }

  /**
   * Se encarga de realizar una consulta a la base de datos ordenando los usuario por los días registrados
   * @param event Evento de deslizar el dedo
   */
  updateRanking(event?) {

    this.listadoRanking = [];

    this.presentLoading("Cargando");

    this.authService.getRanking().then(d => {

      d.forEach((u) => {
        this.listadoRanking.push(u);
      });

      this.listadoHTML = this.listadoRanking;

      this.top1Avatar = this.listadoRanking[0].avatar;
      this.top1Usuario = this.listadoRanking[0].usuario;

      this.finishLoading();

      event.target.complete();
    });
  }

  //SEARCH BAR

  /**
   * Carga los datos y los vuelca en un array
   */
  initializeItems() {
    this.listadoHTML = this.listadoRanking;
  }

  /**
   * Va buscando entre los objetos que coincidan con lo introducido por parámetro
   * @param ev Escritura en el formulario
   */
  getItems(ev: any) {
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listadoHTML = this.listadoRanking.filter((item) => {
        return (item.usuario.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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
