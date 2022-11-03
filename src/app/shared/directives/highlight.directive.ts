import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[highlight]'
})

//la Directive implémente le lifecycle hook AfterViewInit,
// car vous devez vous assurer que la view existe avant de
// commencer à manipuler des éléments qui s'y trouvent
export class HighlightDirective implements AfterViewInit {

  //Une Directive peut comporter des  @Input  pour accepter des paramètres.
  @Input() color = 'yellow';

  //dans le  constructor  , vous injectez ElementRef  et Renderer2  :
  //
  // ElementRef  est la référence à l'élément du DOM, et l'injection d'Angular
  // vous permet de l'injecter directement comme ça,
  //
  // Renderer2  est un outil qui vous permet d'interagir avec le DOM de manière testable,
  // c'est-à-dire que vous pourrez écrire des tests unitaires – qui peuvent être exécutés
  // dans un contexte où le DOM n'existe pas – qui fonctionneront correctement
  constructor(private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.setBackgroundColor(this.color)
  }

  setBackgroundColor(color: string){
    this.renderer.setStyle(this.element.nativeElement, 'background-color', color)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('lightgreen')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.color)
  }

  @HostListener('click') onClick() {
    this.color = 'lightgreen'
  }
}
