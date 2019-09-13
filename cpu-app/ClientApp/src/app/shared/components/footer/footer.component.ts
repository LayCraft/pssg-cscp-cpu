import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VersionInfoDialog } from '../version-info/version-info.component';
import { VersionInfo } from 'src/app/models/version-info.model';
import { VersionInfoDataService } from '../../../services/version-info-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public versionInfo: VersionInfo;

  constructor(
    private dialog: MatDialog,
    private versionInfoDataService: VersionInfoDataService,
  ) { }

  ngOnInit() {
  }
  loadVersionInfo() {
    this.versionInfoDataService.getVersionInfo()
      .subscribe((versionInfo: VersionInfo) => {
        this.versionInfo = versionInfo;
      });
  }
  showVersionInfo(): void {
    this.dialog.open(VersionInfoDialog, {
      data: this.versionInfo
    });
  }
}
