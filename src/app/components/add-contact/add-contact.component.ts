import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactBookService } from 'src/app/service/contact-book.service';
import { Contact } from "../../constants/contact";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {

  contactForm: FormGroup  = this.formBuilder.group({});

  get friends() : FormArray { return this.contactForm.get('friends') as FormArray; }

  constructor(private formBuilder:FormBuilder, private contactBook: ContactBookService) { 
    this.contactForm = this.formBuilder.group({
      friends : this.formBuilder.array([])
    })
    this.loadData()
  }

  newContact() : FormGroup { 
    return this.formBuilder.group({
      name : ['', [Validators.required, Validators.minLength(3)]],
      emailId : ['', [Validators.required, Validators.email]],
      address : ['', Validators.required, ],
      phoneNum : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })
  }

  loadData() : void{
    this.friends.push(this.newContact());
    console.log(this.friends.controls)
  }

  removeData(index: number): void{
    this.friends.removeAt(index)
  }

  saveContact(){    
    let newContacts : Contact[] = this.getContacts();
    this.contactBook.addContact(newContacts)
    this.friends.reset();
  }

  getContacts() : Contact[] { 
    let newContact : Contact[] = [];
    this.friends.controls.forEach(friend => {
      newContact.push(<Contact>{ name : friend.value.name, address: friend.value.address, emailId : friend.value.emailId, phoneNum: friend.value.phoneNum})
    })    
    console.log(newContact);
    return newContact
  }
}
