import { OnInit, EventEmitter, Output } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import { Model } from '../models/model';

export abstract class FormComponent<T extends Model> implements OnInit {
  public navigated = false;
  protected _element: T;
  protected _id: number;
  @Output() close = new EventEmitter();

  constructor(protected _service: RestService<T>,
              protected _route: ActivatedRoute) {
  }

  // public ngOnInit(): void {
  //   this._route.params
  //     .subscribe((params: Params) => {
  //     this._id = parseInt(params['id']);
  //     this._update();
  //   });
  // }
  // ngOnInit(): void {
  //   this._route.params.forEach((params: Params) => {
  //     if (params['id'] !== undefined) {
  //       let id = +params['id'];
  //       // this.navigated = true;
  //       this._service.get(id)
  //         .subscribe(element => this._element = element);
  //     } else {
  //       this.navigated = false;
  //       // this._element = new T();
  //     }
  //   });
  // }
  //
  // protected _update() {
  //   this._service.get(this._id)
  //     .subscribe((element: T) => {
  //       this._element = element;
  //       this.goBack(element);
  //       // this._load();
  //     });
  // }
  //
  // public save() {
  //   this._service
  //     .save(this._element)
  //     .subscribe(element => {
  //       this._element = element;
  //       // this.goBack(element);
  //     });
  // }
  //
  // public goBack(savedElement: T = null) {
  //   console.log('ну давай');
  //   if (savedElement !== null) {
  //     console.log(savedElement);
  //     this.close.emit(savedElement);
  //   }
  //   window.history.back();
  // }

  // public newUser() {
  //   this._element = new T([this._id, '']);
  // }
}

