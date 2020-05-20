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
import { iSignature } from '../subforms/program-authorizer/program-authorizer.component';

interface FileBundle {
  // list of file names (same order as file array)
  fileName: string[];
  // base64 encoded file turned into a string
  fileData: string[];
}
@Component({
  selector: 'app-sign-contract',
  templateUrl: './sign-contract.component.html',
  styleUrls: ['./sign-contract.component.scss']
})
export class SignContractComponent implements OnInit, OnDestroy {

  // collect the element reference from the child so that we can access native parts of the files element
  @ViewChild('files')
  myInputVariable: ElementRef;

  // is this uploading/saving
  saving: boolean = false;
  isLoading: boolean = false;
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
  taskId: string;
  signature: iSignature;

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
    this.isLoading = true;
    this.stateSubscription = this.stateService.main.subscribe((m: Transmogrifier) => {
      // save the transmogrifier
      this.trans = m;
    });

    // this.stepperService.currentStepperElement.subscribe(s => this.currentStepperElement = s);
    this.route.params.subscribe(p => {
      // collect the current user information from the state.
      this.userId = this.stateService.main.getValue().userId;
      this.organizationId = this.stateService.main.getValue().organizationId;
      // collect the "contract id" which is the id included with the task.
      this.taskId = p['taskId'];

      this.contractNumber = this.trans.contracts.find(c => c.tasks.find(t => t.taskId == this.taskId) !== undefined).contractNumber;

      this.fileService.getContractPackage(this.organizationId, this.userId, this.taskId).subscribe(
        (d: iDynamicsFile) => {
          console.log(d);
          if (d['error'] && d['error']['code']) {
            this.isLoading = false;

            // something has gone wrong. Show the developer the error
            this.notificationQueueService.addNotification('An attempt at getting this contract package was unsuccessful. If this problem persists please notify your ministry contact.', 'danger');
          } else {
            this.documentCollection = d.DocumentCollection;
            this.constructDefaultStepperElements();

          }
        }
      );
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
  constructDefaultStepperElements() {
    this.stepperService.reset();

    this.documentCollection.forEach(doc => {
      let obj = { fileData: doc.body };
      this.stepperService.addStepperElement(obj, doc.filename, 'untouched', 'document');
    });

    this.stepperService.addStepperElement(null, "Sign Contract", 'untouched', 'auth');

    this.stepperService.setToFirstStepperElement();
    this.isLoading = false;

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
