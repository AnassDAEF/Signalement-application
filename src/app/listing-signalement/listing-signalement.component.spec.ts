import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalementService } from '../services/signalement.service';

import { MatTableDataSource } from '@angular/material/table';
import { ListingSignalementComponent } from './listing-signalement.component';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Signalement } from 'src/models/signalement';
import { CdkPortal } from '@angular/cdk/portal';

describe('ListingSignalementComponent', () => {
  let component: ListingSignalementComponent;
  let fixture: ComponentFixture<ListingSignalementComponent>;
  let testSignalement: Signalement[] = [
    {author:{
     first_name:"Joe",
     last_name:"Jordan",
     email:"jordanj@gmail.com",
     sex: "Homme",
     birth_date:"10/10/1990"
   },
   description: "this is my description",
   observation:[{id: 1, name:"Observation 1"}]
 },
 {
   author:{
     first_name:"Rose",
     last_name:"James",
     email:"James@gmail.com",
     sex: "Femme",
     birth_date:"10/10/1990"
   },
   description: "this is my description",
   observation:[{id: 1, name:"Observation 1"}]
 },
 {
   author:{
     first_name:"Alex",
     last_name:"Bryant",
     email:"bryant@gmail.com",
     sex: "Homme",
     birth_date:"10/10/1990"
   },
   description: "this is my description",
   observation:[{id: 1, name:"Observation 1"}]
 }
   ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingSignalementComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatCardModule, 
        MatIconModule,
        MatSortModule,
        MatPaginatorModule, 
      ],
      providers: [SignalementService]
    })
      .compileComponents();
      
    fixture = TestBed.createComponent(ListingSignalementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Signalement data', () => {
    const signalementTable = document.querySelector('table#signalementTable');
    const signalementInTable = Array.from(
      (signalementTable)? signalementTable.getElementsByClassName('mat-row') : []
    );
 
    signalementInTable.forEach((sign: any) => {
      const firstName = sign
        .getElementsByClassName('first_name')
        .item(0).textContent;
      const lastName = sign
        .getElementsByClassName('last_name')
        .item(0).textContent;
      const email = sign
        .getElementsByClassName('email')
        .item(0).textContent;

        const description = sign
        .getElementsByClassName('description')
        .item(0).textContent;
 
      expect(testSignalement).toContain(
        jasmine.objectContaining({
          firstName: firstName,
          lastName: lastName,
          email: email,
          description: description
        })
      );
    });
  });
  
});
