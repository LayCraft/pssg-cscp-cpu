import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('navbarSupportedContent', { static: false }) navbarSupportedContent: ElementRef;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  // toggle collapse class when user clicks on navbar button
  toggleMenu() {
    if (this.navbarSupportedContent) {
      this.navbarSupportedContent.nativeElement.classList.toggle('collapse');
    }
  }

  // collapse menu when user clicks on a link
  closeMenu() {
    if (this.navbarSupportedContent) {
      // NB - class is only added once
      this.navbarSupportedContent.nativeElement.classList.add('collapse');
    }
  }
}
