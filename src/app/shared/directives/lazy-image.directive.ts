import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: 'img[lazyImage]'
})
export class LazyImageDirective implements AfterViewInit, OnDestroy {
  protected _observer: IntersectionObserver;

  @HostBinding('attr.src')
  public originalSrc;

  @Input()
  public src: string;

  constructor(protected _elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    if (!this._hasIntersectionObserver()) {
      this._loadImage();

      return;
    }

    this._loadImageLazily();
  }

  public ngOnDestroy(): void {
    if (this._observer instanceof IntersectionObserver) {
      this._observer.unobserve(this._elementRef.nativeElement);
      this._observer.disconnect();
    }
  }

  protected _loadImage(): void {
    this.originalSrc = this.src;
  }

  protected _loadImageLazily(): void {
    this._observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target !== this._elementRef.nativeElement || !entry.isIntersecting) {
          continue;
        }

        this._loadImage();

        return this.ngOnDestroy();
      }
    });

    this._observer.observe(this._elementRef.nativeElement);
  }

  protected _hasIntersectionObserver(): boolean {
    return typeof window.IntersectionObserver === 'function';
  }
}
