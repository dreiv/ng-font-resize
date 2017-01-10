import { Directive, ElementRef } from '@angular/core';
import { WindowService } from '../window/window.service';

@Directive({
  selector: '[appFitText]',
  providers: [WindowService]
})
export class FitTextDirective {

  constructor(private el: ElementRef,
              private windowService: WindowService) {
    windowService.width$.subscribe((width: number) => {
      console.log('window resized to ', width);
    });
  }

}
