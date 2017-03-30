import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from '../shared/components/list.component';
import { UserModel } from '../shared/models/user-model';
import { UserService } from '../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent extends ListComponent<UserModel> {
  public title: string = 'Here is a list of users. Also you can create a new one.';
  public selectedUser: UserModel;

  constructor(service: UserService, private router: Router,) {
    super(service);
  }

  public onSelect(user: UserModel): void {
    this.selectedUser = user;
    // this.isEditing = false;
  }
}


// import { Component, OnInit, Input, EventEmitter } from '@angular/core';
// import { UserService } from '../shared/services/user.service';
// import { UserModel } from '../shared/models/user-model';
// import { Utils } from '../utils';
//
// /**
//  * This class represents the lazy loaded HomeComponent.
//  */
// @Component({
//   moduleId: module.id,
//   selector: 'user-list',
//   templateUrl: 'user-list.component.html',
//   styleUrls: ['user-list.component.css'],
//   providers: [UserService]
// })
// export class UserListComponent implements OnInit {
//   @Input() user: UserModel;
//   public isEditing = false;
//   public selectedUser: UserModel;
//   public title: string = 'Here is a list of users. Also you can create a new one.';
//   public newName: string = '';
//   private _users: UserModel[];
//
//
//   constructor(private _userService: UserService) {
//   }
//
//   /**
//    * Get users OnInit
//    */
//   ngOnInit(): void {
//     this.getUsers();
//   }
//   /** Return list of users
//    * @return
//    */
//   public getUsers(): void {
//     this._userService.list()
//       .subscribe(
//         response => this._users = response,
//         error => {
//           console.log(`Can't get users.`);
//         }
//       );
//   }
//
//   /** Delete user
//    * @params {UserModel} - user
//    * @return
//    */
//   public deleteUser(user: UserModel): void {
//       this._userService
//       .delete(user.id)
//       .subscribe(response => {
//         this._users = this._users.filter(h => h !== user);
//         if (this.selectedUser === user) { this.selectedUser = null;}
//       })
//       this.getUsers();
//   }
//   /** Update user
//    * @params {UserModel} - user
//    * @return
//    */
//   public updateUser(user: UserModel) {
//     // if(this.selectedUser === user) {
//     //   this.isEditing = true;
//     // }
//     console.log(user);
//     // this._userService.save(user)
//     //   .subscribe(
//     //     () => {console.log();}
//     //   );
//   }
//
//   public addUser(user: UserModel): void {
//     this._userService.save(user)
//       .subscribe(
//         response => { user = response; }
//         // err => console.log('error')
//       )
//     this.getUsers();
//     // save(): void {
//     //   this.heroService
//     //   .save(this.hero)
//     //   .then(hero => {
//     //     this.hero = hero; // saved hero, w/ id if new
//     //     this.goBack(hero);
//     //   })
//     //   .catch(error => this.error = error); // TODO: Display error message
//   }
//   public onSelect(user: UserModel): void {
//     this.selectedUser = user;
//     this.isEditing = false;
//   }
//   public editMode() {
//     return this.isEditing = !this.isEditing;
//   }
// }
//
