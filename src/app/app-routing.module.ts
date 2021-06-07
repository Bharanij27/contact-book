import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path : 'new-contact', component : AddContactComponent},
  { path : 'list-contact', component : ListContactComponent},
  { path : '',  redirectTo : '/new-contact', pathMatch : 'full'},
  { path : '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
