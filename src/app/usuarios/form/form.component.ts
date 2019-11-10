import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() usuario:Usuario;



  constructor() { }

  ngOnInit() {}

}
