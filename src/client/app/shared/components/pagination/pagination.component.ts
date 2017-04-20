import { Component, Input, Output } from '@angular/core';
import { GroupService } from '../../../core/services/group.service';

@Component({
  moduleId: module.id,
  selector: 'bs-pagination',
  templateUrl: 'pagination.component.html'
})
export class ListPaginationComponent {
  private _totalItems: number = 5;
  private _currentPage: number; //.../groups?number=
  private _itemsPerPage: number; //...groups?size=
  private _smallnumPages: number = 0;


  public get totalItems(): number {
    return this._totalItems;
  }

  @Input()
  public set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }

  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  @Output()
  public get currentPage(): number {
    return this._currentPage;
  }

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
