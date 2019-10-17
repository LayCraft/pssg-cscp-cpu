import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MainService } from '../core/services/main.service';
import { Transmogrifier } from '../core/models/transmogrifier.class';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // store the results
  response: any;

  // this should query the test api
  apiUrl = 'api/justice/test';

  constructor(
    private mainService: MainService,
  ) { }
  ngOnInit() {
    // returns the transmogrified
    this.mainService.getBlob().subscribe(s =>
      this.response = new Transmogrifier(s)
    );
  }
}
