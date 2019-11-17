import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Usuario } from './usuario';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[];
  constructor(private usersService : UsuariosService,public alertController:AlertController, public modalController :ModalController) { }

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
  async remove(usuario:Usuario){
    await this.confirmRemove(usuario);
  }


  async confirmRemove(usuario:Usuario){
    const alert = await this.alertController.create(
      {
        header: "Confirma exclusão?",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary"
          },
          {
            text: "Sim",
            handler: () =>{
              this.usersService.delete(usuario).subscribe(
              res=>this.loadUsersList());
              
            }
          }
        ]
      }
    );
    await alert.present();

  }

  async edit(usuario:Usuario){
    await this.updateForm(usuario);
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
