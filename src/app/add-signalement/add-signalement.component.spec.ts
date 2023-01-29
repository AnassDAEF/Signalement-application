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

  it('Check initial form values for add', ()=>{
    const signalementForm = component.signalementFormGroup;
    const signalementFormValues = {
        first_name: "",
        last_name: "",
        email: "",
        birth_date: "",
        sex: "",
        description: "",
      
    }
    console.log(signalementForm.value);
    expect(signalementForm.value).toEqual(signalementFormValues);
    });

    it('Checking signalement form is valid', ()=>{
      fixture.detectChanges();
      fixture.whenStable().then(() =>{
      const signalementForm = component.signalementFormGroup;
      signalementForm.controls['first_name'].setValue("Joe");
      signalementForm.controls['last_name'].setValue("Jordan");
      signalementForm.controls['email'].setValue("jordanj@gmail.com");
      signalementForm.controls['sex'].setValue("Homme");
      signalementForm.controls['birth_date'].setValue("10/10/1990");
      signalementForm.controls['description'].setValue("this is my description");
      component.selectedObservation = [{id: 1, name:"Observation 1"}];
      component.createSignalemntToSend();

        fixture.whenStable().then(() => {
        expect(component.signalementFormGroup.controls['first_name']?.value).toEqual('Joe');
        expect(component.signalementFormGroup.controls['last_name']?.value).toEqual('Jordan');
        expect(component.signalementFormGroup.controls['email']?.value).toEqual('jordanj@gmail.com');
        expect(component.signalementFormGroup.controls['sex']?.value).toEqual('Homme');
        expect(component.signalementFormGroup.controls['birth_date']?.value).toEqual('10/10/1990');
        expect(component.signalementFormGroup.controls['description']?.value).toEqual('this is my description');
        expect(component.signalementFormGroup.valid).toBeTruthy();
        expect(component.signalementFormGroup.value).toEqual
        expect(component.checkFormValidity()).toBeTruthy();
      })
      })
      });

});
