import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Platform, AlertController} from '@ionic/angular';
import {environment} from '../../environments/environment';

import {Storage} from '@ionic/storage';
import {Usuario} from '../usuarios/usuario';


const TOKEN_KEY = 'access_token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  authenticationState  =  new  BehaviorSubject(false);
  user: Usuario = null;

  constructor(private httpClient: HttpClient, private helper: JwtHelperService, private storage: Storage, private plt: Platform, private alertController: AlertController) {
    this.plt.ready().then(()=>{
      this.checkToken();
    });
  }

  register(cred){
    return this.httpClient.post(`${this.url}/users`, cred)
      .pipe(
        tap(res => {
          this.authenticated(res);
        }),
        catchError(e => {
          this.showAlert(e.error.msg,'Falha no Cadastro');
          throw(e);
        })
      ); 
  }
  
  isAuthenticated() {
    return this.authenticationState.value;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  private authenticated(res){
    this.storage.set(TOKEN_KEY, res['token']);
    this.user = this.helper.decodeToken(res['token']);
    this.authenticationState.next(true);
  }



  login(credentials) {
    return this.httpClient.post(`${this.url}/auth/login`, credentials)
      .pipe(
        tap(res => {
          this.authenticated(res);
        }),
        catchError(e => {
          console.log(e.error.error);
          this.showAlert(e.error.error, 'Falha ao realizar login');
          throw e;
        })
      );
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  showAlert(msg:string, header:string) {
    let alert = this.alertController.create({
      message: msg,
      header: header,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
