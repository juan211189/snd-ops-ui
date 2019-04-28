import * as moment from 'moment';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'snd-ops-ui';
  data;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.data = this.http.get('http://localhost:4200/recomputations').pipe(tap(console.log));
  }

  create() {
    const dialogRef = this.dialog.open(DialogCreateDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data = this.http.get('http://localhost:4200/recomputations').pipe(tap(console.log));
    });
  }
}

@Component({
  selector: 'app-create-dialog',
  template: `
    <div class="mat-typography">
      <h1>Create recomputation</h1>

      <ngx-daterangepicker-material (choosedDate)="choosedDate($event)" [autoApply]="true">
      </ngx-daterangepicker-material>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="primary" (click)="create(selected)">Create</button>
    </div>
  `,
})
export class DialogCreateDialogComponent {
  selected: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  choosedDate($event) {
    this.selected = $event;
  }

  create($event) {
    console.log($event);
    const { startDate, endDate } = $event;
    const format = date => moment(date).format('YYYY-MM-DD');
    this.http
      .post(`http://localhost:4200/recomputations/${format(startDate)}/${format(endDate)}`, {})
      .subscribe(response => {
        console.log(response);
        this.dialogRef.close();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
