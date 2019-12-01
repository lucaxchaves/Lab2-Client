import { Component, OnInit, Input } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import { CarrosService } from 'src/app/services/carros.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-carro-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() carro: Carro;
  myForm: FormGroup;
  name:FormControl = new FormControl('', Validators.required);
  model:FormControl = new FormControl('', Validators.required);
  plate:FormControl = new FormControl('', Validators.pattern("\\w{3}-\\d{4}"));
  year:FormControl = new FormControl('', Validators.required);
  
  constructor(private service : CarrosService, public modalController : ModalController, private formBuilder : FormBuilder) {
    if(this.carro == undefined){
      this.create();
    }
    this.myForm = this.formBuilder.group({
      name: this.name, 
      model: this.model,
      plate: this.plate,
      year: this.year
    }); 
  }

  ngAfterViewInit(){
    this.edit();
  }

  private edit(){
    this.myForm.patchValue({
      name: this.carro.name,
      model: this.carro.model,
      plate: this.carro.plate,
      year: this.carro.year
    });
    this.myForm.updateValueAndValidity()
  }
  private create(){
    this.carro =  {
      id:0,
      name:"",
      model: "",
      plate: "",
      year:0
    };
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
