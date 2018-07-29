import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from './table.component';
import { TableService } from './table.service'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    TableComponent
  ],
  providers: [
    TableService
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
