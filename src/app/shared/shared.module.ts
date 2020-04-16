/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DateTimeComponent } from './components/datetime/datetime-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AccordionModule,
  AlertModule,
  BsDropdownModule,
  CollapseModule,
  ModalModule,
  PaginationModule,
  TabsModule, TooltipModule
} from 'ngx-bootstrap';
import { FiltersComponent } from './components/filters/filters.component';
import { ModalDirective } from './components/modal/modal.directive';
import { ConfirmationDirective } from './directives/confirmation.directive';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EmailValidatorDirective } from './directives/validators/email-validator.directive';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { DateFormatPipe } from './pipes/date.pipe';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { LikesDislikesComponent } from './components/likes-dislikes/likes-dislikes.component';
import { ConfirmationModalComponent } from './confirmation/confirmation.component';
import { SearchComponent } from './components/search/search.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { ThrobberComponent } from './components/throbber/throbber.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { TimeLeftPipe } from './pipes/time-left.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

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
    DndModule,
    BsDropdownModule
  ],
  declarations: [
    ConfirmationDirective,
    EmailValidatorDirective,
    ModalDirective,
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
    ImageUploaderComponent,
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
    DndModule,
    NgSelectModule,
    FormsModule,
    ConfirmationModalComponent,
    LikesDislikesComponent,
    ImageUploaderComponent,
    ModalDirective,
    EmailValidatorDirective,
  ],
  entryComponents: [ConfirmationModalComponent]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
