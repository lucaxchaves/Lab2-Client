import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarrosPage } from './carros.page';
import { CarroComponent } from './carro/carro.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    component: CarrosPage
  },{
    path: '/form',
    component: FormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarrosPage, CarroComponent, FormComponent]
})
export class CarrosPageModule {}
