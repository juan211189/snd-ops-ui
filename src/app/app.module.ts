import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, DialogCreateDialogComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, DialogCreateDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    NgxDaterangepickerMd.forRoot({
      separator: ' - ',
      applyLabel: 'Create',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogCreateDialogComponent],
})
export class AppModule {}
