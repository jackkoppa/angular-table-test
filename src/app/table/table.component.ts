import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { TableService } from './table.service';
import {
  OriginalDataShape,
  OriginalDataToHeadersMap
 } from './table.models';

@Component({
  selector: 'att-table',
  templateUrl: './table.component.html',
  providers: [{provide: Window, useValue: window}]  // maintain DI to avoid direct reference to `window`,
                                                    // thus allowing for testing environments without `window`
})
export class TableComponent implements OnInit {
  @ViewChild('displayHeader') displayHeader: ElementRef;
  @ViewChildren('displayHeaderItem') displayHeaderItem: QueryList<ElementRef>;
  @ViewChildren('hiddenHeaderItem') hiddenHeaderItem: QueryList<ElementRef>;
  public data: OriginalDataShape[] = [];
  public displayedData: OriginalDataShape[] = [];
  public dataHeadersMap: {}[] = [];
  public currentPage: number = 1;

  private displayedRows: number = 25;
  private lastScrollX: number = 0;


  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef,
    private window: Window
  ) {
    this.dataHeadersMap = Object.keys(OriginalDataToHeadersMap)
      .map(prop => { return { value: prop, display: OriginalDataToHeadersMap[prop] } });
    console.log(this.dataHeadersMap);
  }

  ngOnInit() {
    this.tableService.getSampleData()
      .subscribe(response => {
        this.data = <OriginalDataShape[]>response;
        this.changeRows(this.displayedRows);
        this.calculateHeaderWidths();
      });
    this.window.onscroll = (e) => {
      if (this.lastScrollX !== this.window.scrollX) {
        this.displayHeader.nativeElement.style.left = `${-this.window.scrollX}px`;
        this.lastScrollX = this.window.scrollX;
      }
    }
  }

  changeRows(newRows: number): void {
    const firstItem = this.displayedRows * (this.currentPage - 1);
    this.displayedRows = newRows;
    this.displayedData = this.data.slice(firstItem, firstItem + this.displayedRows);
    this.calculateHeaderWidths();
  }

  calculateHeaderWidths(): void {
    this.cdr.detectChanges();
    const hiddenHeaderItems = this.hiddenHeaderItem.toArray();
    const displayHeaderItems = this.displayHeaderItem.toArray();
    for (let i = 0; i < hiddenHeaderItems.length; i++) {
      displayHeaderItems[i].nativeElement.style.minWidth = `${hiddenHeaderItems[i].nativeElement.getBoundingClientRect().width}px`;
    }
  }
}
