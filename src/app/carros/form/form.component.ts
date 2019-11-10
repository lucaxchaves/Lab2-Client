import { Component, OnInit, Input } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import { CarrosService } from 'src/app/services/carros.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-carro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() carro: Carro;

  myForm: FormGroup;
  name = new FormControl("", Validators.required);
  model = new FormControl("", Validators.required);
  plate = new FormControl("", Validators.pattern("\\w{3}\\-\\d{4}"));
  year =  new FormControl("", Validators.required);
  constructor(private service : CarrosService, public modalController : ModalController, private formBuilder : FormBuilder) {
    if(this.carro==undefined){
      this.new();
    }else{
      this.edit(this.carro);
    }
    this.myForm = this.formBuilder.group({
      "name": this.name,
      "model": this.model,
      "plate": this.plate,
      "year": this.year
    }); 
    
  }

  new(){
    this.carro =  {
      id:0,
      name:"",
      model: "",
      plate: "",
      year:0
    };
    
  }

  edit(carro: Carro){
    this.carro = carro;
    this.name.setValue(carro.name);
    this.model.setValue(carro.model);
    this.plate.setValue(carro.plate);
    this.year.setValue(carro.plate);
    
  }

  ngOnInit() {}

  onSubmit(){
    this.carro.name = this.myForm.value.name;
    this.carro.model =  this.myForm.value.model;
    this.carro.plate =  this.myForm.value.plate;
    this.carro.year = this.myForm.value.year;

    this.service.save(this.carro).subscribe(x=>{
      console.log(x);
    });
    }
}
