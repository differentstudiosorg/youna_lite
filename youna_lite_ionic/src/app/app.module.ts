import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChoosePage } from  '../pages/choose/choose';
import { CreateTweetPage } from '../pages/create-tweet/create-tweet';
import { QuestionsPage } from '../pages/questions/questions';
import { FaqPage } from '../pages/faq/faq';
import { CopyTweetPage } from  '../pages/copy-tweet/copy-tweet';
import { YounaTwitterVideoService } from '../providers/youna-twitter-video-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChoosePage,
    CreateTweetPage, 
    QuestionsPage, 
    FaqPage,
    CopyTweetPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChoosePage,
    CreateTweetPage,
    QuestionsPage,
    FaqPage,
    CopyTweetPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, YounaTwitterVideoService]
})

export class AppModule {}
