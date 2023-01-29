import {MatToolbarModule} from '@angular/material/toolbar';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSignalementComponent } from './add-signalement/add-signalement.component';
import { ListingSignalementComponent } from './listing-signalement/listing-signalement.component';
import { ProfilComponent } from './profil/profil.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatStepperModule} from '@angular/material/stepper';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule} from '@angular/material/radio';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListingSignalementComponent,
    AddSignalementComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    AngularFireModule,
    MatExpansionModule,
    MatDialogModule,
    AngularFirestoreModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, 
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSortModule,
    MatInputModule, 
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    AddSignalementComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
