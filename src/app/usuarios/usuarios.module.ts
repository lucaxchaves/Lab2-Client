import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuariosPage } from './usuarios.page';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
    path: '/form',
    component:FormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuariosPage, UsuarioComponent, FormComponent]
})
export class UsuariosPageModule {}
