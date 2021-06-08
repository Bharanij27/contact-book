import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
      emailId : ['', [Validators.required, Validators.email, this.validateEmail()]],
      address : ['', Validators.required, ],
      phoneNum : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })
  }

  validateEmail() : ValidatorFn{
    return (control : AbstractControl) : { [key : string] : any} => {
      if(!control.value) return { patternError: false};
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(control.value) ? { patternError: true } : { patternError: false}
		}
  }

  loadData() : void{
    this.friends.push(this.newContact());
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
    return newContact
  }

  getContactsFormGroup(index : number): FormGroup {
    const friendsList = this.contactForm.get('friends') as FormArray;
    const formGroup = friendsList.controls[index] as FormGroup;    
    return formGroup;
  }
}
