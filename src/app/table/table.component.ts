import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

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
  @ViewChild('displayHeader') displayHeader: ElementRef;
  @ViewChildren('displayHeaderItem') displayHeaderItem: QueryList<ElementRef>;
  @ViewChildren('hiddenHeaderItem') hiddenHeaderItem: QueryList<ElementRef>;
  public data: OriginalDataShape[] = [];
  public dataHeadersMap: {}[] = [];
  private lastScrollX: number = 0;

  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataHeadersMap = Object.keys(OriginalDataToHeadersMap)
      .map(prop => { return { value: prop, display: OriginalDataToHeadersMap[prop] } });
    console.log(this.dataHeadersMap);
  }

  ngOnInit() {
    this.tableService.getSampleData()
      .subscribe(response => {
        this.data = <OriginalDataShape[]>response;
        this.cdr.detectChanges();
        const hiddenHeaderItems = this.hiddenHeaderItem.toArray();
        const displayHeaderItems = this.displayHeaderItem.toArray();
        for (let i = 0; i < hiddenHeaderItems.length; i++) {
          displayHeaderItems[i].nativeElement.style.minWidth = `${hiddenHeaderItems[i].nativeElement.getBoundingClientRect().width}px`;
        }
      });
    window.onscroll = (e) => {
      if (this.lastScrollX !== window.scrollX) {
        this.displayHeader.nativeElement.style.left = `${-window.scrollX}px`;
        this.lastScrollX = window.scrollX;
      }
    }
  }
}
