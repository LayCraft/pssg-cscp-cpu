import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  window = window;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
