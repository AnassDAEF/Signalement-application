import { ProfilComponent } from './profil/profil.component';
import { ListingSignalementComponent } from './listing-signalement/listing-signalement.component';
import { AddSignalementComponent } from './add-signalement/add-signalement.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: ListingSignalementComponent },
  { path: "add-signalement", component: AddSignalementComponent },
  { path: "list-signalement", component: ListingSignalementComponent},
  { path: "profil", component: ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
