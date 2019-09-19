import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
class CgLiability {
  cglOption: string;
  constructor(x: string = '') {
    this.cglOption = x;
  }
}
@Component({
  selector: 'app-cg-liability',
  templateUrl: './cg-liability.component.html',
  styleUrls: ['./cg-liability.component.scss']
})
export class CgLiabilityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
