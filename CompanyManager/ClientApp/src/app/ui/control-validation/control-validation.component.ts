import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './control-validation.component.html',
  styleUrls: ['./control-validation.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControlValidationComponent implements OnInit, OnChanges {
  @Input() control: FormControl | undefined;
  @Input() message: string = '';

  displayMessage: string = '';

  constructor(

    private changeDetectorRef: ChangeDetectorRef) { }
    ngOnInit(): void {
      this.changeDetectorRef.markForCheck();
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control && this.control.invalid && (this.control.touched || this.control.dirty)) {
      this.displayMessage = this.displayMessage;
    } else {
      this.displayMessage = '';
    }
    this.changeDetectorRef.markForCheck();
  }

  showError(): boolean | undefined {
    console.log('ShowEror: ', this.control && this.control.invalid && (this.control.dirty || this.control.touched))
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
