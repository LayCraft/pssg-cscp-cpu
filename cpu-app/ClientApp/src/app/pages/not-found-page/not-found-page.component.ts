import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
/** NotFound component*/
export class NotFoundPageComponent {
  /** NotFound ctor */
  constructor(private router: Router) {
    this.router.navigateByUrl("/404");

  }
}
