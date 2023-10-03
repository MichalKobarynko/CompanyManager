import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'app-close-btn-rounded',
  templateUrl: './close-btn-rounded.component.html',
  styleUrls: ['./close-btn-rounded.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseBtnRoundedComponent {
  @Output() onClose = new EventEmitter();
  @Input() position: 'left' | 'right' | undefined;

  classContainer() {
    return {
      'position-right': this.position === 'right',
      'position-left': this.position === 'left'
    }
  }

  close() {
    this.onClose.emit();
  }
}
