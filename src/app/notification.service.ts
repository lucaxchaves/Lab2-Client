import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { tap } from 'rxjs/operators';

import {Push, PushOptions, PushObject} from '@ionic-native/push/ngx';
import {Device} from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService   {

  url:string = environment.url;

  constructor(
    private httpClient : HttpClient,
    private device: Device,
    private push : Push
    ) { }

    init(){
     
      const options: PushOptions = {
        android: {
          senderID: '494678584859'
        }
      };

      console.log('init');
      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe((registration: any) => {

        
        this.saveToken(registration.registrationId);
      }); 
    }

    saveToken(token){
      const device = {
        platform: this.device.platform,
        model: this.device.model,
        uuid: this.device.uuid,
        token
      };
      console.log(token);

      return this.httpClient.post(`${this.url}/devices`, device);
    }
}
