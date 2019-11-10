import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = environment.url;

  constructor(private httpClient: HttpClient, private alertController : AlertController) { }

  list(){
    return this.httpClient.get(`${this.url}/users`);
  }
  showAlert(msg : string, header: string){
    const alert = this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert=>alert.present());
  }
}
