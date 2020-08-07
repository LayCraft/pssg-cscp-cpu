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
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit, OnDestroy {

  // collect the element reference from the child so that we can access native parts of the files element
  @ViewChild('files')
  myInputVariable: ElementRef;

  // is this uploading/saving
  saving: boolean = false;

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
  isContractUpload: boolean = false;

  private ORGANIZATION_DOCUMENT_TYPES: string[] = ["Insurance", "General Service Agreement", "Annual Reports", "AGM Minutes", "Audited Financial Statements", "Counselor Support Plan", "Referral Protocol", "Financial", "Other", "Audit Letter for Contractor", "Audit Letter from Contractor", "Letter of Reference", "Invoice", "Direct Deposit Form"];
  private CONTRACT_DOCUMENT_TYPES: string[] = ["Referral Protocol", "Criminal Records Checks", "Custom Financial Report", "Expense Report (Invoices?)",
    "Activity Report", "Counsellor Support Plan", "Agency-run Statistics", "Surplus Plans"];

  document_types: string[] = [];
  selectedDocumentType: string = "";

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

    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      this.userId = this.stateService.main.getValue().userId;
      this.organizationId = this.stateService.main.getValue().organizationId;
      // collect the "contract id" which is the id included with the task.
      this.document_types = this.ORGANIZATION_DOCUMENT_TYPES;
      this.contractId = p['contractId'];
      if (this.contractId) {
        this.document_types = this.CONTRACT_DOCUMENT_TYPES;
        this.isContractUpload = true;
        this.contractNumber = this.trans.contracts.find(c => c.contractId == this.contractId).contractNumber;
      }
    });

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

  removeFile(i: number) {
    //remove the file from the collection at this index
    this.fileData.splice(i, 1);
    this.fileNames.splice(i, 1);
    this.fileSizes.splice(i, 1);
    this.documentsToAdd.splice(i, 1);
  }
  upload() {
    this.saving = true;

    this.documentsToAdd.forEach(doc => {
      if (doc.subject === "Other" && doc.subjectOther) {
        doc.subject = doc.subjectOther;
      }
    });
    // assemble the file into a collection to return to dynamics
    const file: iDynamicsPostFile = {
      Businessbceid: this.organizationId,
      Userbceid: this.userId,
      DocumentCollection: this.documentsToAdd
    }
    let record_id = this.isContractUpload ? this.contractId : this.trans.accountId
    if (this.isContractUpload) {
      this.fileService.uploadContractDocuments(file, record_id).subscribe((d) => {
        this.saving = false;
        this.documentsToAdd = [];
        this.notificationQueueService.addNotification(`Documents successfully uploaded.`, 'success');
        // console.log('Uploaded', d);
      });
    }
    else {
      this.fileService.uploadAccountDocuments(file, record_id).subscribe((d) => {
        this.saving = false;
        this.documentsToAdd = [];
        this.notificationQueueService.addNotification(`Documents successfully uploaded.`, 'success');
        // console.log('Uploaded', d);
      });
    }
  }

  fakeBrowseClick(): void {
    // the UI element for the native element is completely useless and ugly so we hide it and fake the user click.
    this.myInputVariable.nativeElement.click();
  }
  onFilesAdded(files: FileList): void {
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
          let fileDataString = reader.result.toString();
          fileDataString = fileDataString.split(',').slice(-1)[0];
          if (fileNumber >= 0) {
            // save the result over the old result
            fileData[fileNumber] = fileDataString;
            fileSizes[fileNumber] = this.toFileSize(files.item(i).size)

          } else {
            // push a fresh file name and file contents
            if (files.item(i).name.split('.').slice(-1)[0].indexOf("pdf") < 0) {
              this.notificationQueueService.addNotification(`Unsupported file type.`, 'danger');
              return;
            }

            fileNames.push(files.item(i).name);
            fileData.push(fileDataString);
            fileSizes.push(this.toFileSize(files.item(i).size));

            this.documentsToAdd.push({
              filename: files.item(i).name,
              subject: this.selectedDocumentType,
              subjectOther: "",
              body: fileDataString
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
          // console.log(d);
          if (d['error'] && d['error']['code']) {
            // something has gone wrong. Show the developer the error
            alert(d['error']['code'] + ': There has been a data problem retrieving this file. Please let your ministry contact know that you have seen this error.');
            // console.log('Dynamics has returned: ', d);
          } else if (d.DocumentCollection.length === 0) {
            this.notificationQueueService.addNotification('There are no files available to download. Please let your ministry contract know that you cannot download the contract.');
            // console.log('No files to download');
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
}
