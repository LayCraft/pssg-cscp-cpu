import { Component, OnInit } from '@angular/core';
class DummyForm {
  postal: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  form: DummyForm;
  postalPattern = /^[A-Za-z][0-9][A-Za-z][ ]?[0-9][A-Za-z][0-9]$/;
  constructor() {
    this.form = new DummyForm();
  }

  ngOnInit() {

  }
}
