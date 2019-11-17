import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  @Input() usuario: Usuario;
  @Output() edit : EventEmitter<Usuario> = new EventEmitter();
  @Output() remove : EventEmitter<Usuario> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {}


  doRemove(){
    this.remove.emit(this.usuario);
  }

  doEdit(){
    this.edit.emit(this.usuario);
  }
}
