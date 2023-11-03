import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @HostListener('error') handleError(): void {

    const elNative = this.elHost.nativeElement;
    elNative.src = '../../../assets/images/work-in-progress.png';
  }

  constructor(private elHost: ElementRef) { }

}
