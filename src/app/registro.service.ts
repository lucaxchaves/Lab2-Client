import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url =  environment.url;

  constructor(private httpClient : HttpClient) { }


  list(){
    return this.httpClient.get(`${this.url}/entries`);
  }
}
