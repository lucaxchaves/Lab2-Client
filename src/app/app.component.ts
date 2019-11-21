import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

import {Push, PushOptions, PushObject} from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private push : Push
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeFirebase();
      this.authService.authenticationState.subscribe(state=>{
        if(state){
          this.router.navigateByUrl('/home');

        }else{
          this.router.navigateByUrl('/login')
        }
      });
    });
  }
  private initializeFirebase() {
    const options: PushOptions = {
      android: {
        senderID: 'Seu codigo aqui'
      }
    }
    
    const pushObject: PushObject = this.push.init(options)
  
    pushObject.on('registration').subscribe(res => console.log(` ${res.registrationId}`))
  
    pushObject.on('notification').subscribe(res => console.log(`Já chegou o disco voador: ${res.message}`))
  }
  
  logout(){
    this.authService.logout();
  }
}
