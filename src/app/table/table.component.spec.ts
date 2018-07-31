import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

import { TableService } from './table.service'
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

let tableServiceMock: TableService = <TableService>{
  getSampleData: () => from([])
}
let cdrMock: ChangeDetectorRef = <ChangeDetectorRef>{
  detectChanges: () => {}
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        {provide: TableService, useValue: tableServiceMock },
        {provide: ChangeDetectorRef, useValue: cdrMock}
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
