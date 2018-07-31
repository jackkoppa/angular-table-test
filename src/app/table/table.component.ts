import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Inject
} from '@angular/core';

import { WindowWrapper } from '../utilties/window-wrapper';

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

  // DataShape & OriginalDataShape exist to allow any data stucture to work with the table component
  // This would include, in future functionality, being able to interact with strongly typed rows of data of any shape,
  // simply by creating a new interface, e.g. "NewDataShape", that also extends DataShape, and using that here
  public data: OriginalDataShape[] = [];
  public displayedData: OriginalDataShape[] = [];
  public dataHeadersMap: {}[] = [];

  public currentPage: number = 1;

  private displayedRows: number = 25;
  private lastScrollX: number = 0;


  public get totalPages(): number { return Math.ceil(this.data.length / this.displayedRows); }
  public get backVisible(): boolean { return this.notAllRowsDisplayed() && this.currentPage !== 1 }
  public get nextVisible(): boolean { return this.notAllRowsDisplayed() && this.currentPage < this.totalPages }
  public get startVisible(): boolean { return this.backVisible && this.currentPage > 2 }
  public get lastVisible(): boolean { return this.nextVisible && this.totalPages - this.currentPage >= 2 }

  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef,
    private window: WindowWrapper // DI
  ) {
    this.dataHeadersMap = Object.keys(OriginalDataToHeadersMap)
      .map(prop => { return { value: prop, display: OriginalDataToHeadersMap[prop] } });
    console.log(this.dataHeadersMap);
  }

  public ngOnInit(): void {
    this.tableService.getSampleData()
      .subscribe(response => {
        this.data = <OriginalDataShape[]>response;
        this.changeRows(this.displayedRows);
        this.calculateHeaderWidths();
      });
    this.watchScroll();
  }

  public fakeSubmitRow(row: OriginalDataShape): void {
    this.tableService.submitSampleRow(row);
  }

  public changeRows(newRows: number): void {
    const firstItem = this.displayedRows * (this.currentPage - 1);
    this.displayedRows = newRows;
    this.displayedData = this.data.slice(firstItem, firstItem + this.displayedRows);
    this.calculateHeaderWidths();
  }

  public start(): void { this.setPage(1); }
  public back(): void { this.setPage(this.currentPage - 1); }
  public next(): void { this.setPage(this.currentPage + 1); }
  public last(): void { this.setPage(this.totalPages); }

  private watchScroll(): void {
    this.window.onscroll = (e) => {
      if (this.lastScrollX !== this.window.scrollX) {
        this.displayHeader.nativeElement.style.left = `${-this.window.scrollX}px`;
        this.lastScrollX = this.window.scrollX;
      }
    }
  }

  private calculateHeaderWidths(): void {
    this.cdr.detectChanges();
    const hiddenHeaderItems = this.hiddenHeaderItem.toArray();
    const displayHeaderItems = this.displayHeaderItem.toArray();
    for (let i = 0; i < hiddenHeaderItems.length; i++) {
      displayHeaderItems[i].nativeElement.style.minWidth = `${hiddenHeaderItems[i].nativeElement.getBoundingClientRect().width}px`;
    }
  }

  private notAllRowsDisplayed(): boolean {
    return this.data > this.displayedData
  }

  private setPage(page: number) {
    this.currentPage = page;
    const firstItem = this.displayedRows * (this.currentPage - 1);
    this.displayedData = this.data.slice(firstItem, firstItem + this.displayedRows);
    this.calculateHeaderWidths();
  }
}
