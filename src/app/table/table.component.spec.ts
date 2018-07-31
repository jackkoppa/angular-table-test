import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

import { from } from 'rxjs';

import { TableComponent } from './table.component';

import { WindowWrapper } from '../utilties/window-wrapper';
import { TableService } from './table.service';
import { DataShape } from './table.models';

let tableServiceMock: TableService = <TableService>{
  getSampleData: () => from([]),
  submitSampleRow: (data: DataShape) => Promise.resolve({})
}
let cdrMock: ChangeDetectorRef = <ChangeDetectorRef>{
  detectChanges: () => {}
}
let windowMock: WindowWrapper = <WindowWrapper>{
  scrollX: 0
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        { provide: TableService, useValue: tableServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock },
        { provide: WindowWrapper, useValue: windowMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
