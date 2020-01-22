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
      .subscribe((d: iDynamicsFile) => {
        d.DocumentCollection = d.DocumentCollection.map((c: iDynamicsDocument): iDynamicsDocument => {
          // decode from base64
          c.body = atob(c.body);
          return c;
        });
        console.log(d);
        // as of Jan 2020 ...
        // - IE11 can't open a "blob" URL
        // - Edge throws an error creating URL or referencing it
        // ... so call the MS-specific feature for them
        // const isMS = window.navigator.msSaveOrOpenBlob ? true : false; // check if IE, Edge, etc
        // if (isMS) {
        //   // save PDF file
        //   const filename = d.DocumentCollection[0].filename;
        //   window.navigator.msSaveOrOpenBlob(d.DocumentCollection[0].body, filename);
        // } else {
        //   // open PDF in new tab
        //   const tab = window.open();
        //   const url = URL.createObjectURL(d.DocumentCollection[0].body);
        //   tab.location.href = url;
        // }
      });
  }
}
