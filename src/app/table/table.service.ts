import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DataShape } from './table.models';

@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  public getSampleData(): Observable<DataShape[]> {
    return this.http.get<DataShape[]>(`${environment.host}/assets/sample_data.json`);
  }
}
