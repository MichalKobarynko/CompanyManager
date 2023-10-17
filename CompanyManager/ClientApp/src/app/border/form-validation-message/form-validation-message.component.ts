import { Component, Input } from '@angular/core';
import { FormStatus } from '../../models/types';

@Component({
  selector: 'app-form-validation-message',
  templateUrl: './form-validation-message.component.html',
  styleUrls: ['./form-validation-message.component.css']
})
export class FormValidationMessageComponent {
  @Input() formStatus: FormStatus = FormStatus.OK;
  @Input() errorMessage: string = "";

  constructor() { }
}
