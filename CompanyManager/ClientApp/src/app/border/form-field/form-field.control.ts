import { NgControl } from "@angular/forms";
import { Observable } from "rxjs";

export abstract class FormFieldControlDirective<T> {
  value?: T | null;

  readonly stateChanges!: Observable<void>;
  readonly id: string = "";
  readonly placeholder: string = "";
  readonly ngControl!: NgControl | null;
  readonly focused: boolean = false;
  readonly empty: boolean = false;
  readonly required: boolean = false;
  readonly disabled: boolean = false;
}
