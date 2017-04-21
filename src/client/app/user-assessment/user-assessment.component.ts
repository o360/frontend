import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bs-user-assessment',
  templateUrl: 'user-assessment.component.html',
  styleUrls: ['user-assessment.component.css']
})
export class UserAssessmentComponent {
  protected _listOptions = [
    {
      label: 'Yes',
      option: 'option1'
    },
    {
      label: 'Nope',
      option: 'option2'
    },
    {
      label: 'Nothing to say',
      option: 'option3'
    }
  ];
  protected _listUsers = [
    {
      name: 'Name Name',
    },
    {
      name: 'Harry Potter',
    },
    {
      name: 'Tat Christina',
    }
  ];
  protected _listQualities = [
    {
      label: 'Organized',
      option: 'option1'
    },
    {
      label: 'Good joker',
      option: 'option2'
    },
    {
      label: 'Really work',
      option: 'option3'
    }
  ];
  protected _listActivity = [
    {
      label: 'Vacation',
      option: 'option1',
      showDate: 'option1'
    },
    {
      label: 'Study/University',
      option: 'option2',
      showDate: 'option2'
    },
    {
      label: 'Courses/Conference',
      option: 'option3',
      showDate: 'option3'
    },
    {
      label: 'Incubator',
      option: 'option4',
      showDate: 'option4'
    }
  ];
  protected _tab = 0;
  protected _selectedUser: string;
  public searchStr: string;
  public selected: any;
  public assessUsers: [];
  public assessUser: string;
  public alertOn: boolean = false;
  // public startDate = new Date();
  // public endDate = new Date(this.startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  public like: boolean = false;
  public dislike: boolean = false;
  public datePickerVisible : boolean = false;

  public get listOptions() {
    return this._listOptions;
  }

  public set tab(value: number) {
    this._tab = value;
  }

  public get tab(): number {
    return this._tab;
  }

  public get listUsers() {
    return this._listUsers;
  }

  public get listActivity() {
    return this._listActivity;
  }

  public get listQualities() {
    return this._listQualities;
  }


  public get selectedUser() {
    return this._selectedUser;
  }

  public alertMe() {
    setTimeout(function (): void {
      alert('Save or not?');
    });
  }

  public isSelectedTab(num: number) {
    this.alertOn = false;
    this.selected = null;
    this.assessUser = null;
    this._tab = num;
  }

  public isSelectedAssessment(index: any, status: any) {
    this.selected = index;
    if (status === 'like') {
      return (this.like = true) && (this.dislike = false);
    } else {
      return (this.dislike =true) && (this.like = false);
    }
  }

  public isSelectedUser(inUser: any, index: any) {
    this.selected = index;
    return this._selectedUser = inUser.name;
  }

  public saveResult() {
    this.alertOn = true;
    this.assessUser = this.selectedUser;
    console.log(this.assessUser);
  }

  public showDatePicker() {
    this.datePickerVisible = !this.datePickerVisible;
  }

  public removeDate(): void {
    console.log('remove');
  }
}
