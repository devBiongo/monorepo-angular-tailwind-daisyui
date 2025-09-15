import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  Input,
} from '@angular/core';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[libDebounceClick]',
})
export class DebounceClickDirective {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter<Event>();
  private clicks = new Subject<Event>();

  constructor() {
    this.clicks
      .pipe(debounce(() => timer(this.debounceTime)))
      .subscribe((e) => this.debounceClick.emit(e));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
