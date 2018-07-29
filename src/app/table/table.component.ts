import { Component, OnInit } from '@angular/core';

import { TableService } from './table.service';

@Component({
  selector: 'att-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getSampleData()
      .subscribe(response => console.log(response));
  }

}
