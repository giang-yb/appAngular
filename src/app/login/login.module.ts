import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterModule, Routes } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { OnlyTextAndNumberDirective } from '../directive/onlyTextAndNumber.directive';
import { PasswordDirective } from '../directive/password.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes:Routes= [
  { path: '',
    component: LoginComponent
  }
]; 

@NgModule({
  declarations: [
    LoginComponent,
    OnlyTextAndNumberDirective,
    PasswordDirective,
  ],
  imports: [
    CommonModule,
    NzSpaceModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
