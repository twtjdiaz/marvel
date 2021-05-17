import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputUppercase]'
})
export class InputUppercaseDirective {

  lastValue: string;

  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput($event): void {
    $event.target.value = $event.target.value.charAt(0).toUpperCase() + $event.target.value.slice(1);
  }

}
