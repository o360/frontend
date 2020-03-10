import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouterHistoryService {
  protected _defaultUrl: string = '/';
  protected _history: string[] = [];
  protected _eventsSub: Subscription;

  public get history(): string[] {
    return [...this._history];
  }

  public get previousUrl(): string {
    return this._history[this._history.length - 2] || this._defaultUrl;
  }

  constructor(protected _router: Router) {
  }

  public subscribe(): Subscription {
    if (this._eventsSub instanceof Subscription && !this._eventsSub.closed) {
      return;
    }

    this._eventsSub = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => this._history.push(urlAfterRedirects));
  }

  public unsubscribe(): void {
    this._eventsSub.unsubscribe();
  }
}
