import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRecarga]'
})
export class RecargaDirective implements OnChanges{
@Input()appRecarga!: number
  constructor(private templateRef : TemplateRef<any>,
              private viewcontainerref :  ViewContainerRef ) { 

                this.viewcontainerref.createEmbeddedView(templateRef)
              }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRecarga']) {
      this.viewcontainerref.clear();
      this.viewcontainerref.createEmbeddedView(this.templateRef);
    }
  }

}
