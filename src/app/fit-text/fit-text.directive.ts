import { Directive, ElementRef } from '@angular/core';
import { WindowResizeService } from '../window-resize/window-resize.service';

@Directive({
  selector: '[appFitText]',
  providers: [WindowResizeService]
})
export class FitTextDirective {

  constructor(private el: ElementRef,
              private windowResizeService: WindowResizeService) {
    windowResizeService.width$.subscribe((width: number) => {
      console.log('window resized to ', width);
    });
  }

}
