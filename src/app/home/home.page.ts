import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  navigate: any;

  constructor() {}

  sideMenu(){
    this.navigate = [
      {
        title: "Carros",
        url: "/carros",
        icon: "home"
      }
    ]
  }
}
