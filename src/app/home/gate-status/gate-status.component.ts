import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gate } from 'src/app/gate';

@Component({
  selector: 'app-gate-status',
  templateUrl: './gate-status.component.html',
  styleUrls: ['./gate-status.component.scss'],
})
export class GateStatusComponent implements OnInit {
  @Input() gate : Gate;
  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  lockClick(event){
    event.stopPropagation();
    this.click.emit();
  }
  

}
