import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registro2',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  @Input() registro :Registro;

  constructor() { }

  ngOnInit() {}

}
