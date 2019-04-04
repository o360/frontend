import { Component } from '@angular/core';
import { EventStatus } from '../core/models/event-model';
import { AuthService } from '../core/services/auth.service';
import { UserStatus } from '../core/models/user-model';

@Component({
  moduleId: module.id,
  selector: 'bs-assessment-user-event-tabs',
  templateUrl: 'event-tabs.component.html'
})
export class EventTabsComponent {
  public get EventStatus() {
    return EventStatus;
  }

  public get newUser(): boolean {
    return this._authService.user.status === UserStatus.New;
  }

  constructor(private _authService: AuthService) {
  }
}
