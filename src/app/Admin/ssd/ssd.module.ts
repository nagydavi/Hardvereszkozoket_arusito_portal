import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsdRoutingModule } from './ssd-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SsdRoutingModule,
    HttpClientModule
  ]
})
export class SsdModule { }
