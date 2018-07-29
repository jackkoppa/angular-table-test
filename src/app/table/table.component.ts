import { Component, OnInit } from '@angular/core';

import { TableService } from './table.service';
import {
  OriginalDataShape,
  OriginalDataToHeadersMap
 } from './table.models';

@Component({
  selector: 'att-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  public data: OriginalDataShape[] = [];
  public dataHeadersMap: {}[] = [];

  constructor(private tableService: TableService) {
    this.dataHeadersMap = Object.keys(OriginalDataToHeadersMap)
      .map(prop => { return { value: prop, display: OriginalDataToHeadersMap[prop] } });
    console.log(this.dataHeadersMap);
  }

  ngOnInit() {
    this.tableService.getSampleData()
      .subscribe(response => this.data = <OriginalDataShape[]>response);
  }

}
