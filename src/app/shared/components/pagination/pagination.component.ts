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

import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IQueryParams, IResponseMeta } from '../../../core/services/rest.service';

export const supportedSizes: number[] = [10, 50, 100];
export const defaultPage: number = 1;

@Component({
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnChanges {
  protected readonly _sizes: number[] = supportedSizes;
  protected _pagination: ElementRef;
  protected _meta: IResponseMeta;

  protected _queryParamsChange: EventEmitter<IQueryParams> = new EventEmitter<IQueryParams>();

  @ViewChild('pagination', { static: true })
  public set pagination(value: ElementRef) {
    this._pagination = value;
  }

  public get sizes(): number[] {
    return this._sizes;
  }

  @Input()
  public set meta(value: IResponseMeta) {
    this._meta = value;
  }

  public get meta(): IResponseMeta {
    return this._meta;
  }

  @Output()
  public get queryParamsChange(): EventEmitter<IQueryParams> {
    return this._queryParamsChange;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['meta']) {
      (this._meta.total > 10) ? this._pagination.nativeElement.hidden = false : this._pagination.nativeElement.hidden = true;
    }
  }

  public pageChanged({ page }: any) {
    this._queryParamsChange.emit({
      number: page.toString()
    });
  }

  public sizeChanged(size: number) {
    this._queryParamsChange.emit({
      size: size.toString()
    });
  }
}
