import { Signalement } from './../../models/signalement';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddSignalementComponent } from './add-signalement.component';
import { SignalementService } from '../services/signalement.service';
import { HttpClientModule } from '@angular/common/http';
import { matDatepickerAnimations, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { compilePipeFromMetadata, identifierName } from '@angular/compiler';

describe('AddSignalementComponent', () => {
  let component: AddSignalementComponent;
  let fixture: ComponentFixture<AddSignalementComponent>;
  let service: SignalementService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSignalementComponent ],
      imports: [HttpClientModule, MatSnackBarModule, MatToolbarModule,HttpClientTestingModule, MatSnackBarModule ,MatFormFieldModule, MatDialogModule, MatInputModule, BrowserAnimationsModule,MatDatepickerModule, MatNativeDateModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
      providers: [SignalementService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    const signalementServiceSpy = jasmine.createSpyObj<SignalementService>(['getSignalement']);
    signalementServiceSpy.getSignalement.and.callFake(function (){
      return of(
        [,
      {
      author: {
        first_name: "Frederique",
        last_name: "Marron",
        email: "marron@gmail.com",
        birth_date: "12/12/1920",
        sex: "Femme"
      },
      observation: [
        {
          id: 4,
          name: "Observation 4"
        },
        {
          id: 5,
          name: "Observation 5"
        }
      ],
      description: "Hello, this is my description",
      id: "2"
    
  },
    ])
    })
    fixture = TestBed.createComponent(AddSignalementComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SignalementService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', fakeAsync (() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    console.log(fixture.debugElement)
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.all())).toBeTruthy();
  }));

  it('Check initial form values', ()=>{
    const signalementForm = component.signalementFormGroup;
    const signalementFormValues = {
        first_name: "",
        last_name: "",
        email: "",
        birth_date: "",
        sex: "",
        description: "",
      
    }
    expect(signalementForm.value).toEqual(signalementFormValues);
    });

    it('form invalid when empty', () => {
      expect(component.signalementFormGroup.valid).toBeFalsy();
    });

    it('Should validate form with data', ()=>{
      component.signalementFormGroup.controls['first_name'].setValue("Joe");
      component.signalementFormGroup.controls['last_name'].setValue("Jordan");
      component.signalementFormGroup.controls['email'].setValue("jordanj@gmail.com");
      component.signalementFormGroup.controls['sex'].setValue("Homme");
      component.signalementFormGroup.controls['birth_date'].setValue(new Date("10/10/1990"));
      component.signalementFormGroup.controls['description'].setValue("this is my description");
      component.selectedObservation= [{id: 1, name: 'Observation 1'}]
      expect(component.checkFormValidity()).toBeTruthy();
      });

      it('should invalidate form with empty inputs', () => {
        component.signalementFormGroup.controls['first_name'].setValue('');
        component.signalementFormGroup.controls['last_name'].setValue('');
        component.signalementFormGroup.controls['email'].setValue('');
        component.signalementFormGroup.controls['sex'].setValue('');
        component.signalementFormGroup.controls['description'].setValue('');
        expect(component.signalementFormGroup.valid).toBeFalsy();
      });

});
