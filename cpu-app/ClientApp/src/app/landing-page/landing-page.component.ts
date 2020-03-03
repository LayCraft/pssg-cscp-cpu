import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../core/services/user-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  window = window;
  constructor(private router: Router,
    private userData: UserDataService) { 
    console.log("testing");
    this.userData.getCurrentUser().subscribe((res) => {
      console.log("user info...");
      console.log(res);
    });
  }

  ngOnInit() {
  }
}
