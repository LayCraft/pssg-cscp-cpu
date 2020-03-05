import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './login.component.html'
})
export class LoginPageComponent implements OnInit {
  window = window;
  constructor(private router: Router) {
    console.log("login page...");
   }

  ngOnInit() {
  }
}
