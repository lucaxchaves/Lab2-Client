import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss'],
})
export class CarroComponent implements OnInit {
  @Input() carro: Carro;
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }




}
