import { FormComponent } from '../shared/components/form.component';
import { UserModel } from '../shared/models/user-model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'form-details',
  template: `
    <div class="container">
      <h2>Create or update</h2>
      <form (ngSubmit)="save(); userForm.reset()" #userForm="ngForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input *ngIf="user" type="text" class="form-control" id="name"
                 required
                 [(ngModel)]="user.name" name="name">
        </div>
        <button *ngIf="isEditing" type="submit" class="btn btn-success" (click)="update()">
          Save changes
        </button>
        <button *ngIf="isCreating" type="button" class="btn btn-default" (click)="save()">
          Create new user
        </button>
        <button type="button" class="btn btn-default" (click)="goBack()">
          Go back
        </button>
      </form>
    </div>`,
  providers: [UserService]
})
export class UserDetailsFormComponent extends FormComponent<UserModel> implements OnInit {
  public isCreating = false;
  public isEditing = false;
  public user: UserModel;
  protected _id: number;

  constructor(service: UserService,
              route: ActivatedRoute) {
    super(service, route);
  }

  ngOnInit(): void {
    this._route.params.forEach((params: Params) => {
      if (JSON.stringify(params) === JSON.stringify({})) {
        this.isCreating = true;
      } else {
        this.isEditing = true;
        this._service.get(params['id'])
          .subscribe(
            element => this.user = element
          );
      }
      // } else {
      //   console.log('new');
      //   this.isCreating = true;
      // }
      // if (params['id'] !== undefined) {
      //   let id = params['id'];
      //   this._service.get(id)
      //     .subscribe(user => this.user = user);
      // } else {
      //   this.user = new UserModel();
      // }
    });
  }

  public update() {
    this._service.get(this._id)
      .subscribe((element: UserModel) => {
        this.user = element;
        this.goBack(element);
        // this._load();
      });
  }

  public save() {
    this._service
      .save(this.user)
      .subscribe(element => {
        this.user = element;
      });
  }

  public goBack(savedElement: T = null) {
    if (savedElement !== null) {
      this.close.emit(savedElement);
    }
    window.history.back();
  }

  // public ngOnInit(): void {
  //   this._route.params.subscribe((params: Params) => {
  //     this._id = parseInt(params['id']);
  //     this._update();
  //   });
  // }
  //
  // protected _update() {
  //   this._service.get(this._id).subscribe((user: UserModel) => {
  //     this._load();
  //   });
  // }
  //
  // protected _load(): UserModel {
  //   if (this.user['id'] === this._id) {
  //     return this._element = this.user;
  //   } else {
  //     this.newUser();
  //     return this._element;
  //   }
  // }
  //
  // public newUser() {
  //   this._element = new UserModel([this._id, '']);
  // }
}

