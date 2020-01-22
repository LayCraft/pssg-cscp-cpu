import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../core/services/download.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private downloadService: DownloadService
  ) { }
  ngOnInit() { }
  upload() {
    this.downloadService.download(null, null).subscribe((d) => console.log('Upload', d))
  }
  download() {
    this.downloadService.upload(null, null, null).subscribe((d) => console.log('Download', d))
  }
}
