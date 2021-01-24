import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cssText = "box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);";
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.cssText = "box-shadow: null;";
  }

  constructor(private el: ElementRef) { }

}
