import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../usuario';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {UsuariosService} from '../../services/usuarios.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() usuario:Usuario;

  myForm: FormGroup;
  name: FormControl = new FormControl("", Validators.required);
  email: FormControl = new FormControl("", Validators.email);
  password: FormControl = new FormControl("", Validators.minLength(6));
  passwordConfirm: FormControl = new FormControl("", Validators.minLength(6));

  constructor(private formBuilder: FormBuilder, private service:UsuariosService, public modalController:ModalController) { 
    if(this.usuario==undefined){
      this.new();
    }else{
      this.edit(this.usuario);
    }
    this.myForm = formBuilder.group({
      "name":this.name,
      "email": this.email,
      "passwordConfirm": this.passwordConfirm,
      "password": this.password
    }); 
  }

  ngOnInit() {}

  private edit(usuario:Usuario){
    this.usuario = usuario;
    this.name.setValue(usuario.name);
    this.email.setValue(usuario.email);
    this.password.setValue(usuario.password);
    this.myForm.markAllAsTouched();
  }
  private new(){
    this.usuario = {
      id: 0,
      name: "",
      email: "",
      password: ""
    }
  }

  onSubmit(){

  }
}
