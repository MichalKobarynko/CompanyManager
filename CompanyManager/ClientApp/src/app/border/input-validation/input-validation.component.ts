import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AppFormControl } from '../../models/forms/app-form-control.model';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html'
})
export class InputValidationComponent {
  @Input() control: AppFormControl | undefined;


  constructor() {

  }
  
}
