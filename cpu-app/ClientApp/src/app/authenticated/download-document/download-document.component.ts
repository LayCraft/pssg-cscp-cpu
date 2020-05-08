import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { iDynamicsFile, iDynamicsDocument } from '../../core/models/dynamics-blob';
import { iDynamicsPostFile, iDynamicsDocumentPost } from '../../core/models/dynamics-post';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../core/form-helper';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { Subscription } from 'rxjs';

interface FileBundle {
  // list of file names (same order as file array)
  fileName: string[];
  // base64 encoded file turned into a string
  fileData: string[];
}
@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css']
})
export class DownloadDocumentComponent implements OnInit, OnDestroy {

  // collect the element reference from the child so that we can access native parts of the files element
  @ViewChild('files')
  myInputVariable: ElementRef;

  // is this uploading/saving
  saving: boolean = false;
  stepperElements: iStepperElement[];
  currentStepperElement: iStepperElement;
  stepperIndex: number = 0;

  documentCollection: iDynamicsDocument[] = [];
  documentsToAdd: iDynamicsDocument[] = [];
  // what are the names of the files in the filedata array
  fileNames: string[] = [];
  // how large each file is in bytes
  fileSizes: string[] = [];
  // base64 encoded file turned into a string
  fileData: string[] = [];

  trans: Transmogrifier;
  contractNumber: string;
  organizationId: string;
  userId: string;
  contractId: string;
  private stateSubscription: Subscription;

  private formHelper = new FormHelper();
  constructor(
    private fileService: FileService,
    private stepperService: IconStepperService,
    private router: Router,
    private stateService: StateService,
    private notificationQueueService: NotificationQueueService,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.trans = m;
    });

    this.stepperService.currentStepperElement.subscribe(s => this.currentStepperElement = s);
    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      this.userId = this.stateService.main.getValue().userId;
      this.organizationId = this.stateService.main.getValue().organizationId;
      // collect the "contract id" which is the id included with the task.
      this.contractId = p['taskId'];

      this.contractNumber = this.trans.contracts.find(c => c.contractId == this.contractId).contractNumber;



      this.fileService.download(this.organizationId, this.userId, this.contractId).subscribe(
        (d: iDynamicsFile) => {
          console.log(d);
          if (d['error'] && d['error']['code']) {
            // something has gone wrong. Show the developer the error
            alert(d['error']['code'] + ': There has been a data problem retrieving this file. Please let your ministry contact know that you have seen this error.');
            console.log('Dynamics has returned: ', d);
          } else {
            this.documentCollection = d.DocumentCollection;
          }
        }
      );
      //
      this.constructDefaultstepperElements();
    });

    this.stepperService.stepperElements.subscribe(e => this.stepperElements = e);
    this.stepperService.currentStepperElement.subscribe(e => {
      this.currentStepperElement = e;

      if (this.currentStepperElement && this.stepperElements) {
        this.stepperIndex = this.stepperElements.findIndex(e => e.id === this.currentStepperElement.id);
      }
    });

  }

  submit() {
    this.notificationQueueService.addNotification(`TODO`, 'success');
  }
  exit() {
    if (this.formHelper.isFormDirty() && confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
    else {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
  constructDefaultstepperElements() {
    // clean out the old things that might be living in the stepper.
    this.stepperService.reset();
    // write the default beginning
    [
      {
        itemName: 'Download File',
        formState: 'untouched',
        object: null,
        discriminator: 'download',
      },
      // {
      //   itemName: 'Upload File',
      //   formState: 'untouched',
      //   object: null,
      //   discriminator: 'upload',
      // }
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
    this.documentsToAdd.splice(i, 1);
  }
  upload() {
    this.saving = true;
    // assemble the file into a collection to return to dynamics
    const file: iDynamicsPostFile = {
      Businessbceid: this.organizationId,
      Userbceid: this.userId,
      DocumentCollection: this.documentsToAdd
    }
    this.fileService.upload(file).subscribe((d) => {
      this.saving = false;
      this.documentsToAdd = [];
      this.notificationQueueService.addNotification(`Documents successfully uploaded.`, 'success');
      console.log('Uploaded', d);
    });
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

            this.documentsToAdd.push({
              filename: files.item(i).name,
              body: reader.result.toString()
            });
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
  downloadDocument(doc: iDynamicsDocument) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + doc.body);
    element.setAttribute('download', doc.filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
  setNextStepper() {
    ++this.stepperIndex;
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
  setPreviousStepper() {
    --this.stepperIndex;
    this.stepperService.setCurrentStepperElement(this.stepperElements[this.stepperIndex].id);
  }
}
