// Angular
import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable()
export class FormConfigService {

  constructor() {
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
  */
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Marks all controls in a form group as dirty due to edit purpose (Some times form array doest affect dirty. So we need to set form controls as dirty)
   * @param formGroup - The form group to dirty
  */
  markFormGroupDirty(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
      if (control.controls) {
        this.markFormGroupDirty(control);
      }
    });
    return;
  }

  /**
   * Clear Form Array Data
   * @param formArray - The Form Array to Clear
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  /**
   * Checking control validation
   *
   * @param formName : FormGroup => Form Group Check Control Error 
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
  */
  isControlHasError(formName: FormGroup, controlName: string, validationType: string): boolean {
    const control = formName.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}