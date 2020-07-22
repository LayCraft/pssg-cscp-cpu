import { Component, enableProdMode } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cpu-public-app';

  constructor() {
    console.log("doing inital setup");
    if (environment.production) {
      enableProdMode();
      if (window) {
        window.console.log = function () { };
      }
    }
  }
}
