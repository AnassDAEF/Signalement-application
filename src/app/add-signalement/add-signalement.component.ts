import { Signalement } from './../../models/signalement';
import { Router } from '@angular/router';
import { Observation } from './../../models/observation';
import { SignalementService } from './../services/signalement.service';
import { Component, OnInit, Inject, TestabilityRegistry } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-signalement',
  templateUrl: './add-signalement.component.html',
  styleUrls: ['./add-signalement.component.scss']
})
export class AddSignalementComponent implements OnInit {
  observationList!: Observation[];
  selectedObservation!: Observation[];
  signalementFormGroup!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  constructor(private _formBuilder: FormBuilder,
    private _signalementService: SignalementService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddSignalementComponent>) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit() {
    //Initializing the formGroup
    this.signalementFormGroup = this._formBuilder.group({
      first_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      sex: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required])
    });
    // If the edit mode, fetching the data in the form
    if (this.editData) {
      this.signalementFormGroup.controls['first_name'].setValue((this.editData.author && this.editData.author.first_name)? this.editData.author.first_name : '');
      this.signalementFormGroup.controls['last_name'].setValue((this.editData.author && this.editData.author.last_name)? this.editData.author.last_name : '');
      this.signalementFormGroup.controls['sex'].setValue((this.editData.author && this.editData.author.sex)? this.editData.author.sex : '');
      this.signalementFormGroup.controls['email'].setValue((this.editData.author && this.editData.author.email)? this.editData.author.email : '');
      this.signalementFormGroup.controls['description'].setValue((this.editData.description)? this.editData.description : '');
      this.signalementFormGroup.controls['birth_date'].setValue((this.editData.author && this.editData.author.birth_date)? new Date(this.editData.author.birth_date) : '');
      this.selectedObservation = this.editData.observation;
    }
    this.getObservationList();
  }

  /**
   * Checking validity of the form
   * @returns boolean
   */
  checkFormValidity(): boolean {
    return (this.signalementFormGroup.valid) ? true : false;
  }

  /**
   * Casting the birth date selected into string and simple format
   * @returns string
   */
  castBirthDate(): string {
    this.signalementFormGroup.value.birth_date = moment(this.signalementFormGroup.value.birth_date).format("DD/MM/YYYY");
    return this.signalementFormGroup.value.birth_date.toString();
  }
  /**
   * Adding/Editing a signalement
   */
  addNewSignalement() {
    if (!this.checkFormValidity()) {
      this.openSnackBar("Complete the signalement form before validating", "close");
    }
    else {
      if (!this.editData) {
        this.checkIfAuthorExists(this.createSignalemntToSend().author.email)
      }
      else {
        this._signalementService.EditSignalement(this.createSignalemntToSend(), this.editData.id).subscribe({
          next: (res) => {
            console.log(res);
            this.openSnackBar("Your signalement is edited successfully", "close");
            this.dialogRef.close('update');
          },
          error: (err: HttpErrorResponse) => {
            this.openSnackBar("Oops! Something went wrong, please contact the administrator", "close");
            console.log(err);
          }
        })
      }
    }
  }

  /**
   * Method to create a Signalement Object from formGroup value
   * @returns Signalement
   */
  createSignalemntToSend() {

    return <Signalement>{
      author: {
        first_name: this.signalementFormGroup.controls['first_name'].value,
        last_name: this.signalementFormGroup.controls['last_name'].value,
        email: this.signalementFormGroup.controls['email'].value,
        birth_date: this.castBirthDate(),
        sex: this.signalementFormGroup.controls['sex'].value
      },
      observation: this.selectedObservation,
      description: this.signalementFormGroup.controls['description'].value,
    };
  }

  /**
   * Checking if the author already exists and stop the push if it s true
   * @param email 
   */

  checkIfAuthorExists(email: string) {
    let itExists: boolean = false;
    this._signalementService.getSignalementByemail(email).subscribe({
      next: (res: any) => {
        console.log(res);
        for (let sign of res) {
          itExists = (sign.author.email == email) ? true : false;
        }
        if (!itExists) {
          this._signalementService.addSignalement(this.createSignalemntToSend()).subscribe({
            next: (res: any) => {
              console.log(res);
              this.openSnackBar("Your signalement is sent successfully", "close");
              this.dialogRef.close();
            },
            error: (err: HttpErrorResponse) => {
              this.openSnackBar("Oops! Something went wrong, please contact the administrator", "close");
              console.log(err);
            }
          });
        }
        else {
          this.openSnackBar("email already exists", "close");
        }
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar("Oops! Something went wrong, please contact the administrator", "close");
        console.log(err);
      }
    });
  }
  /**
   * Open Snackbar to show messages (success, alert) to the user
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
   * Checking the validity of the email adress
   * @returns string
   */
  getErrorMessage() {
    if (this.signalementFormGroup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.signalementFormGroup.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Fetching all the observations
   */
  getObservationList(): void {
    this._signalementService.getObservations().subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.observationList = res;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.openSnackBar("Oops! Something went wrong, please call the administrator", "close");
        console.log(err);
      }
    });
  }
  /**
   * Used to select the selectedObservation from the signalement
   * @param object1 
   * @param object2 
   * @returns 
   */
  compareSelectedObservation(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
  }

}

