import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthServiceLoader } from './auth-service.loader';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
