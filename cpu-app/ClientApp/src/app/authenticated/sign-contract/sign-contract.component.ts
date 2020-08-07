import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FileService } from '../../core/services/file.service';
import { NotificationQueueService } from '../../core/services/notification-queue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { iDynamicsFile, iDynamicsDocument } from '../../core/models/dynamics-blob';
import { iDynamicsPostFile, iDynamicsDocumentPost, iDynamicsPostSignedContract } from '../../core/models/dynamics-post';
import { iStepperElement, IconStepperService } from '../../shared/icon-stepper/icon-stepper.service';
import { FormHelper } from '../../core/form-helper';
import { Transmogrifier } from '../../core/models/transmogrifier.class';
import { Subscription } from 'rxjs';
import { iSignature } from '../subforms/program-authorizer/program-authorizer.component';
import { convertContractPackageToDynamics } from '../../core/models/converters/sign-contract-to-dynamics';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

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
  out: iDynamicsPostSignedContract;

  trans: Transmogrifier;
  contractNumber: string;
  organizationId: string;
  userId: string;
  taskId: string;
  signature: iSignature = {
    signer: undefined,
    signature: "",
    signatureDate: undefined,
    termsConfirmation: false
  };;

  private stateSubscription: Subscription;

  private formHelper = new FormHelper();
  constructor(
    private fileService: FileService,
    private stepperService: IconStepperService,
    private router: Router,
    private stateService: StateService,
    private notificationQueueService: NotificationQueueService,
    private route: ActivatedRoute,
    private http: HttpClient
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
          // console.log(d);
          if (d['error'] && d['error']['code']) {
            this.isLoading = false;

            // something has gone wrong. Show the developer the error
            this.notificationQueueService.addNotification('An attempt at getting this contract package was unsuccessful. If this problem persists please notify your ministry contact.', 'danger');
          } else {
            this.documentCollection = d.DocumentCollection;
            this.documentCollection = this.documentCollection.filter(d => d.filename.indexOf(".pdf") > 0);
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
    // this.notificationQueueService.addNotification(`Feature in progress`, 'warning');
    //TODO - add loading spinner while uploading documents - it can take a sec
    try {
      this.saving = true;
      this.out = convertContractPackageToDynamics(this.userId, this.organizationId, this.documentCollection, this.signature);
      this.fileService.uploadSignedContract(this.out, this.taskId).subscribe(
        r => {
          this.saving = false;

          // console.log(r);
          //for testing document combining, see if it works - can setup backend to return the combined document instead of sending it forward to CRM
          // let file = "data:application/pdf;base64," + r.signedContract.body;
          // let obj = { fileData: file, fileName: r.signedContract.filename };
          // this.stepperService.addStepperElement(obj, r.signedContract.filename, 'untouched', 'document');

          this.notificationQueueService.addNotification(`You have successfully signed the contract.`, 'success');
          this.stateService.refresh();
          this.router.navigate(['/authenticated/dashboard']);
        },
        err => {
          console.log(err);
          this.notificationQueueService.addNotification('The was a problem saving the signed contract. If this problem is persisting please contact your ministry representative.', 'danger');
          this.saving = false;
        }
      );
    }
    catch (err) {
      console.log(err)
      this.notificationQueueService.addNotification('The was a problem saving the signed contract. If this problem is persisting please contact your ministry representative.', 'danger');
      this.saving = false;
    }

  }
  exit() {
    if (this.formHelper.showWarningBeforeExit()) {
      if (confirm("Are you sure you want to return to the dashboard? All unsaved work will be lost.")) {
        this.stateService.refresh();
        this.router.navigate(['/authenticated/dashboard']);
      }
    }
    else {
      this.stateService.refresh();
      this.router.navigate(['/authenticated/dashboard']);
    }
  }
  constructDefaultStepperElements() {
    this.stepperService.reset();

    this.documentCollection.forEach(doc => {
      let file = "data:application/pdf;base64," + doc.body;
      let obj = { fileData: file, fileName: doc.filename };
      this.stepperService.addStepperElement(obj, doc.filename, 'untouched', 'document');
    });


    if (this.stepperElements.length > 0) {
      this.getSignaturePage().then((file: string) => {
        let body = file.split(',').slice(-1)[0];

        this.documentCollection.push({
          subject: "signing page",
          subjectOther: "",
          body: body,
          filename: "Signature Page",
          overwritetime: ''
        });
        let obj = { fileData: file, fileName: "Sign Contract" };
        this.stepperService.addStepperElement(obj, "Sign Contract", 'untouched', 'auth');

        this.stepperService.setToFirstStepperElement();
        this.isLoading = false;
      });
    }
    else {
      this.stepperService.setToFirstStepperElement();
      this.isLoading = false;
    }
  }

  getSignaturePage() {
    return new Promise((resolve, reject) => {
      let documentPath = '/coastcontracts/assets/documents/TUA Section 25 Draft.pdf';
      if (window.location.href.includes("localhost")) {
        documentPath = '/assets/documents/TUA Section 25 Draft.pdf';
      }
      this.http.get(documentPath, { responseType: 'blob' })
        .subscribe(res => {
          // console.log("got something");
          const reader = new FileReader();
          reader.onloadend = () => {
            var base64data = reader.result;
            // console.log("base64");
            // console.log(base64data);
            resolve(base64data);
          }

          // console.log("res?");
          reader.readAsDataURL(res);
          // console.log(res);
        });
    });
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
