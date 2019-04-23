import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule, AlertModule, ModalModule, PaginationModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { createTranslateLoader } from './shared/config/translate-loader.config';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './core/services/configuration.service';

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
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    // App related modules
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigurationService) => () => configService.loadConfigurationData(),
      deps: [ConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
