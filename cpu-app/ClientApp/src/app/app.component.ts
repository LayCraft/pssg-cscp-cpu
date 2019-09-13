import { Component, OnInit } from '@angular/core';

import { VersionInfo } from './models/version-info.model';
import { isDevMode } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public versionInfo: VersionInfo;
  public isNewUser: boolean;
  public isDevMode: boolean;

  constructor() {
    this.isDevMode = isDevMode();
  }

  ngOnInit(): void {
  }


  isIE10orLower() {
    let result, jscriptVersion;
    result = false;

    jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')();

    if (jscriptVersion !== undefined) {
      result = true;
    }
    return result;
  }
}
