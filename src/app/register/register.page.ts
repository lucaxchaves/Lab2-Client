import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  register(form){
    this.authService.register(form.value).subscribe();
  }
}
