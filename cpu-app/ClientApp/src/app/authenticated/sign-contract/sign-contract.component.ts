import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { IconStepperService, iStepperElement } from '../../shared/icon-stepper/icon-stepper.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { iDynamicsFilePost, iDynamicsDocumentPost } from '../../core/models/dynamics-post';
import { iDynamicsFile } from '../../core/models/dynamics-file.interface';

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

  // what are the names of the files in the filedata array
  fileNames: string[] = [];
  // how large each file is in bytes
  fileSizes: string[] = [];
  // base64 encoded file turned into a string
  fileData: string[] = [];

  //TODO: take out all of this hard coding otherwise the village of burns lake is going to be annoyed. >:-(
  organizationId: string = 'fd889a40-14b2-e811-8163-480fcff4f621';
  userId: string = '9e9b5111-51c9-e911-b80f-00505683fbf4';
  contractId: string = 'aa041c5d-4d3e-ea11-b814-00505683fbf4';

  constructor(
    private fileService: FileService,
    private stepperService: IconStepperService,
    private router: Router,
    private stateService: StateService,
    private notificationQueueService: NotificationQueueService,
  ) { }

  ngOnInit() {
    this.stepperService.currentStepperElement.subscribe(s => this.currentStepperElement = s);
    // TODO: save credentials for postback
    // this.organizationId = this.stateService.main.getValue().organizationId;
    // this.userId = this.stateService.main.getValue().userId;
    // collect the contract number from the route.

    this.constructDefaultstepperElements();
  }

  save() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      console.log('Saved');
    }, 100);
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
        itemName: 'Download Contract',
        formState: 'untouched',
        object: null,
        discriminator: 'download',
      },
      {
        itemName: 'Upload Contract',
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
  removeFile(i: number) {
    //remove the file from the collection at this index
    this.fileData.splice(i, 1);
    this.fileNames.splice(i, 1);
    this.fileSizes.splice(i, 1);
  }
  upload() {
    // assemble the file into a collection to return to dynamics
    const file: iDynamicsFilePost = {
      Businessbceid: this.organizationId,
      Userbceid: this.userId,
      DocumentCollection: this.fileNames.map((fileName: string, i: number): iDynamicsDocumentPost => {
        return { filename: fileName, body: this.fileData[i] }
      })
    }
    this.fileService.upload(this.contractId, file).subscribe((d) => console.log('Uploaded', d));
  }

  fakeBrowseClick(): void {
    // the UI element for the native element is completely useless and ugly so we hide it and fake the user click.
    this.myInputVariable.nativeElement.click();
  }
  onFilesAdded(files: FileList): void {
    // this is built intially to support multiple files but I'm returning it to single files
    const fileNames = this.fileNames;
    const fileSizes = this.fileSizes;
    const fileData = this.fileData;
    // for each file added we go through the same conversion process.
    for (let i = 0; i < files.length; i++) {
      // convert the file to base64 for upload
      const reader: FileReader = new FileReader();
      // if there is a big file  don't add it.
      if (files.item(i).size > 10000000) {
        this.notificationQueueService.addNotification(`The file "${files.item(i).name}" is too large. If this is an image or collection of images please add compression or lower the resolution.`, 'danger');
      } else {
        reader.readAsDataURL(files.item(i));
        reader.onload = () => {
          const fileNumber = fileNames.indexOf(files.item(i).name);
          if (fileNumber >= 0) {
            // save the result over the old result
            fileData[fileNumber] = reader.result.toString();
            fileSizes[fileNumber] = this.toFileSize(files.item(i).size)

          } else {
            // push a fresh file name and file contents
            fileNames.push(files.item(i).name);
            fileData.push(reader.result.toString());
            fileSizes.push(this.toFileSize(files.item(i).size));
          }
        };
        reader.onerror = error => console.log('Error: ', error);
      }
    }
    this.fileData = fileData;
    this.fileSizes = fileSizes;
    this.fileData = fileData;
  }

  download() {
    this.fileService.download(this.organizationId, this.userId, this.contractId)
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
  toFileSize(bytes: number): string {
    let fileSize: string = "0 bytes";
    if (bytes >= 1073741824) { fileSize = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { fileSize = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { fileSize = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { fileSize = bytes + " bytes"; }
    else if (bytes == 1) { fileSize = bytes + " byte"; }
    return fileSize;
  }
}
