import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[dateFormat]'
})
export class DateFormatDirective {
  @Input('dateFormat') format!: string; // Format daty, np. 'yyyy-MM-dd'

  constructor(private el: ElementRef, private renderer: Renderer2, private datePipe: DatePipe) { }

  ngOnInit() {
    const nativeElement = this.el.nativeElement;
    const value = nativeElement.value;

    if (value) {
      const formattedDate = this.datePipe.transform(value, this.format);
      this.renderer.setProperty(nativeElement, 'value', formattedDate);
    }
  }
}
