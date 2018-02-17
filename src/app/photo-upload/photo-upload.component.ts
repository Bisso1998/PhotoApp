import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})

export class PhotoUploadComponent implements OnInit {
show : boolean;
tmp:any;
  constructor() {
}
image:any;
  ngOnInit() {
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
    
     this.show = false;
 
	console.log("Value of show : " + this.show);
   }
   console.log("Val of show outside: " + this.show);
 });
  console.log("The value of show more outside 2 : " + this.show);
}

}
