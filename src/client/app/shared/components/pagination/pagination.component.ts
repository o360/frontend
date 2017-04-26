import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQueryParams } from '../../../core/services/rest.service';

const supportedSizes: number[] = [10, 50, 100];
const defaultPage: number = 1;

@Component({
  moduleId: module.id,
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent {
  protected readonly _sizes: number[] = supportedSizes;

  protected _pageNumberChanged: EventEmitter<any> = new EventEmitter<any>();

  protected _totalItems: number;
  private _currentPage: number;
  private _itemsPerPage: number;


  public get sizes(): number[] {
    return this._sizes;
  }

  @Input()
  public set totalItems(value: number) {
    this._totalItems = value;
  }

  public get totalItems(): number {
    return this._totalItems;
  }

  @Input()
  public set currentPage(value: number) {
    this._currentPage = value;
  }

  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  @Input()
  public set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }

  @Output()
  public get pageNumberChanged(): EventEmitter<any> {
    return this._pageNumberChanged;
  }

  public pageChanged(event: any) {
    this._currentPage = event.page;
    this._getParams();
  }

  public changeItemsPerPage(quantity: number) {
    this._itemsPerPage = quantity;
    this._getParams();
  }

  protected _getParams() {
    let params: IQueryParams = {
      'size': this._itemsPerPage.toString(),
      'number': this._currentPage.toString()
    };
    this._pageNumberChanged.emit(params);
  }
}

