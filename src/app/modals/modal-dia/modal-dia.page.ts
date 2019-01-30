import { ModalEditarPage } from './../modal-editar/modal-editar.page';
import { ModalController, NavParams, IonSlides, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SemanaservicioService } from 'src/app/servicios/semanaservicio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-modal-dia',
  templateUrl: './modal-dia.page.html',
  styleUrls: ['./modal-dia.page.scss'],
})
export class ModalDiaPage implements OnInit {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;

  //Titulo
  id: any;
  titulo: any;
  days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]

  //Entreno
  listaEntreno = [];
  listaEntrenoPanel = [];


  //Swipe
  SwipedTabsIndicator: any = null;
  tabs = ["selectTab(0)", "selectTab(1)", "selectTab(2)"];
  public category: any = "0";
  ntabs = 3;
  categoria = [
    'hiper',
    'fuerza',
    'hero'
  ]
  indicadorPestaña: any;
  actual: any = 0;


  //SearchBar
  searchTerm: string = '';

  //Variables Edit
  idEntreno: any;
  diaEntreno: any;
  catEntreno: any;
  ej1: any;
  ej2: any;
  ej3: any;
  ej4: any;



  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public semanaServicio: SemanaservicioService,
    public loadingController: LoadingController,
    public authService: AuthService) {

    this.id = this.navParams.get("id");
    this.diaEntreno = this.navParams.get("id");
  }

  ngOnInit() {

    this.titulo = this.days[this.id - 1];

    this.listaEntreno = [];
    this.listaEntrenoPanel = [];

    this.metodoPrincipal();

    this.SwipedTabsSlider.length().then(l => {  //no sería necesario aquí, solo en ngOnInit
      this.ntabs = l;
    });

  }

  ionViewWillEnter() {
    this.category = "0";
    this.SwipedTabsSlider.length().then(l => {  //no sería necesario aquí, solo en ngOnInit
      this.ntabs = l;
    });
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }


  //Mostrar contenido desde la base de datos

  mostrarEntrenamientos(dia, categoria) {

    this.presentLoading("Cargando");

    this.semanaServicio.getEntrenamientoPorDiaCategoria(dia, categoria)
      .then((d) => {
        this.listaEntreno = [];
        this.listaEntrenoPanel = [];
        d.forEach(t => {
          this.listaEntreno.push({ 'ej1': t.data().ej1, 'ej2': t.data().ej2, 'ej3': t.data().ej3, 'ej4': t.data().ej4 });
          this.idEntreno = t.id;
          this.ej1 = t.data().ej1;
          this.ej2 = t.data().ej2;
          this.ej3 = t.data().ej3;
          this.ej4 = t.data().ej4;
        });

        this.listaEntrenoPanel = this.listaEntreno;

        this.loadingController.dismiss();

      });

  }

  metodoPrincipal() {

    this.SwipedTabsSlider.getActiveIndex().then(i => {

      this.indicadorPestaña = i;
      this.actual = this.conversorCategoria(this.indicadorPestaña);
      this.catEntreno = this.actual;
      this.mostrarEntrenamientos(this.id, this.actual);

    });

  }

  conversorCategoria(indice) {
    this.actual = this.categoria[indice];
    return this.actual;
  }

  async mostrarModalEditar() {
    const modal = await this.modalController.create({
      component: ModalEditarPage,
      componentProps: { id: this.idEntreno , dia: this.diaEntreno, categoria: this.catEntreno, ej1: this.ej1, ej2: this.ej2, ej3: this.ej3, ej4: this.ej4}
    });
    modal.onDidDismiss()
      .then(() => {
        this.metodoPrincipal();
      });

    return await modal.present();
  }


  //Slide

  /* Actualiza la categoría que esté en ese momento activa*/
  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category; //to int;
    });
  }

  /* El método que permite actualizar el indicado cuando se cambia de slide*/
  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {

      if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }

      this.indicadorPestaña = i;
      this.actual = this.conversorCategoria(this.indicadorPestaña);

    });

  }

  /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
  animateIndicator(e) {
    //console.log(e.target.swiper.progress);
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

  cerrarModal() {
    this.modalController.dismiss();
  }

  //!!MEJORAR
  //SEARCH BAR

  initializeItems() {
    this.listaEntrenoPanel = this.listaEntreno;
  }

  getItems(ev: any) {
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listaEntrenoPanel = this.listaEntreno.filter((item) => {
        return (item.ej1.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //Logged
  isLogged() {
    return this.authService.isLogged();
  }

}
