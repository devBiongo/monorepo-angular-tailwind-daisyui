import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';

@Directive({
  selector: 'dialog[libDialogClose]',
})
export class DialogCloseDirective implements OnInit, OnDestroy {
  @Output()
  public closed = new EventEmitter<void>();

  private listener = () => this.closed.emit();

  private el = inject(ElementRef<HTMLDialogElement>);

  ngOnInit() {
    this.el.nativeElement.addEventListener('close', this.listener);
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('close', this.listener);
  }
}
