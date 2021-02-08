import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  verNotas:boolean;
  errorValidacion:boolean
  inputNom=""
  inputTel:number
  inputEmail:string
  inputNotas:string
  personas:Array<any>
  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController) {
    this.personas=[]
    this.verNotas=false
    this.errorValidacion=false
  }

  async exito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Confirmacion',
      message: 'Contacto añadido con exito',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Desea agregar dicho contacto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.agregarPersona();
            
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarConfirm(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Desea eliminar: '+this.personas[i].nombre,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.elimiarPersona(i);
          }
        }
      ]
    });

    await alert.present();
  }

  agregarPersona(){
    if(this.inputTel!=null && this.inputNom!="" && this.inputEmail!="" && this.inputNotas!=""){
      let newPersona={nombre:this.inputNom,telefono:this.inputTel,email:this.inputEmail,notas:this.inputNotas}
      this.personas.push(newPersona)
      this.inputTel=null
      this.inputNom=""
      this.inputEmail=""
      this.inputNotas=""
      this.errorValidacion=false
      this.exito();
    }
    else if(this.inputTel==null || this.inputNom=="" || this.inputEmail=="" || this.inputNotas==""){
      this.errorValidacion=true
    }
    
  }

  elimiarPersona(i){
    this.personas.splice(i,1);
  }
}