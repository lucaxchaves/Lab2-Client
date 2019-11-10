import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { Usuario } from './usuario';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[];
  constructor(private usersService : UsuariosService, public modalController :ModalController) { }

  ngOnInit() {
    this.loadUsersList();
  }

  private loadUsersList(){
    this.usersService.list().subscribe((res)=>{
      this.usuarios =  res as Usuario[];
    });
  }
  
  doRefresh(event){
    setTimeout(() => {
      this.loadUsersList();
      event.target.complete();
    }, 200);
  }

  async presentForm(){
    const modal = await this.modalController.create({
      component: FormComponent
    });
    return await modal.present();
  }

  async updateForm(usuario: Usuario){
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps:{
        usuario: usuario
      }
    });
    return await modal.present();
  }
}
