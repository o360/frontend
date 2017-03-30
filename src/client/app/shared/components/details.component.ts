import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../services/rest.service';
import { Model } from '../models/model';

export abstract class DetailsComponent<T extends Model> implements OnInit {
  protected _element: T;
  protected _id: number;

  public get element(): T {
    return this._element;
  }

  constructor(protected _service: RestService<T>,
              protected _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this._id = params['id'];
      this._update();
    });
  }

  public goBack(): void {
    window.history.back();
  }

  protected _update() {
    this._service.get(this._id).subscribe((element: T) => {
      this._element = element;
    });
  }
}
