import { Validators } from "@angular/forms";
import { AppFormGroup } from "./app-form-group.model";
import { AppFormControl } from "./app-form-control.model";


export class BoardAddFormGroup extends AppFormGroup {
  constructor() {
    super({
      name: new AppFormControl('Nazwa tablicy', 'name', '', Validators.compose([
        Validators.required
      ])),
      projectId: new AppFormControl('Projekt', 'projectId', '', Validators.compose([
        Validators.required,
      ]))
    })
  }
}

 
export class BoardEditFormGroup extends AppFormGroup {
  constructor() {
    super({
      boardId: new AppFormControl('ID', 'boardId', '', Validators.compose([
        Validators.required
      ])),
      name: new AppFormControl('Nazwa tablicy', 'name', '', Validators.compose([
        Validators.required
      ])),
      projectId: new AppFormControl('Projekt', 'projectId', '', Validators.compose([
        Validators.required,
      ]))
    })
  }
}
