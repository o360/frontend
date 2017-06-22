import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AssessmentModel } from '../../../core/models/assessment-model';

@Component({
  moduleId: module.id,
  selector: 'bs-search',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  protected _list: AssessmentModel[];
  protected _searchSubscription: any;
  public searchControl: FormControl = new FormControl();
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

  public ngOnInit() {
    this._list = this._items;
    this._searchSubscription = this.searchControl.valueChanges
      .distinctUntilChanged()
      .switchMap((term: string) => {
        this._searchList = [];
        return this.update(term);
      })
      .subscribe((item: AssessmentModel) => {
        this._searchList.push(item);
      });
  }

  public  ngOnDestroy() {
    this._searchSubscription.unsubscribe();
  }

  public  update(term: string) {
    this._itemsSearch.emit(this._searchList);

    let items = this._list.filter((e: AssessmentModel) => {
      return new RegExp(term, 'gi').test(e.user.name) ||
        new RegExp(term, 'gi').test(this.transliteration(e.user.name));
    });
    return Observable.from(items);
  }

  public transliteration(value: string): string {
    let transliteration = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ж: 'g',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      ы: 'i',
      э: 'e',
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ж: 'G',
      З: 'Z',
      И: 'I',
      Й: 'Y',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Ы: 'I',
      Э: 'E',
      ё: 'yo',
      х: 'h',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'shch',
      ъ: '',
      ь: '',
      ю: 'yu',
      я: 'ya',
      Ё: 'YO',
      Х: 'H',
      Ц: 'TS',
      Ч: 'CH',
      Ш: 'SH',
      Щ: 'SHCH',
      Ъ: '',
      Ь: '',
      Ю: 'YU',
      Я: 'YA',
      A: 'А',
      a: 'А',
      B: 'Б',
      b: 'б',
      C: 'С',
      c: 'с',
      D: 'Д',
      d: 'д',
      E: 'Е',
      e: 'е',
      F: 'Ф',
      f: 'ф',
      G: 'Г',
      g: 'г',
      H: 'Х',
      h: 'х',
      I: 'И',
      i: 'и',
      J: 'Ж',
      j: 'ж',
      K: 'К',
      k: 'к',
      L: 'Л',
      l: 'л',
      M: 'М',
      m: 'м',
      N: 'Н',
      n: 'н',
      O: 'О',
      o: 'о',
      P: 'П',
      p: 'п',
      R: 'Р',
      r: 'р',
      S: 'С',
      s: 'с',
      T: 'Т',
      t: 'т',
      U: 'У',
      u: 'у',
      V: 'В',
      v: 'в',
      W: 'В',
      w: 'в',
      X: 'Кс',
      x: 'кс',
      Y: 'Й',
      y: 'й',
      Z: 'З',
      z: 'з',
    };
    return value.split('').map(letter => {
      return Object.keys(transliteration)[Object.values(transliteration).indexOf(letter)];
    }).join('');
  }
}
