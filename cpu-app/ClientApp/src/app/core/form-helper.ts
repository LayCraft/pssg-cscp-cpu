import { AbstractControl } from '@angular/forms';

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
  areWarningsShowing() {
    let invalid_divs: HTMLCollectionOf<Element> = document.getElementsByClassName("invalid-feedback");

    for (let i = 0; i < invalid_divs.length; ++i) {
      if (window.getComputedStyle(invalid_divs.item(i)).display !== "none") {
        return  true;
      }
    }

    return false;
  }
}
