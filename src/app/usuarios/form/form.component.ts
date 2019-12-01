import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../usuario';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';

import {UsuariosService} from '../../services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { passwordMatchValidator } from 'src/app/validators/password';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() usuario:Usuario;

  myForm: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.email  
  ]));
  oldPassword: FormControl = new FormControl('', Validators.minLength(6));
  password: FormControl = new FormControl('', Validators.minLength(6));
  passwordConfirm: FormControl = new FormControl('', Validators.compose([

  ]));

  constructor(private formBuilder: FormBuilder, private service:UsuariosService, public modalController:ModalController) { 
    if(this.usuario==undefined){
      this.create();
    }
    this.myForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      oldPassword: this.oldPassword,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    }); 
  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.edit();
  }

  private edit(){
    this.myForm.patchValue({
      name: this.usuario.name,
      email: this.usuario.email
    });
    this.myForm.updateValueAndValidity();
    this.myForm.markAsDirty();
  }

  private create(){
    this.usuario = {
      id: 0,
      name: "",
      email: "",
      password: "",
    }
  }

  
  onSubmit(){
    this.usuario.name =  this.myForm.value.name;
    this.usuario.email =  this.myForm.value.email;
    this.usuario.password =  this.myForm.value.password;
    this.myForm.setValidators(passwordMatchValidator);
    this.myForm.updateValueAndValidity();
    if(this.myForm.valid){
      
    }else{

    }
  }
}
