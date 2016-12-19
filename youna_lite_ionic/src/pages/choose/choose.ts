import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { CreateTweetPage } from '../create-tweet/create-tweet';
import { QuestionsPage } from '../questions/questions';
/*
  Generated class for the Choose page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  public username : any;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.username = params.get("username");
  }

  ionViewDidLoad() {
    console.log('Hello ChoosePage Page');
  }

  public onStartNewSubmit() {
    this.navCtrl.push(CreateTweetPage, { username : this.username});
  }

  public onViewVideosSubmit() {
    this.navCtrl.push(QuestionsPage, {username : this.username});
  }

}
