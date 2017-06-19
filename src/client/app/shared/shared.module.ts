import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule, CollapseModule, TabsModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { FiltersComponent } from './components/filters/filters.component';
import { ConfirmationDirective } from './directives/confirmation.directive';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DateTimeComponent } from './components/datetime/datetime-picker.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { DateFormatPipe } from './pipes/date.pipe';
import { DndModule } from 'ng2-dnd';
import { ConfirmationModalComponent } from './confirmation/confirmation.component';
import { SearchComponent } from './components/search/search.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ToastModule,
    AccordionModule,
    CollapseModule,
    PaginationModule,
    ModalModule,
    CKEditorModule,
    TabsModule,
    DndModule
  ],
  declarations: [
    ConfirmationDirective,
    FiltersComponent,
    PaginationComponent,
    DateTimeComponent,
    PaginationComponent,
    LanguageSelectorComponent,
    DateFormatPipe,
    ConfirmationModalComponent,
    SearchComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ConfirmationDirective,
    CollapseModule,
    FiltersComponent,
    SearchComponent,
    ToastModule,
    AccordionModule,
    PaginationModule,
    PaginationComponent,
    ModalModule,
    CKEditorModule,
    TabsModule,
    LanguageSelectorComponent,
    DateTimeComponent,
    DateFormatPipe,
    DndModule,
    ConfirmationModalComponent
  ],
  entryComponents: [ConfirmationModalComponent]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
