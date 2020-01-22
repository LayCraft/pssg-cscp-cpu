import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services/file.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }
  ngOnInit() { }
  upload() {
    this.fileService.download('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4').subscribe((d) => console.log('Upload', d));
  }
  download() {
    this.fileService.upload(null, null, null).subscribe((d) => console.log('Download', d));
  }
}
