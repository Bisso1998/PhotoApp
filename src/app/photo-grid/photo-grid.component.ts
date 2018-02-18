import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {


  myModel:any;

  constructor(private modalService: NgbModal) { }
    closeResult: string;
    value: any = 2;

 p: number = 1;
 clearModel() {
   console.log("CLICKED MODEL");
   this.myModel = "";
 }
  ngOnInit() {
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
