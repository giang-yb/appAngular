import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDetailComponent } from './new-detail.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  imports: [
    CommonModule,
    NzDescriptionsModule,
  ],
  declarations: [
    NewDetailComponent,
  ],
  exports: [
    NewDetailComponent,
  ]
})
export class NewDetailModule { }
