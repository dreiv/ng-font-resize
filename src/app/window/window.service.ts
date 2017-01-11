import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const CHECK_DELAY = 250;

@Injectable()
export class WindowService {
  width$: Observable<number>;

  constructor() {
    let windowSize$ = new BehaviorSubject(getWindowWidth());
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();

    Observable.fromEvent(window, 'resize')
      .debounceTime(CHECK_DELAY)
      .map(getWindowWidth)
      .subscribe(windowSize$);
  }
}

function getWindowWidth() {
  return {
    width: window.innerWidth
  }
}
