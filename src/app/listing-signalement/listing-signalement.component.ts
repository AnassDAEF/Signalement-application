import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignalementService } from './../services/signalement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Signalement } from '../../models/signalement';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { AddSignalementComponent } from '../add-signalement/add-signalement.component';

@Component({
  selector: 'app-listing-signalement',
  templateUrl: './listing-signalement.component.html',
  styleUrls: ['./listing-signalement.component.scss']
})
export class ListingSignalementComponent implements OnInit {
  filter!: FormControl;
  columnsToDisplay: string[] = ['first_name', 'last_name', 'email', 'description', 'actions'];
  dataSource!: MatTableDataSource<Signalement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _signalementService: SignalementService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllSignalement();
  }

  /**
   * Open snackbar to display messages to the user
   * @param message 
   * @param action 
   */
  openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  /**
   * Fitering the signalement list method
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Get all the signalement
   */
  getAllSignalement() {
    this._signalementService.getSignalement().subscribe({
      next: (res: Signalement[]) => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.openSnackBar("No signalement found", "close");
        }
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar("Oops! Something went wrong, please call the administrator", "close");
        console.log(err);
      }
    });
  }

  /**
   * Method to open the form dialog
   * @param row 
   */
  openDialog(row?: any) {
    this.dialog.open(AddSignalementComponent, {
      width: '50%',
      data: (row) ? row : null
    }).afterClosed().subscribe((value) => {
      this.getAllSignalement();
    });
  }
}
