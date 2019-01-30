import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCreaUsuarioPage } from './modal-crea-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreaUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCreaUsuarioPage]
})
export class ModalCreaUsuarioPageModule {}
