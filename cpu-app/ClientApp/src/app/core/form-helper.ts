import { AbstractControl } from '@angular/forms';
import { NotificationQueueService } from './services/notification-queue.service';
import { EMAIL, PHONE_NUMBER } from '../core/constants/regex.constants';

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
    //any field that applies an ngx-mask on load is marked dirty, even if it wasn't touched.
    //so we ignore fields that are dirty but untouched...
    let dirtyControls = document.querySelectorAll(".ng-dirty");
    let count = 0;
    if (dirtyControls.length > 0) {
      for (let i = 0; i < dirtyControls.length; ++i) {
        if (dirtyControls[i].classList.contains("ng-untouched")) continue;
        ++count;
      }
    }
    if (count > 0) {
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
    
    let dirtyControls = document.querySelectorAll(".ng-dirty");
    let count = 0;
    if (dirtyControls.length > 0) {
      for (let i = 0; i < dirtyControls.length; ++i) {
        if (dirtyControls[i].classList.contains("ng-untouched")) continue;
        ++count;
      }
    }
    if (count > 0) {
      return 'incomplete';

    }
    
    //TODO - check for complete? info? untouched?
    return 'untouched';
  }
  makeFormClean() {
    let dirtyControls = document.querySelectorAll(".ng-dirty");
    if (dirtyControls.length > 0) {
      for (let i = 0; i < dirtyControls.length; ++i) {
        dirtyControls[i].classList.remove("ng-dirty");
        dirtyControls[i].classList.remove("ng-touched");
        dirtyControls[i].classList.add("ng-untouched");
        dirtyControls[i].classList.add("ng-pristine");
      }
    }
  }
  moneyMaskToNumber(e: any, context: any, varName) {
    let moneyString = e.value.replace(/[$,]/g, '');
    let variable = this.fetchVarInfo(context, varName);
    variable.obj[variable.prop] = parseFloat(moneyString);
  }
  // moneyFormatter(e: any, context: any, varName) {
  //   if (e.value.toString().length > 1 && e.value.toString()[0] === "0") {
  //     e.value = parseFloat(e.value.toString().substr(1));
  //   }
  //   if (e.value < 0 || !e.value) {
  //     e.value = 0;
  //   }
  //   if (e.value > 99999999) {
  //     e.value = parseFloat(e.value.toString().substring(0, 8));;
  //   }
  //   if (this.countDecimals(e.value) > 2) {
  //     e.value = parseFloat(e.value).toFixed(2);
  //   }

  //   let variable = this.fetchVarInfo(context, varName);
  //   variable.obj[variable.prop] = parseFloat(e.value);
  // }
  numberFormatter(e: any, context: any, varName) {
    if (e.value.toString().length > 1 && e.value.toString()[0] === "0") {
      e.value = parseFloat(e.value.toString().substr(1));
    }
    if (e.value < 0) {
      e.value = 0;
    }
    if (e.value > 9999) {
      e.value = parseFloat(e.value.toString().substring(0, 4));;
    }
    if (this.countDecimals(e.value) > 2) {
      e.value = parseFloat(e.value).toFixed(2);
    }

    let variable = this.fetchVarInfo(context, varName);
    variable.obj[variable.prop] = parseFloat(e.value);
  }
  fetchVarInfo(obj, prop) {
    if (typeof obj === 'undefined') {
      return false;
    }

    var _index = prop.indexOf('.')
    if (_index > -1) {
      return this.fetchVarInfo(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return { obj: obj, prop: prop };
  }
  countDecimals(value) {
    if (Math.floor(value) === value) return 0;
    if (value.toString().indexOf(".") < 0) return 0;
    return value.toString().split(".")[1].length || 0;
  }
}
