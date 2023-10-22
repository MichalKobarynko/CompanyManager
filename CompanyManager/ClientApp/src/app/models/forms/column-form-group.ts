import { Validators } from "@angular/forms";
import { AppFormControl } from "./app-form-control.model";
import { AppFormGroup } from "./app-form-group.model";

export class ColumnAddFormGroup extends AppFormGroup {
    constructor() {
        super({
            name: new AppFormControl('Nazwa', 'name', '', Validators.compose([
                Validators.required
            ])),
            dotColor: new AppFormControl('Kolor', 'dotColor', '#ffffff', Validators.compose([
                Validators.required
            ])),
        });
    }
}
    

export class ColumnEditFormGroup extends AppFormGroup {
    constructor() {
        super({
            columnId: new AppFormControl('ID', 'columnId', '', Validators.compose([
                Validators.required
            ])),
            name: new AppFormControl('Nazwa', 'name', '', Validators.compose([
                Validators.required
            ])),
            dotColor: new AppFormControl('Kolor', 'dotColor', '', Validators.compose([
                Validators.required
            ])),
        });
    }
}
