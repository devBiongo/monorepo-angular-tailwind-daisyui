import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[libClickOutside]',
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  private el = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(targetElement: EventTarget | null) {
    if (!targetElement) return;

    if (!this.el.nativeElement.contains(targetElement as Node)) {
      this.appClickOutside.emit();
    }
  }
}
