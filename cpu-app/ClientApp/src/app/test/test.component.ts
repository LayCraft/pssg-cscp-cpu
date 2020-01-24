import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileService } from '../core/services/file.service';
import { iDynamicsFile, iDynamicsDocument } from '../core/models/dynamics-file.interface';
interface FileBundle {
  // list of file names (same order as file array)
  fileName: string[];
  // base64 encoded file turned into a string
  fileData: string[];
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // collect the element reference from the child so that we can access native parts of the files element
  @ViewChild('files')
  myInputVariable: ElementRef;

  constructor(
    private fileService: FileService
  ) { }
  ngOnInit() { }

  ///----------------------------------ALL THINGS BELOW ARE FOR FILE UPLOAD ----- DO NOT DELETE
  // what are the names of the files in the filedata array
  fileNames: string[] = [];
  // base64 encoded file turned into a string
  fileData: string[] = [];

  upload() {
    const file: iDynamicsFile = {
      "Businessbceid": "fd889a40-14b2-e811-8163-480fcff4f621",
      "Userbceid": "9e9b5111-51c9-e911-b80f-00505683fbf4",
    };
    const documentCollection: iDynamicsDocument[] = this.fileNames.map((fileName: string, i: number): iDynamicsDocument => {
      return {
        filename: fileName,
        body: this.fileData[i]
      }
    });

    this.fileService.upload('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', file).subscribe((d) => console.log('Uploaded', d));
  }

  fakeBrowseClick(): void {
    // the UI element for the native element is completely useless and ugly so we hide it and fake the user click.
    this.myInputVariable.nativeElement.click();
  }
  onFilesAdded(files: FileList): void {
    // this is built intially to support multiple files but I'm returning it to single files
    this.fileNames = [];
    this.fileData = [];
    // for each file added we go through the same conversion process.
    for (let i = 0; i < files.length; i++) {
      // convert the file to base64 for upload
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(files.item(i));
      reader.onload = () => {
        if (this.fileNames.indexOf(files.item(i).name) >= 0) {
          // save the result over the old result
          this.fileData[this.fileNames.indexOf(files.item(i).name)] = reader.result.toString();
        } else {
          // push a fresh file name and file contents
          this.fileNames.push(files.item(i).name);
          this.fileData.push(reader.result.toString());
          // console.log('Adding new file');
        }
      };
      reader.onerror = error => console.log('Error: ', error);
    }
  }

  download() {
    this.fileService.download('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4')
      .subscribe(
        (d: iDynamicsFile) => {
          let element = document.createElement('a');
          element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + d.DocumentCollection[0].body);
          element.setAttribute('download', d.DocumentCollection[0].filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      );
  }
}

