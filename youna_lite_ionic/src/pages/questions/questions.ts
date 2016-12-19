import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YounaTwitterVideoService } from '../../providers/youna-twitter-video-service';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

declare var cordova : any;
/*
  Generated class for the Questions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
  providers: [YounaTwitterVideoService]
})

export class QuestionsPage {

  public username : any;
  public tweet: any;
  public questions: any;
  public emails_added: any;
  public question_ids_added: any;
  constructor(public navCtrl: NavController, public navParams:  NavParams, public younTwitterVideoService: YounaTwitterVideoService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
     this.username = navParams.get('username');
     this.loadQuestions();
     this.emails_added = 0;
     this.question_ids_added = {};
  }

  sendEmail(data) {
    let loading = this.loadingCtrl.create({
                    content: 'Sending Email...'
                  });
    loading.present();
    this.younTwitterVideoService.send(data)
      .then(data=> {
        loading.dismiss();
        let alert = this.alertCtrl.create({
              title: 'YOU&A',
              subTitle: "Email Sent",
              buttons: ['OK']
        });
        alert.present();
      })
  }

  isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  }

  emailVideos(email) {
      var data = [];
      var response = {
        email : email
      };
      for ( var i = 0; i < this.questions.length; i++) {
        if ( this.question_ids_added[this.questions[i].id] === true) {
          var temp = {
            url : this.questions[i].url,
            screen_name : this.questions[i].user.screen_name,
            text : this.questions[i].text
          };
          data.push(temp);
        }
      }
      response["data"] = data;
      this.sendEmail(response);
  }

  emailVideosDriver() {
    if (this.emails_added === 0) {
      let alert = this.alertCtrl.create({
        title: 'YOU&A',
        subTitle: "There are no videos added.",
        buttons: ['OK']
      });
      alert.present();
    } else {
      let prompt = this.alertCtrl.create({
        title: 'Please enter your email!',
        inputs: [
          {
            name: 'email',
            placeholder: 'jon@doe.com'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              if (this.isValidEmail(data.email)) {
                this.emailVideos(data.email)
              } else {
                let alert = this.alertCtrl.create({
                      title: 'YOU&A',
                      subTitle: 'Please enter a valid email!',
                      buttons: ['OK']
                });
                alert.present();
              }
            }
          }
        ]
      });
      prompt.present();
    }
  }

  loadQuestions() {
    let loading = this.loadingCtrl.create({
                    content: 'Fetching Tweets...'
                  });
    loading.present();
    this.younTwitterVideoService.load(this.username)
      .then(data => {
        loading.dismiss();
        if (data.tweet != undefined && data.questions != undefined) {
          this.tweet = data.tweet;
          this.questions = data.questions;
        } else {
          let alert = this.alertCtrl.create({
                title: 'YOU&A',
                subTitle: "Couldn't find a You&A tweet.",
                buttons: ['OK']
          });
          alert.present();
        }
      });
  }

  ionViewDidLoad() {
    console.log('Hello QuestionsPage Page');
  }

  addToEmailList(question_id) {
    let toast;
    if (this.question_ids_added[question_id] === undefined) {
      this.question_ids_added[question_id] = true; 
      toast = this.toastCtrl.create({
        position: 'top',
        message: 'Added the video to the list.',
        duration: 3000
      });
      this.emails_added++;
    } else {
      toast = this.toastCtrl.create({
        position: 'top',
        message: 'Video already added to the list!',
        duration: 3000
      });
    }

    toast.present();
  }

}
