import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  ngOnInit() {
  }
 constructor(public http: HttpClient, private router:Router,  private cookieService: CookieService) {

   }



// login  API starts here
req:any;
objRes : any;
// obj : any;
userName:any;
userPassword:any;
 showHide : boolean = true;
 cookieValue = 'UNKNOWN';
login()

{
	this.showHide = false;
	const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
console.log("Value sent to api is");
var body = {
	username: this.userName,
	password: this.userPassword
};
console.log(body);
this.req = this.http.post('http://127.0.0.1:5000/auth', JSON.stringify(body), httpOptions)
.subscribe  (
  res => {
		// do shit with response  
		this.objRes = res;
		console.log(this.objRes.access_token);
		  this.cookieService.set( 'Test', this.objRes.access_token );
    	this.cookieValue = this.cookieService.get('Test');
		// this.showHide = false;
		// console.log("value of showHide " + this.showHide);
		 this.router.navigate(["photo-upload"]);
		 console.log("Cookie Value is: " + this.cookieValue);


  },
  err => {
    console.log("Error Occured in LOGIN APi ");
  })
}


// login API ends here


}
