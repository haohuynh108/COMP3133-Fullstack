import { Directive, HostListener, ElementRef } from '@angular/core';
 
@Directive({
 selector: '[appInputFormat]'
})
export class InputFormatDirective {
 
 constructor(private element:ElementRef) { }
 
 @HostListener('focus') OnFocus(){
   console.log("On focus hero.");
 }
 @HostListener('blur') OnBlur(){
   let value:string=this.element.nativeElement.value;
   this.element.nativeElement.value=value.toUpperCase();
   console.log("On Blur method.");
 }
}
