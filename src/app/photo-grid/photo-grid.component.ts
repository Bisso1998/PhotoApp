import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {
      cookieValue :any;
      req :any;
      objRes : any;
      images:any;


  myModel:any;

  constructor(private modalService: NgbModal, private cookieService: CookieService,public http: HttpClient,) { }
    closeResult: string;
    value: any = 2;

 p: number = 1;
 clearModel() {
   console.log("CLICKED MODEL");
   this.myModel = "";
 }
  ngOnInit() {
      this.cookieValue = this.cookieService.get('Test');
      console.log("Value of gloabl cookie: " + this.cookieValue);
      var JWT = this.cookieValue;

       const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + JWT,
  })
};
console.log("Headers sent : " + httpOptions.headers['Authorization']);
this.req = this.http.get('http://127.0.0.1:5000/getImages', httpOptions)
.subscribe  (
  res => {
    // do shit with response  
    this.objRes = res;
    this.images = this.objRes.result;


    console.log(this.images);
    // this.showHide = false;
    // console.log("value of showHide " + this.showHide);
     console.log("Cookie Value is: " + this.cookieValue);


  },
  err => {
    console.log("Error Occured in photo grid APi ");
  })

  }
    open(content) {

this.modalService.open(content).result.then((result) => {
    }, (reason) => {
       this.clearModel();
     
    });





    console.log("You content is : " + content);

    // this.modalService.open(content);
  }
}
