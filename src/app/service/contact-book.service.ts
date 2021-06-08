import { Injectable } from '@angular/core';
import { Contact } from '../constants/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  contacts : Contact[] = [];

  constructor() {
    this.contacts.push(...JSON.parse(localStorage.getItem("contacts") || '[]'));
  }

  addContact(newContacts : Contact[]) {
    this.contacts.push(...newContacts)
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  getContacts() {
    return this.contacts
  }
}
