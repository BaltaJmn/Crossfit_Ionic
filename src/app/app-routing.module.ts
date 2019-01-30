import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'modal-dia', loadChildren: './modals/modal-dia/modal-dia.module#ModalDiaPageModule' },
  { path: 'modal-login', loadChildren: './modals/modal-login/modal-login.module#ModalLoginPageModule' },
  { path: 'modal-crea-usuario', loadChildren: './modals/modal-crea-usuario/modal-crea-usuario.module#ModalCreaUsuarioPageModule' },
  { path: 'modal-editar', loadChildren: './modals/modal-editar/modal-editar.module#ModalEditarPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
