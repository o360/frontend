/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { from as observableFrom, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssessmentModel } from '../../../core/models/assessment-model';
import { Utils } from '../../../utils';

@Component({
  selector: 'bs-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  protected _list: AssessmentModel[];
  protected _searchSubscription: Subscription;

  private _searchControl: FormControl = new FormControl();
  private _itemsSearch: EventEmitter<AssessmentModel[]> = new EventEmitter<AssessmentModel[]>();
  private _items: AssessmentModel[] = [];
  private _searchList: AssessmentModel[] = [];

  @Input()
  public set items(value: AssessmentModel[]) {
    this._items = value;
  }

  @Output()
  public get itemsSearch(): EventEmitter<AssessmentModel[]> {
    return this._itemsSearch;
  }

  public get searchControl(): FormControl {
    return this._searchControl;
  }

  public ngOnInit() {
    this._list = this._items;
    this._searchSubscription = this._searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((term: string) => {
          this._searchList = [];

          return this.update(term);
        })
      )
      .subscribe((item: AssessmentModel) => {
        this._searchList.push(item);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this._list = this._items;
    }
  }

  public ngOnDestroy() {
    this._searchSubscription.unsubscribe();
  }

  public update(term: string) {
    let currentTerm: string;
    currentTerm = term.replace(/\\/g, '')
      .replace(/\//g, '');

    this._itemsSearch.emit(this._searchList);

    let items = this._list.filter((e: AssessmentModel) => {
      if (e.user) {
        return new RegExp(currentTerm, 'gi').test(e.user.name) ||
          new RegExp(currentTerm, 'gi').test(Utils.transliterate(e.user.name));
      }

      return null;
    });

    return observableFrom(items);
  }
}
