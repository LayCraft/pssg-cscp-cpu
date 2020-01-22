import { Component, OnInit } from '@angular/core';
import { FileService } from '../core/services/file.service';
import { iDynamicsFile, iDynamicsDocument } from '../core/models/dynamics-file.interface';

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
    this.fileService.upload(null, null, null).subscribe((d) => console.log('Upload', d));
  }
  download() {
    this.fileService.download('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4')
      .subscribe(
        (d: iDynamicsFile) => {
          let element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + atob(d.DocumentCollection[0].body));
          element.setAttribute('download', d.DocumentCollection[0].filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      );
  }
}

