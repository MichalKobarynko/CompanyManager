import { Validators } from "@angular/forms";
import { AppFormGroup } from "./app-form-group.model";
import { AppFormControl } from "./app-form-control.model";
import { SelectDisabledValueValidator } from "../../border/input-validation/select-disabled-value.validator";

export class ProjectEditFormGroup extends AppFormGroup {
  constructor() {
    super({
      projectId: new AppFormControl('ID', 'projectId', '', Validators.compose([
        Validators.required
      ])),
      title: new AppFormControl('Tytuł', 'title', '', Validators.compose([
        Validators.required
      ])),
      ownerId: new AppFormControl('Odpowiedzialny', 'ownerId', '', Validators.compose([
        Validators.required
      ]))
    });
  }
}

export class ProjectAddFormGroup extends AppFormGroup {
  constructor() {
    super({
      title: new AppFormControl('Tytuł', 'title', '', Validators.compose([
        Validators.required
      ])),
      ownerId: new AppFormControl('Odpowiedzialny', 'ownerId', 'default', Validators.compose([
        Validators.required,
        SelectDisabledValueValidator.Validate('default'),
      ]))
    });
  }
}









