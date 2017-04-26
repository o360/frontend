import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQueryParams, IResponseMeta } from '../../../core/services/rest.service';

export const supportedSizes: number[] = [10, 50, 100];
export const defaultPage: number = 1;

@Component({
  moduleId: module.id,
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent {
  protected readonly _sizes: number[] = supportedSizes;

  protected _meta: IResponseMeta;

  protected _queryParamsChange: EventEmitter<IQueryParams> = new EventEmitter<IQueryParams>();


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

