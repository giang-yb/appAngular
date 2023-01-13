import { LoginComponent } from './../../login/login.component';
import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N  } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { en_US } from 'ng-zorro-antd/i18n';
import { WelcomeComponent } from './welcome.component';
import { DetailComponent } from '../detail/detail.component';
import { OnlyTextDirective } from 'src/app/directive/only-text.directive';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from 'src/app/directive/only-number.directive';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NewDetailModule } from '../view/new-detail.module';
import { SearchUserComponent } from '../search/search-user.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzLayoutModule,
    NewDetailModule,
    FormsModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzIconModule,
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzInputModule,
    NzDescriptionsModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzNotificationModule,
  ],
  declarations: [
    WelcomeComponent,
    DetailComponent,
    OnlyTextDirective,
    OnlyNumberDirective,
    SearchUserComponent,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: []
})
export class WelcomeModule { }
