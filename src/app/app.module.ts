import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactBookService } from './service/contact-book.service';

@NgModule({
  declarations: [
    AppComponent, 
    AddContactComponent,
    ListContactComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ContactBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
