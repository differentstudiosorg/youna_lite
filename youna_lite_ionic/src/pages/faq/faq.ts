import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})

export class FaqPage {

  constructor(public viewCtrl: ViewController, public app: App) {}

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello FaqPage Page');
  }

}
