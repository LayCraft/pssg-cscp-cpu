import { AbstractControl } from '@angular/forms';
import { NotificationQueueService } from './services/notification-queue.service';

// form helpers. Validity hints and hide/show toggles
export class FormHelper {
  showValidFeedback(control: AbstractControl): boolean {
    return !(control.value && control.valid && this.isDirtyOrTouched(control));
  }
  showInvalidFeedback(control: AbstractControl): boolean {
    return !(control.value && control.invalid && this.isDirtyOrTouched(control));
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
  isFormDirty(){
    if (document.getElementsByClassName("ng-dirty").length > 0) {
      return true;
    }
    return false;
  }
  isFormValid(notificationQueueService: NotificationQueueService) { //notificationQueueService: NotificationQueueService
    if (document.getElementsByClassName("ng-invalid").length > 0) {
      notificationQueueService.addNotification('All fields must be in a valid format.', 'warning');
      return false;
    }
    return true;
  }
}
