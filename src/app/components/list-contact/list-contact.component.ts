import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/constants/contact';
import { ContactBookService } from 'src/app/service/contact-book.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent {

  contacts : Contact[] = [];
  constructor(private contactBook: ContactBookService) { }

  ngOnInit(){
    this.contacts = this.contactBook.getContacts()
  }
}
