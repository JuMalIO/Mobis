import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  click() {
    this.snackBar.openFromComponent(AlertComponent, {
      horizontalPosition: 'right',
      duration: 20000
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {}
