import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Clipboard } from 'ionic-native';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the CopyTweet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-copy-tweet',
  templateUrl: 'copy-tweet.html'
})
export class CopyTweetPage {

  public generated_tweet:any;

  constructor(public viewCtrl: ViewController, public alertCtrl : AlertController, public navParams : NavParams) {
    this.generated_tweet = navParams.get('generated_tweet');
  }

  ionViewDidLoad() {
    console.log('Hello CopyTweetPage Page');
  }


  public copyToClipboard() {
    let alert = this.alertCtrl.create({
        title: 'YOU&A',
        subTitle: 'Tweet copied!',
        buttons: ['OK']
    });
    alert.present();
    Clipboard.copy(this.generated_tweet);
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
