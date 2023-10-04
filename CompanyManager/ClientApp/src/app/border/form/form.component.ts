import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormType } from '../../models/types';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  typeOfForm$!: Observable<FormType | undefined>;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.typeOfForm$ = this.formService.getTypeOfForm;
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
