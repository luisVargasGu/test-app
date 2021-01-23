import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { QuestionItem } from 'src/app/models/questionItem';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: QuestionItem;
  @Input() form: FormGroup;
  @Input() submitted: boolean;

  constructor() { }

  /**
   * Used for html template form validation
   * @param  {string} control: name of the form control
   * @returns ValidationErrors: null or error object
   */
  f(control: string): ValidationErrors {
    let controlArr = control.split(".");
    if (controlArr.length == 1) {
      let test = this.form.controls[controlArr[0]];
      return test.errors;
    }
    else if (controlArr.length > 1) {
      controlArr = [controlArr[0], controlArr[1] + '.' + controlArr[2]]
      let test: any = this.form.controls[controlArr[0]];
      let nestedControl: FormControl = test.controls[parseFloat(controlArr[1])];
      return nestedControl.errors;
    }
  }


  /**
   * used for form validation
   */
  get isValid() {
    return this.form.valid;
  }

  /**
   * Sets the value of the radio button inputs
   * @param  {string} value: string representation of the value 'false' or 'true'
   * @param  {string} formName: name of the form control
   */
  checkValue(value: string, formName: string) {
    let controlArr = formName.split('.');
    let test: AbstractControl;
    let multipleTest: any;
    if (controlArr.length == 1) {
      test = this.form.controls[controlArr[0]];
      if (value == 'true') {
        test.setValue(true, { emitModelToViewChange: false });
      } else {
        test.setValue(false, { emitModelToViewChange: false });
      }
    }
    else if (controlArr.length > 1) {
      controlArr = [controlArr[0], controlArr[1] + '.' + controlArr[2]]
      multipleTest = this.form.controls[controlArr[0]];
      if (value == 'true') {
        multipleTest.controls[parseFloat(controlArr[1])].setValue(true, { emitModelToViewChange: false });
      } else {
        multipleTest.controls[parseFloat(controlArr[1])].setValue(false, { emitModelToViewChange: false });
      }
    }
  }
}
