import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  imports: [HomeRoutingModule, SharedModule,PopoverModule.forRoot()],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
