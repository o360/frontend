import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {
  ComponentLoaderFactory,
  ModalDirective as BootstrapModalDirective,
  ModalOptions
} from 'ngx-bootstrap';

export interface IDismissReasons {
  BACKRDOP: string;
  ESC: string;
}

export const DISMISS_REASONS: IDismissReasons = {
  BACKRDOP: 'backdrop-click',
  ESC: 'esc'
};

/**
 * ModalDirective should be removed as soon as ngx-bootstrap dependency will update to version 5.x or upper.
 * Current implementation has solution that solves problem with closing window on mouseup events which are happens outside of modal window.
 */
@Directive({
  selector: '[bwsModal]',
  exportAs: 'bws-modal',
})
export class ModalDirective extends BootstrapModalDirective {
  /** This event fires immediately when the `show` instance method is called. */
  @Output()
  public onShow: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  /** This event is fired when the modal has been made visible to the user
   * (will wait for CSS transitions to complete)
   */
  @Output()
  public onShown: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  /** This event is fired immediately when the hide instance method has been called. */
  @Output()
  public onHide: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  /** This event is fired when the modal has finished being
   * hidden from the user (will wait for CSS transitions to complete).
   */
  @Output()
  public onHidden: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  private _clickStartedInContent = false;

  /** allows to set modal configuration via element property */
  /** Added to fix LanguageService in templates */
  @Input()
  set config(conf: ModalOptions) {
    this._config = this.getConfig(conf);
  }

  get config(): ModalOptions {
    return this._config;
  }

  constructor(viewContainerRef: ViewContainerRef,
              renderer: Renderer2,
              clf: ComponentLoaderFactory,
              private _el: ElementRef) {
    super(_el, viewContainerRef, renderer, clf);
  }

  @HostListener('mousedown', ['$event'])
  public onClickStarted(event: MouseEvent): void {
    this._clickStartedInContent = event.target !== this._el.nativeElement;
  }

  @HostListener('mouseup', ['$event'])
  public onClickStop(event: MouseEvent): void {
    const clickedInBackdrop = event.target === this._el.nativeElement && !this._clickStartedInContent;
    if (
      this.config.ignoreBackdropClick ||
      this.config.backdrop === 'static' ||
      !clickedInBackdrop
    ) {
      this._clickStartedInContent = false;

      return;
    }
    this.dismissReason = DISMISS_REASONS.BACKRDOP;
    this.hide(event);
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
