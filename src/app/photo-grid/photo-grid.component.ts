import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
    closeResult: string;
    value: any = 2;


  ngOnInit() {
  }
    open(content) {
    console.log("You content is : " + content);

    this.modalService.open(content);
  }
}
