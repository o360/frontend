import { FormComponent } from '../shared/components/form.component';
import { UserModel } from '../shared/models/user-model';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'form-details',
  template: `
      <div class="container">
        <div [hidden]="submitted">
          <form (ngSubmit)="onSubmit()" #userForm="ngForm">
            <div class="form-group">
              <!--<label for="name">Id</label>-->
              <!--<input type="text" class="form-control" id="id"-->
                     <!--required-->
                     <!--[(ngModel)]="user.id" name="name">-->
                   <!--</div><div class="form-group">-->
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name"
                   required
                   [(ngModel)]="user.name" name="name">
          </div>
          <!--*ngIf="isEditing"-->
            <button  type="submit" class="btn btn-success">
              Save changes
            </button>
            <!--*ngIf="isCreating"--> 
            <button type="button" class="btn btn-default" (click)="newUser(); userForm.reset()">
              Create new user
            </button>
            <button type="button" class="btn btn-default" (click)="goBack();">
             Go back
            </button>
           </form>
        </div>
`
})
export class UserDetailsFormComponent extends FormComponent<UserModel> {
  public user: UserModel;
  public submitted = false;
  protected __isCreating;
  protected  _isEditing;
  navigated = false; // true if navigated here
  @Output() close = new EventEmitter();

  public onSubmit() {
    this.submitted = true;
  }

  constructor(service: UserService, route: ActivatedRoute) {
    super(service, route);
  }

  // protected _load(): UserModel {
  //   if (this.user['id'] === this._id) {
  //     return this._element = this.user;
  //   } else {
  //     this.newUser();
  //     return this._element;
  //   }
  // }

    // public newUser() {
    //   this._element = new UserModel([this._id, '']);
    // }


  goBack(savedUser: UserModel = null): void {
    this.close.emit(savedUser);
    if (this.navigated) { window.history.back(); }
  }
}

