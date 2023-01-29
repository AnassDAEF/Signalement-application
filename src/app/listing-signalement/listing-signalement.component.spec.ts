import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalementService } from '../services/signalement.service';

import { ListingSignalementComponent } from './listing-signalement.component';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListingSignalementComponent', () => {
  let component: ListingSignalementComponent;
  let fixture: ComponentFixture<ListingSignalementComponent>;

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
        MatIconModule
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
});
