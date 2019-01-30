import { ModalEditarPage } from './../modal-editar/modal-editar.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalDiaPage } from './modal-dia.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalDiaPage, ModalEditarPage],
  entryComponents: [ModalEditarPage],
})
export class ModalDiaPageModule {}
