import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  url = environment.url;

  constructor(private httpClient: HttpClient, private alertController: AlertController) { }

  list(){
    return this.httpClient.get(`${this.url}/cars`);
  }


  private update(carro: Carro){
    return this.httpClient.patch(`${this.url}/cars/${carro.id}`, carro).pipe(
      tap(res=>{
        
        this.showAlert('Alteração salva com sucesso', 'Sucesso!');
        return res;
      }),
      catchError(e =>{
        this.showAlert('Não foi possível salvar', e.error.error);
        throw e;
      })
    )
  }


  private insert(carro: Carro){
    return this.httpClient.post(`${this.url}/cars`, carro).pipe(
      tap(res=>{
        console.log(res);
        
        this.showAlert('Cadastro realizado com sucesso','Sucesso!');
        return res;
      }),
      catchError(e =>{
        this.showAlert('Não foi possível salvar', e.error.error);
        throw e;
      })
    )
  }

  save(carro: Carro){
    if(carro.id>0){
      return this.update(carro);
    }else{
      return this.insert(carro);
    }
  }

  private showAlert(msg:string, header:string){ 
    let alert = this.alertController.create({
      message: msg,
      header: header,
      buttons: ['OK']
    });
    alert.then(alert=> alert.present());

  }
}
