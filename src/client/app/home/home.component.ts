import { Component } from '@angular/core';
import { Config } from '../shared/config/env.config';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bs-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  constructor() {
    console.log(Config);
  }
}
