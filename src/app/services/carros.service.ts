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
        this.showAlert(e.error.error,'Não foi possível salvar');
        throw e;
      })
    )
  }


  private insert(carro: Carro){
    return this.httpClient.post(`${this.url}/cars`, carro).pipe(
      tap(res=>{        
        this.showAlert('Cadastro realizado com sucesso','Sucesso!');
        return res;
      }),
      catchError(e =>{
        this.showAlert(e.error.error, 'Não foi possível salvar');
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

  delete(carro: Carro){
    return this.httpClient.delete(`${this.url}/cars/${carro.id}`).pipe(
      tap(res =>{
        this.showAlert('Exclusão realizada com sucesso','Sucesso!')
        return res;
      }),catchError(e=>{
        this.showAlert(e.error.error, 'Não foi possível excluir')
        throw e;
      })
    );
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
