import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registros: Registro[];

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
    this.loadRegistroList();
  }

  private loadRegistroList(){
    this.registroService.list().subscribe((res)=>{
      this.registros  = res as Registro[];
    });
  }
  doRefresh(event){
    setTimeout(() => {
      this.loadRegistroList();
      event.target.complete();
    }, 200);
  }

}
