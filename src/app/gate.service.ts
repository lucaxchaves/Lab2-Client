import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gate } from './gate';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GateService {
  url = environment.url;
  constructor(private httpClient : HttpClient) { }

  load(){
    return this.httpClient.get(`${this.url}/gate`).pipe(
      tap(res=>{
        
       return res;
      }), catchError(e=>{
        throw e;
      })
    )
  }
}
