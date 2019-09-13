import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VersionInfoDataService } from './services/version-info-data.service';
import { User } from './models/user.model';
import { VersionInfo } from './models/version-info.model';
import { isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/filter';
import { VersionInfoDialog } from './shared/components/version-info/version-info.component';

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
