import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../usuarios/usuario';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = environment.url;

  constructor(private httpClient: HttpClient, private alertController : AlertController) { }

  list(){
    return this.httpClient.get(`${this.url}/users`);
  }
  private showAlert(msg : string, header: string){
    const alert = this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert=>alert.present());
  }
  delete(usuario:Usuario){
    return this.httpClient.delete(`${this.url}/users/${usuario.id}`).pipe(
      tap(res =>{
        this.showAlert('Exclusão realizada com sucesso','Sucesso!')
        return res;
      }),catchError(e=>{
        this.showAlert(e.error.error, 'Não foi possível excluir')
        throw e;
      })
    )
  }

  
}
