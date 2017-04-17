import { NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, PopoverModule.forRoot()],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
