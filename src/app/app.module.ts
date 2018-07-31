import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableModule } from './table/table.module';
import { WindowWrapper, getWindow } from './utilties/window-wrapper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableModule
  ],
  // maintain DI to avoid direct reference to `window`, thus allowing for testing environments without `window`
  providers: [{provide: WindowWrapper, useFactory: getWindow}],
  bootstrap: [AppComponent]
})
export class AppModule { }
