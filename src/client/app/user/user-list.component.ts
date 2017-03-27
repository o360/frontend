import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';
import { UserModel } from '../models/user-model';
import { ListComponent } from '../shared/components/list.component';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [ UserService ]
})
export class UserListComponent /*implements OnInit, OnChanges*/ extends ListComponent<User> {
  constructor(public service: UserService) {
    super(service);
  }

  // public title: string = 'Here is a list of users. Also you can create a new one.';
  // private _users: UserModel[];
  //
  // constructor(private _userService: UserService) { }

  // @Input() users: Observable<UserModel[]>;
  //
  //   @Output() delete = new EventEmitter(false);
  //   @Output() update = new EventEmitter(false);
  //
  //
  // @Input() reset: string;
  // @Input() userInfo: string;
  // @Input() userList: string;

  // private _users: UserModel[];
  // private usersList: UserModel[]; // TODO
  // private currentUser:UserModel;
  //
  // constructor(
  //   private _http: UserService
  // ) {}

  // ngOnInit() {
  //   this.getUsers();
  //   // this._http.list().subscribe(
  //   //   response => this.usersList = response,
  //   //   error=>  { alert(`Can't get users.`); }
  //   // );
  // }

  /**
   * Handle the nameListService observable
   */
  // getUsers() {
  //   this._userService.list()
  //     .subscribe(
  //       response => this._users= response,
  //       error=>  {  console.log(`Can't get users.`); }
  //     );
  //   console.log(this._users);
  // }

  // public userSelected(user:any) {
  //   this.currentUser = user;
  // }
  //
  // public isSelected(user:any): boolean {
  //   if(!this.currentUser) {
  //     return false;
  //   }
  //   return this.currentUser.id ===  user.id ? true : false;
  // }
  // public deleteUser(userId:string){
  //   this._http.deleteUser(userId).subscribe(
  //     response => {
  //       if(response.error) {
  //         alert(`The user could not be deleted, server Error.`);
  //       } else {
  //         this.usersList = response.users;
  //       }
  //     },
  //     error=> {
  //       alert(`The user could not be deleted, server Error.`);
  //     }
  //   );
  // }
}
