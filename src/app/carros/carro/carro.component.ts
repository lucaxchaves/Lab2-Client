import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss'],
})
export class CarroComponent implements OnInit {
  @Input() carro: Carro;
  @Output() edit :EventEmitter<Carro> = new EventEmitter();
  @Output() remove:EventEmitter<Carro> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  doRemove(){ 
    this.remove.emit(this.carro);
  }
  doEdit(){
    this.edit.emit(this.carro);
  }



}
