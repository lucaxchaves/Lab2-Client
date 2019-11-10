import { Component, OnInit } from '@angular/core';
import { CarrosService } from '../services/carros.service';
import { ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-carros',
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
})
export class CarrosPage implements OnInit {
  carros : Carro[];
  
  constructor(private carrosService: CarrosService, public modalController : ModalController) { }

  ngOnInit() {
    this.loadCarList();
  }

  private loadCarList(){
    this.carrosService.list().subscribe((res)=>{
      this.carros  = res as Carro[];
    });
  }

  doRefresh(event){
    setTimeout(() => {
      this.loadCarList();
      event.target.complete();
    }, 200);
  }

  async presentForm(){
    const modal = await this.modalController.create({
      component: FormComponent,
    });
    return await modal.present();
  }

  async updateForm(carro){
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps: {
        carro:carro
      }
    });
    return await modal.present();
  }

}
