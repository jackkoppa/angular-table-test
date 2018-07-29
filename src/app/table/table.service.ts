import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  public getSampleData() {
    return this.http.get(`${environment.host}/assets/sample_data.json`);
  }
}
