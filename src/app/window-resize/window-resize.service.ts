import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class WindowResizeService {
  width$: Observable<number>;

  constructor() {
    let windowSize$ = new BehaviorSubject(getWindowWidth());
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();

    Observable.fromEvent(window, 'resize')
      .map(getWindowWidth)
      .subscribe(windowSize$);
  }
}

function getWindowWidth() {
  return {
    width: window.innerWidth
  }
}
