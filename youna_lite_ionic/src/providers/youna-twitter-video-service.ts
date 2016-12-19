import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YounaTwitterVideoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YounaTwitterVideoService {

  public data : any;
  public email_response : any;
  constructor(public http: Http) {
    console.log('Hello YounaTwitterVideoService Provider');
  }

  public load(username) {
      if (this.data) {
        // already loaded data
        return Promise.resolve(this.data);
      }

      // don't have the data yet
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get('https://o2uzqo7yv2.execute-api.us-east-1.amazonaws.com/test/get_video_questions_from_twitter?username=' + username)
          .map(res => res.json())
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            console.log(data);
            this.data = data;
            resolve(this.data);
          });
      });
  }

  public send(body) {
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.post('https://o2uzqo7yv2.execute-api.us-east-1.amazonaws.com/test/send_email_with_links', body)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      });
  }
}
