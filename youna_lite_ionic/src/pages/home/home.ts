import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChoosePage } from "../choose/choose";
import { FaqPage } from '../faq/faq';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public username : any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl : ModalController) {
    this.username = "";
  }

  public onSubmit() {
    if (this.username === "") {
        let alert = this.alertCtrl.create({
              title: 'YOU&A',
              subTitle: 'Please enter a valid username!',
              buttons: ['OK']
        });
        alert.present();
    } else {
        this.navCtrl.push(ChoosePage , { username : this.username });
    }
  }

  public presentModal() {
    let modal = this.modalCtrl.create(FaqPage);
    modal.present();
  }

}
