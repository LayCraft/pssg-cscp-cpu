import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { iDynamicsDocument, iDynamicsFile } from '../../core/models/dynamics-file.interface';
import { NotificationQueueService } from '../../core/services/notification-queue.service';

interface FileBundle {
  // list of file names (same order as file array)
  fileName: string[];
  // base64 encoded file turned into a string
  fileData: string[];
}
@Component({
  selector: 'app-sign-contract',
  templateUrl: './sign-contract.component.html',
  styleUrls: ['./sign-contract.component.css']
})
export class SignContractComponent implements OnInit {

  // collect the element reference from the child so that we can access native parts of the files element
  @ViewChild('files')
  myInputVariable: ElementRef;

  // is this uploading/saving
  saving: boolean = false;
  currentStepperElement: iStepperElement;

  constructor(
    private fileService: FileService,
    private stepperService: IconStepperService,
    private router: Router,
    private stateService: StateService,
    private notificationQueueService: NotificationQueueService,
  ) { }

  ngOnInit() {
    this.stepperService.currentStepperElement.subscribe(s => this.currentStepperElement = s);
    this.constructDefaultstepperElements();
  }

  save() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      console.log('Saved');
    }, 100);
    // this.out = convertProgramApplicationToDynamics(this.trans);
    // this.programApplicationService.setProgramApplication(this.out).subscribe(
    //   r => {
    //     console.log(r);
    //     this.notificationQueueService.addNotification(`You have successfully saved the program application.`, 'success');
    //     this.router.navigate(['/authenticated/dashboard']);
    //   },
    //   err => {
    //     console.log(err);
    //     this.notificationQueueService.addNotification('The program application could not be saved. If this problem is persisting please contact your ministry representative.', 'danger');
    //     this.saving = false;
    //   }
    // );
  }
  exit() {
    // if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
    this.router.navigate([this.stateService.homeRoute.getValue()]);
    // }
  }
  constructDefaultstepperElements() {
    // clean out the old things that might be living in the stepper.
    this.stepperService.reset();
    // write the default beginning
    [
      {
        itemName: 'Download',
        formState: 'untouched',
        object: null,
        discriminator: 'download',
      },
      {
        itemName: 'Upload',
        formState: 'untouched',
        object: null,
        discriminator: 'upload',
      }
    ].forEach((f: iStepperElement) => {
      this.stepperService.addStepperElement(f.object, f.itemName, f.formState, f.discriminator);
    });

    // put the page naviagation to the first page
    this.stepperService.setToFirstStepperElement();
  }

  ///----------------------------------ALL THINGS BELOW ARE FOR FILE UPLOAD ----- DO NOT DELETE
  // what are the names of the files in the filedata array
  fileNames: string[] = [];
  // base64 encoded file turned into a string
  fileData: string[] = [];
  removeFile(i: number) {
    //remove the file from the collection at this index
    this.fileNames.splice(i, 1);
    this.fileData.splice(i, 1);
  }
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
  // onFileAdded(files: FileList): void {
  //   let fileName = files[0].name;
  //   let fileData = files[0].size;
  //   files[0].name
  // }
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
    this.fileService.download('fd889a40-14b2-e811-8163-480fcff4f621', '9e9b5111-51c9-e911-b80f-00505683fbf4', 'aa041c5d-4d3e-ea11-b814-00505683fbf4')
      .subscribe(
        (d: iDynamicsFile) => {
          console.log(d);
          if (d['error'] && d['error']['code']) {
            // something has gone wrong. Show the developer the error
            alert(d['error']['code'] + ': There has been a data problem retrieving this file. Please let your ministry contact know that you have seen this error.');
            console.log('Dynamics has returned: ', d);
          } else if (d.DocumentCollection.length === 0) {
            this.notificationQueueService.addNotification('There are no files available to download. Please let your ministry contract know that you cannot download the contract.');
            console.log('No files to download');
          } else {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + d.DocumentCollection[0].body);
            element.setAttribute('download', d.DocumentCollection[0].filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        }
      );
  }
}
