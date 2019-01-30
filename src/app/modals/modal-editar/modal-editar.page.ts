import { NavParams, LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'src/app/componentes/toast/toast.module';
import { SemanaservicioService } from 'src/app/servicios/semanaservicio.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.page.html',
  styleUrls: ['./modal-editar.page.scss'],
})
export class ModalEditarPage implements OnInit {

  //Formulario
  private editFormGroup: FormGroup;
  private id: any;
  private dia: any;
  private categoria: any;
  private ej1: any;
  private ej2: any;
  private ej3: any;
  private ej4: any;

  constructor(
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public semanaServicio: SemanaservicioService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toast: ToastModule
  ) {

    this.id = this.navParams.get("id");
    this.categoria = this.navParams.get("categoria");
    this.dia = this.navParams.get("dia");
    this.ej1 = this.navParams.get("ej1");
    this.ej2 = this.navParams.get("ej2");
    this.ej3 = this.navParams.get("ej3");
    this.ej4 = this.navParams.get("ej4");


    this.editFormGroup = this.formBuilder.group({
      ej1: [this.ej1, Validators.required],
      ej2: [this.ej2, Validators.required],
      ej3: [this.ej3, Validators.required],
      ej4: [this.ej4, Validators.required]
    })

  }

  ngOnInit() {
  }

  edit() {
    let data = {
      categoria: this.categoria,
      dia: this.dia,
      ej1: this.editFormGroup.get("ej1").value,
      ej2: this.editFormGroup.get("ej2").value,
      ej3: this.editFormGroup.get("ej3").value,
      ej4: this.editFormGroup.get("ej4").value
    };

    this.semanaServicio.actualizaEntrenamiento(this.id, data);
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
