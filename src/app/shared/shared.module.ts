import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AccordionModule,
  CollapseModule,
  ModalModule,
  PaginationModule,
  TabsModule,
  TooltipModule,
  AlertModule, BsDropdownModule
} from 'ngx-bootstrap';
import { FiltersComponent } from './components/filters/filters.component';
import { ConfirmationDirective } from './directives/confirmation.directive';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DateTimeComponent } from './components/datetime/datetime-picker.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { DateFormatPipe } from './pipes/date.pipe';
// import { DndModule } from 'ng2-dnd';
import { LikesDislikesComponent } from './components/likes-dislikes/likes-dislikes.component';
import { ConfirmationModalComponent } from './confirmation/confirmation.component';
import { SearchComponent } from './components/search/search.component';
import { Select2Module } from 'ng2-select2/ng2-select2';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { ThrobberComponent } from './components/throbber/throbber.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { TimeLeftPipe } from './pipes/time-left.pipe';


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
    ToastrModule,
    AccordionModule,
    CollapseModule,
    PaginationModule,
    ModalModule,
    CKEditorModule,
    TabsModule,
    AlertModule,
    TooltipModule,
    // DndModule,
    Select2Module,
    BsDropdownModule
  ],
  declarations: [
    ConfirmationDirective,
    FiltersComponent,
    PaginationComponent,
    DateTimeComponent,
    ThrobberComponent,
    PaginationComponent,
    LanguageSelectorComponent,
    DateFormatPipe,
    LocalizedDatePipe,
    TimeLeftPipe,
    LikesDislikesComponent,
    ConfirmationModalComponent,
    SearchComponent,
    ImageUploaderComponent
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
    ToastrModule,
    AccordionModule,
    PaginationModule,
    PaginationComponent,
    ModalModule,
    CKEditorModule,
    TabsModule,
    AlertModule,
    TooltipModule,
    LanguageSelectorComponent,
    DateTimeComponent,
    ThrobberComponent,
    DateFormatPipe,
    LocalizedDatePipe,
    TimeLeftPipe,
    // DndModule,
    Select2Module,
    ConfirmationModalComponent,
    LikesDislikesComponent,
    ImageUploaderComponent
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
