import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CopyTweetPage } from '../copy-tweet/copy-tweet';

var MAX_CHARS = 140; 
var YOUNA = "#youna";
var SPACE = " ";

@Component({
  selector: 'page-create-tweet',
  templateUrl: 'create-tweet.html'
})
export class CreateTweetPage {

  public tweet : any;
  public username : any;
  public generated_tweet : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.tweet = "I am about to do a video Q&A. Reply...";
    this.username = navParams.get("username");
    var youna_username = YOUNA + "_" + this.username;
    var string_to_append = SPACE + YOUNA + SPACE + youna_username;
    this.generated_tweet = "I am about to do a video Q&A. Post video questions below, they'll be included in the YouTube video!" + string_to_append;
  }

  public onTweetSubmit() {

    var youna_username = YOUNA + "_" + this.username;
    var string_to_append = SPACE + YOUNA + SPACE + youna_username;
    var chars_occupied = string_to_append.length; 
    if (this.tweet.length + chars_occupied > MAX_CHARS ) {
        var num = this.tweet.length + chars_occupied - MAX_CHARS;
        let alert = this.alertCtrl.create({
            title: 'YOU&A',
            subTitle: 'Character length over by ' + num + ' characters',
            buttons: ['OK']
        });
        alert.present();
    } else {
      this.generated_tweet = this.tweet + string_to_append;
      let modal = this.modalCtrl.create(CopyTweetPage, { generated_tweet : this.generated_tweet});
      modal.present();
    }

  }

  ionViewDidLoad() {
    console.log('Hello CreateTweetPage Page');
  }

}