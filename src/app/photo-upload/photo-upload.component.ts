import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})

export class PhotoUploadComponent implements OnInit {
show : boolean;
tmp:any;
cookieValue :  any;
getFileName:any;
JWT:any;
req:any;

  constructor(public http: HttpClient, private cookieService: CookieService) {
}
image:any;
  ngOnInit() {

this.cookieValue = this.cookieService.get('Test');
      console.log("Value of gloabl cookiexxx: " + this.cookieValue);
    this.JWT = this.cookieValue;
    
  }
  uploadImage()
  {
    console.log(this.image);
    console.log("JWT is: " + this.JWT);



      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': 'JWT ' + this.JWT,

  })
};
var body = {

  "imageUrl" : "https://image-catalog.s3.amazonaws.com/" + this.image,

};
console.log(body);
this.req = this.http.post('http://127.0.0.1:5000/uploadImage', JSON.stringify(body), httpOptions)
.subscribe  (
  res => {
    // do shit with response  
  console.log("API CALLED");
  console.log(res);


  },
  err => {
    console.log("Error Occured in LOGIN APi ");
  })
  }
 
  fileEvent(fileInput: any) {


  console.log("Fired");
  const AWSService = AWS;
  const region = 'us-east-1';
  const bucketName = 'image-catalog';
  const IdentityPoolId = 'us-east-1:096a3693-e45a-4f84-a3f4-8e52d467c714';
  const file = fileInput.target.files[0];
//Configures the AWS service and initial authorization
  AWSService.config.update({
    region: region,
    credentials: new AWSService.CognitoIdentityCredentials({
     IdentityPoolId: IdentityPoolId
    })
  });
//adds the S3 service, make sure the api version and bucket are correct
  const s3 = new AWSService.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucketName}
  });
//I store this in a variable for retrieval later
  this.image = file.name;

  console.log("Name of Image: " + this.image);
    this.show = true; 
    
  s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
   if (err) {
     console.log(err, 'there was an error uploading your file');
   }
   else {
   	console.log("Done");

     this.getFileName = file.name

 // this.cookieValue = this.cookieService.get('Test');
 //      console.log("Value of gloabl cookie: " + this.cookieValue);

 //      var JWT = this.cookieValue;
 //      console.log("JWT is: " + JWT);

// console.log("Value of REAL JWT is : " + JWT + " and image name is: " + file.name);
// var fileName = file.name;
// console.log("The value of fileName: " + fileName);











    
     this.show = false;
 
	console.log("Value of show : " + this.show);
   }
   console.log("Val of show outside: " + this.show);
 });
  console.log("The value of show more outside 2 : " + this.show);
}

}
