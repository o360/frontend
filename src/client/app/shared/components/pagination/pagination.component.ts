import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueryParams } from '../../../core/services/rest.service';
import apply = Reflect.apply;

@Component({
  moduleId: module.id,
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class ListPaginationComponent {
  protected _pageNumberChanged: EventEmitter<any> = new EventEmitter<any>();

  protected _variants = [1, 5, 10, 20, 'all'];

  protected _totalItems: number;
  protected _currentPage: number; //.../groups?number=
  private _itemsPerPage: number = 1; //...groups?size=


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

  @Output()
  public get pageNumberChanged(): EventEmitter<any> {
    return this._pageNumberChanged;
  }

  public pageChanged(event: any): void {
    this._currentPage = event.page;
    this._itemsPerPage = event.itemsPerPage;

    let params: IQueryParams = {
      'size': this._itemsPerPage.toString(),
      'number': this._currentPage.toString()
    };

    this._pageNumberChanged.emit(params);
  }
}

