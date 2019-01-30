import { ModalEditarPage } from './../modals/modal-editar/modal-editar.page';
import { ModalLoginPage } from './../modals/modal-login/modal-login.page';
import { ModalDiaPage } from './../modals/modal-dia/modal-dia.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ModalDiaPage, ModalEditarPage], 

  entryComponents: [
    HomePage,
    ModalDiaPage, 
    ModalEditarPage
  ]
})
export class HomePageModule {}
