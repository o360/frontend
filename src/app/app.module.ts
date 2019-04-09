// import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { DndModule } from 'ng2-dnd';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule, AlertModule, ModalModule, PaginationModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { createTranslateLoader } from './shared/config/translate-loader.config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PaginationModule.forRoot(),
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    // ToastModule.forRoot(),
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    // DndModule.forRoot(),
    // App related modules
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
