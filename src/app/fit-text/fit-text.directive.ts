import { Directive, ElementRef } from '@angular/core';
import { WindowService } from '../window/window.service';

@Directive({
  selector: '[appFitText]',
  providers: [WindowService]
})
export class FitTextDirective {
  domParent: any;
  domElement: any;
  domElemStyle: any;

  computed : Function = (element) => {window.getComputedStyle(element, null)};
  newLines : Function = () => {this.domElement.children.length || 1};
  lineHeight : Function = () => {this.computed('line-height')};
  display : Function = () => {this.computed('display')};

  min : string = '1';
  max : string = '250';
  compressor : number = 1;
  calcSize : number = 10;

  constructor(private el: ElementRef,
              private windowService: WindowService) {
    this.domElement = this.el.nativeElement;
    this.domElemStyle = this.domElement.style;
    this.domParent = this.domElement.parentElement;

    windowService.width$.subscribe((width: number) => {
      console.log('applying resizer, window resized to ', width);
      this.resizer();
    });
  }

  private resizer() {
    // Don't calculate for elements with no width or height
    if (this.domElement.offsetHeight * this.domElement.offsetWidth === 0)
      return;

    // Set standard values for calculation
    this.domElemStyle.fontSize       = this.calcSize + 'px';
    this.domElemStyle.lineHeight     = '1';
    this.domElemStyle.display        = 'inline-block';

    // Set usage values
    this.domElemStyle.fontSize       = this.calculate() + 'px';
    this.domElemStyle.lineHeight     = this.lineHeight;
    this.domElemStyle.display        = this.display;
  }

  private calculate() {
    const ratio = (this.calcSize * this.newLines()) / this.domElement.offsetWidth / this.newLines();
    return Math.max(
      Math.min((this.domParent.offsetWidth - 6) * ratio * this.compressor,
        parseFloat(this.max)
      ),
      parseFloat(this.min)
    )
  }

}
