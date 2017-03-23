import { Component, Input, OnInit,OnChanges } from '@angular/core';
import { UserService} from './user.service';

import { UserModel } from './user-model';

@Component({
  selector: 'users-list',
  templateUrl: './user-list.component.html', // TODO
  styleUrls: ['./user-list.component.css'], //TODO
  providers: [ UserService ]
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() userList: string;


  private _usersList: any; // TODO type?
  private currentUser:UserModel;




  // TODO
/*
  ngOnInit() {

  }
  public userSelected(user){
    this.currentUser = user;
  }

  public isSelected(user): boolean {
    if(!this.currentUser) {
      return false;
    }
    return this.currentUser._id ===  user._id ? true : false;
  }*/
}
