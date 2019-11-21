import { Component } from '@angular/core';
import { GateService } from '../gate.service';
import { Gate } from '../gate';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gate : Gate;

  constructor(private gateService : GateService, private alertController:AlertController) {}

  doRefresh(event){
    setTimeout(() => {
      this.loadGate();
      event.target.complete();
    }, 200);
  }


  loadGate(){
    this.gateService.load().subscribe(res=> this.gate = res as Gate);
  }

  ngOnInit(){
    this.loadGate(); 
    setInterval(() => {
      this.loadGate();
    }, 10000);
  }
 
  async gateClick(){
    let isOpen = this.isOpen();
    const alert = await this.alertController.create(
      {
        header: `Deseja ${isOpen ? "fechar" : "abrir" } o portão?`,
        buttons: [
          {
            text: "Sim",
            handler: () =>{
              this.gateService.changeStatus(isOpen).subscribe(
                () => this.loadGate()
              );
              
            }
          },
          {
            text: "Não",
            role: "cancel",
            cssClass: "secondary"
          }
        ]
      }
    );
    await alert.present();

  }

  private isOpen(){
    return this.gate && this.gate.status == 1;
  }

}
