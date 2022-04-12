import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { GetInformationService } from '../../services/get-information.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

    contacts: User[] = [];
    displayedColumns: string[] = ['name', 'secondName', 'telNum'];

    constructor( private getInformationService: GetInformationService ) { }

    ngOnInit(): void {
        this.getContacts();
    }

    private getContacts(): void {
        this.getInformationService.getContacts()
            .subscribe(result => this.contacts = result);
    }
}
