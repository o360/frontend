import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmationModalComponent } from '../../shared/confirmation/confirmation.component';

@Injectable()
export class ConfirmationService {
  protected _container: ViewContainerRef;

  public set container(value: ViewContainerRef) {
    this._container = value;
  }

  constructor(protected _resolver: ComponentFactoryResolver) {
  }

  public loadComponent(message?: string, conflicts?: string) {
    let componentFactory = this._resolver.resolveComponentFactory(ConfirmationModalComponent);
    let viewContainerRef = this._container;

    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ConfirmationModalComponent>componentRef.instance).message = message;
    (<ConfirmationModalComponent>componentRef.instance).conflicts = conflicts;
  }
}
