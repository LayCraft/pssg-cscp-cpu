import { AbstractControl } from '@angular/forms';
import { NotificationQueueService } from './services/notification-queue.service';
import { EMAIL, PHONE_NUMBER } from '../core/constants/regex.constants';
import * as _ from 'lodash';

// form helpers. Validity hints and hide/show toggles
export class FormHelper {
  showValidFeedback(control: AbstractControl): boolean {
    return !(control.value && control.valid && this.isDirtyOrTouched(control));
  }
  showInvalidFeedback(control: AbstractControl): boolean {
    return !(control.value && control.invalid && this.isDirtyOrTouched(control));
  }
  showInvalidFeedbackTest(value: any, pattern: RegExp, control: AbstractControl) {
    return (!value || pattern.test(value));
  }
  isRequired(control: AbstractControl, required: boolean) {
    if (required && control.value && this.isDirtyOrTouched(control)) {
      return true;
    } else {
      return null;
    }
  }
  isDisabled(disabled: boolean) {
    if (disabled) {
      return true;
    } else {
      return null;
    }
  }
  isDirtyOrTouched(control: AbstractControl) {
    if (control.dirty || control.touched) {
      return true;
    } else {
      return null;
    }
  }
  isFormDirty() {
    if (document.getElementsByClassName("ng-dirty").length > 0) {
      return true;
    }
    return false;
  }
  isFormValid(notificationQueueService: NotificationQueueService = null) { //notificationQueueService: NotificationQueueService
    if (document.getElementsByClassName("ng-invalid").length > 0) {
      if (notificationQueueService) notificationQueueService.addNotification('All fields must be in a valid format.', 'warning');
      return false;
    }
    if (document.getElementsByClassName("tab-invalid").length > 0) {
      if (notificationQueueService) notificationQueueService.addNotification('There is a problem on another tab preventing save.', 'warning');
      return false;
    }
    return true;
  }
  getFormState() {
    if (document.getElementsByClassName("ng-invalid").length > 0) {
      return 'invalid';
    }
    if (document.getElementsByClassName("ng-dirty").length > 0) {
      return 'incomplete';
    }
    //TODO - check for complete? info? untouched?
    return 'untouched';
  }
  makeFormClean() {
    let dirtyControls = document.getElementsByClassName("ng-dirty");
    [].forEach.call(dirtyControls, function (el: Element) {
      el.classList.remove("ng-dirty");
      el.classList.remove("ng-touched");
      el.classList.add("ng-untouched");
      el.classList.add("ng-pristine");
    });
  }
}
