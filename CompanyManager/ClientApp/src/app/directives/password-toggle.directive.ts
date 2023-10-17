import {
  Directive,
  HostBinding,
  ElementRef,
  HostListener
} from "@angular/core";

@Directive({
  selector: 'input[type = "password"]'
})
export class PasswordToggleDirective {
  private isPasswordVisible = false;

  constructor(private el: ElementRef) {
    this.togglePasswordVisibility();
  }

  @HostListener('click') toggleVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.togglePasswordVisibility();
    console.log('dupa');
  }

  private togglePasswordVisibility() {
    const inputElement = this.el.nativeElement;
    inputElement.value = '';
  }
}
