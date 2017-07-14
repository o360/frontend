import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmationModalComponent } from '../../shared/confirmation/confirmation.component';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { ModelId } from '../models/model';

export interface IConflicts {
  projects?: IEntity[];
  events?: IEntity[];
  groups?: IEntity[];
  users?: IEntity[];
  relations?: IEntity[];
}

export interface IEntity {
  id: ModelId;
  name: string;
}

@Injectable()
export class ConfirmationService {
  protected _message: string = 'T_CONFIRM_MESSAGE';
  protected _componentRef: ComponentRef<ConfirmationModalComponent>;
  protected _viewContainerRef: ViewContainerRef;
  protected _userIdInstance: ModelId;

  constructor(protected _resolver: ComponentFactoryResolver,
              protected _translateService: TranslateService) {
  }

  public loadComponent(message?: string, conflicts?: IConflicts): Subject<boolean> {
    let componentFactory = this._resolver.resolveComponentFactory(ConfirmationModalComponent);
    this._viewContainerRef.clear();
    this._componentRef = this._viewContainerRef.createComponent(componentFactory);

    this._componentRef.instance.message = this._translateMessage(message);
    this._componentRef.instance.conflicts = conflicts;
    this._componentRef.instance.userId = this._userIdInstance;
    return this._componentRef.instance.confirmed;
  }

  public setViewContainerRef(vRef: ViewContainerRef) {
    this._viewContainerRef = vRef;
  }

  public destroy() {
    this._viewContainerRef.remove(1);
  }

  public setUserId(userId: ModelId) {
    this._userIdInstance = userId;
  }

  protected _translateMessage(message?: string) {
    if (message) {
      return this._translateService.instant(message);
    } else {
      return this._translateService.instant(this._message);
    }
  }
}
