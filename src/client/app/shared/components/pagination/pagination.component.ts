import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQueryParams } from '../../../core/services/rest.service';
import apply = Reflect.apply;

@Component({
  moduleId: module.id,
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class ListPaginationComponent {
  protected _pageNumberChanged: EventEmitter<any> = new EventEmitter<any>();

  protected _variants = [1, 10, 50, 100];

  protected _totalItems: number;
  protected _currentPage: number = 1;
  private _itemsPerPage: number = 10;


  public get variants(): (number | string)[] {
    return this._variants;
  }

  @Input()
  public set totalItems(value: number) {
    this._totalItems = value;
  }

  public get totalItems(): number {
    return this._totalItems;
  }

  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }

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

