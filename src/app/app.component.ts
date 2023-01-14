import { Component, VERSION, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, concatMap, exhaustMap, switchMap } from 'rxjs/operators';

import { forkJoin, lastValueFrom } from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private httpClient: HttpClient) {}

  userDetail: any;
  authorDetailsRes: any;
  posts: any[];
  authors: any[];
  userDetails: any[];

  ngOnInit() {
    //https://www.tektutorialshub.com/angular/valuechanges-in-angular-forms/#:~:text=The%20ValueChanges%20is%20an%20event,time%20and%20respond%20to%20them.
    // this.httpClient
    //   .get('https://jsonplaceholder.typicode.com/posts/1')
    //   .subscribe((res: any) => {
    //     // console.log(res)
    //     const userId = res.userId;
    //     this.httpClient
    //       .get('https://jsonplaceholder.typicode.com/users/' + userId)
    //       .subscribe((userDetail) => {
    //         console.log(userDetail);
    //       });
    //   });
    /**** Scenario 1 : MergeMap usage */
    // this.httpClient
    //   .get('https://jsonplaceholder.typicode.com/posts/1')
    //   .pipe(
    //     switchMap((res: any) =>
    //       this.httpClient.get(
    //         'https://jsonplaceholder.typicode.com/users/' + res.userId
    //       )
    //     )
    //   )
    //   .subscribe(
    //     (authorDetails: any) => console.log(authorDetails)
    //   );
    /**** Scenario 2 : ForkJoin usage */
    // forkJoin([
    //   this.httpClient.get('https://jsonplaceholder.typicode.com/posts'),
    //   this.httpClient.get('https://jsonplaceholder.typicode.com/users'),
    // ]).subscribe((res) => {
    //   console.log(res);
    // });

    /**** Converting Observables to Promise */

    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .toPromise()
      .then((res: any) => {
        this.httpClient
          .get('https://jsonplaceholder.typicode.com/users/' + res.userId)
          .toPromise()
          .then((authorDetailsRes) => {
            console.log(authorDetailsRes);
          });
      });
  }
}
