import { AbstractControl } from '@angular/forms';

// form helpers. Validity hints and hide/show toggles
export class FormHelper {
  showValidFeedback(control: AbstractControl): boolean {
    return !(control.valid && this.isDirtyOrTouched(control));
  }
  showInvalidFeedback(control: AbstractControl): boolean {
    return !(control.invalid && this.isDirtyOrTouched(control));
  }
  isRequired(control: AbstractControl, required: boolean) {
    if (required && this.isDirtyOrTouched(control)) {
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
}
